#!/usr/bin/env python3
import argparse, os, re, shutil, sys, datetime

parser = argparse.ArgumentParser(description='Autofill empty Features fields from a given starting line')
parser.add_argument('file', help='Path to the KAYTX file')
parser.add_argument('--min-line', type=int, default=100, help='Only modify agents whose title line number >= this')
parser.add_argument('--backup', action='store_true', default=True, help='Create a .bak before modifying')
args = parser.parse_args()

path = args.file
min_line = args.min_line

if not os.path.exists(path):
    print('File not found:', path)
    sys.exit(2)

# create backup
if args.backup:
    bak = path + '.bak'
    if not os.path.exists(bak):
        shutil.copy(path, bak)
        print('Backup created:', bak)
    else:
        stamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        bak2 = f"{path}.bak.{stamp}"
        shutil.copy(path, bak2)
        print('Backup created:', bak2)

with open(path, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

# helper normalize
def norm(s):
    s = s.lower().strip()
    s = s.replace('&', ' and ')
    s = re.sub(r'[^a-z0-9 ]+', ' ', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

# default templates (conservative)
def defaults_template(name='', role='', uses=''):
    return {
        'separate dashboard': 'false',
        'security layer': 'role-based ACL, encryption at rest',
        'call': 'Telephony integration (e.g. Twilio) — routing + recording',
        'chat system': 'Web widget + connectors (Slack/Intercom) when available',
        'sms': 'SMS via configured provider (e.g. Twilio) — templated messages',
        'voice phone number': 'Primary DID(s): TBD; TTS voice: default',
        'recording script': 'Recording enabled (90d retention); transcript generation',
        'location country': 'Allowed regions: global; timezone-aware scheduling',
        'company setup': 'Company profile & product/pricing templates (TBD)',
        'general info': f'Name: {name}; Role: {role}; Availability: 24/5; Personality: neutral; Voice: default',
        'model language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y',
        'timing scheduling': 'Business Hours: Mon-Fri 09:00-17:00 local; Waiting Duration for Call: 120s',
        'pricing negotiation': 'Pricing Model: TBD; Price Limit: TBD; Negotiation: max concession 10%',
        'integrations': uses if uses else 'TBD',
        'responsibilities routing': 'Task routing by intent; escalate to human after N failed handoffs',
        'tasks work management': 'Assigned tasks queue; SLA timers; progress metrics',
        'behaviour limitations': 'Safety filters enabled; refusal templates for restricted domains',
        'performance insights': 'Metrics: latency, resolution rate, CSAT; Reporting: dashboards',
        'summary notes': 'TBD',
        'predictive layers': 'TBD',
        'rules regulations': 'GDPR & regional compliance where applicable',
        'memory': 'Session: 30m; Long-term: 365d; PII redaction enabled',
        'setup company detailed': 'Onboarding flow; KB import; training plan; voice tuning',
        '2 step verification': 'MFA for admin/billing actions',
        'import export data': 'CSV/JSON endpoints; scheduled exports; retention policy',
        'reports': 'Daily/Weekly/Monthly dashboards; ad-hoc exports',
        'integrations mcp': 'MCP connector: TBD'
    }

# build list of Features block indices
features_idxs = [i for i,l in enumerate(lines) if l.strip().lower() == 'features:']
print('Found Features blocks:', len(features_idxs))

filled_fields_count = 0
blocks_modified = 0

for idx in features_idxs:
    # find title line above
    title_idx = idx - 1
    while title_idx >= 0 and lines[title_idx].strip() == '':
        title_idx -= 1
    # scan up to find numbered title or arrow
    found_title_idx = None
    for j in range(title_idx, max(-1, title_idx-6), -1):
        if j < 0:
            break
        if re.match(r'^\s*\d+\.', lines[j]) or lines[j].strip().startswith('→'):
            found_title_idx = j
            break
    if found_title_idx is None:
        continue
    title_line_no = found_title_idx + 1
    if title_line_no < min_line:
        continue
    # extract title and uses
    title_text = lines[found_title_idx].strip()
    name = title_text.lstrip('→').strip()
    m = re.match(r'^\s*\d+\.\s+(.*)', title_text)
    if m:
        name = m.group(1).strip()
    role = name
    # search for Uses: between title and Configuration (i.e., downwards until idx)
    uses_text = ''
    for k in range(found_title_idx+1, idx):
        mu = re.match(r'^\s*Uses:\s*(.*)', lines[k], re.I)
        if mu:
            uses_text = mu.group(1).strip()
            break
    templates = defaults_template(name=name, role=role, uses=uses_text)
    # collect block lines
    j = idx + 1
    block_lines_idx = []
    while j < len(lines):
        if re.match(r'^\s*\d+\.', lines[j]) or lines[j].strip().startswith('→'):
            break
        block_lines_idx.append(j)
        j += 1
    modified = False
    for bi in block_lines_idx:
        ln = lines[bi]
        m = re.match(r'^(\s*[-•*]\s+)([^:]+):\s*(.*)$', ln)
        if not m:
            continue
        leading, field_name, val = m.group(1), m.group(2).strip(), m.group(3).strip()
        if val != '':
            continue
        field_norm = norm(field_name)
        # find best default
        chosen = None
        for key, template in templates.items():
            key_norm = key
            key_tokens = key_norm.split()
            # require all tokens present if key has >1 token else any
            if len(key_tokens) > 1:
                if all(tok in field_norm for tok in key_tokens):
                    chosen = template
                    break
            else:
                if key_tokens[0] in field_norm:
                    chosen = template
                    break
        if chosen is None:
            chosen = 'TBD'
        # format if it contains placeholders
        try:
            chosen = chosen.format(name=name, role=role, uses=uses_text)
        except Exception:
            pass
        # write back
        lines[bi] = f"{leading}{field_name}: {chosen}"
        filled_fields_count += 1
        modified = True
    if modified:
        blocks_modified += 1

# write file if changed
if filled_fields_count > 0:
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')

print(f'Filled fields: {filled_fields_count}')
print(f'Blocks modified: {blocks_modified}')

# exit status
sys.exit(0)

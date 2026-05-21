#!/usr/bin/env python3
import sys, re
from collections import Counter

path = sys.argv[1]
with open(path, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

expected = [
    'separate dashboard', 'security layer', 'call', 'chat system', 'sms', 'voice & phone', 'recording', 'location', 'company setup', 'general info', 'model & language', 'timing', 'pricing', 'integration', 'responsibilities', 'tasks', 'behaviour', 'performance', 'summary', 'predictive', 'rules', 'memory', 'setup company', '2-step', 'import & export', 'reports', 'mcp'
]

features_indexes = [i for i,l in enumerate(lines) if l.strip().lower() == 'features:']
print('Found Features blocks:', len(features_indexes))

missing_report = []
counts = Counter()
for idx in features_indexes:
    block = []
    # collect next up to 60 lines
    for j in range(idx+1, min(idx+61, len(lines))):
        if re.match(r'^\s*\d+\.', lines[j]) or re.match(r'^\s*→', lines[j]):
            break
        block.append(lines[j])
    block_text = '\n'.join(block).lower()
    found = []
    for key in expected:
        if key in block_text:
            found.append(key)
            counts[key] += 1
    missing = [k for k in expected if k not in found]
    # find nearest title above
    title = 'unknown'
    j = idx-1
    while j >= 0:
        if lines[j].strip() == '':
            j -= 1
            continue
        m = re.match(r'^\s*(\d+\.)\s+(.*)', lines[j])
        if m:
            title = lines[j].strip()
            break
        if lines[j].strip().startswith('→'):
            title = lines[j].strip()
            break
        j -= 1
    missing_report.append((idx+1, title, missing, len(missing)))

complete = sum(1 for _,_,m,cnt in missing_report if cnt==0)
print('Blocks fully complete:', complete)
print('Blocks with missing fields:', len(missing_report)-complete)
print('\nTop missing counts (fields least present):')
for k,v in counts.most_common()[::-1]:
    print(f'  {k}: present in {v} blocks')

# show top 20 blocks with most missing
missing_report.sort(key=lambda x: x[3], reverse=True)
print('\nTop 20 blocks missing most fields:')
for line_no, title, missing, miss_count in missing_report[:20]:
    print(f'Line {line_no}: {title} — missing {miss_count}: {", ".join(missing[:6])}{"..." if miss_count>6 else ""}')

# exit code non-zero if any missing
if len(missing_report)-complete > 0:
    sys.exit(2)
else:
    sys.exit(0)

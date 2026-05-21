#!/usr/bin/env python3
import sys, re, os, csv

if len(sys.argv) < 2:
    print('Usage: generate_empty_features_csv.py <file> [out.csv]')
    sys.exit(2)

path = sys.argv[1]
out = sys.argv[2] if len(sys.argv) > 2 else 'reports/empty_features_report.csv'

os.makedirs(os.path.dirname(out) or '.', exist_ok=True)
with open(path, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

features_idxs = [i for i,l in enumerate(lines) if l.strip().lower() == 'features:']
rows = []

for idx in features_idxs:
    block = []
    j = idx + 1
    while j < len(lines):
        if re.match(r'^\s*\d+\.', lines[j]) or re.match(r'^\s*→', lines[j]):
            break
        block.append(lines[j])
        j += 1
    empties = []
    for ln in block:
        m = re.match(r'^\s*[-•*]\s+([^:]+):\s*(.*)$', ln)
        if m:
            field = m.group(1).strip()
            val = m.group(2).strip()
            if val == '':
                empties.append(field)
    # find nearest title above
    title = 'unknown'
    k = idx - 1
    while k >= 0:
        if lines[k].strip() == '':
            k -= 1
            continue
        m2 = re.match(r'^\s*(\d+\.)\s+(.*)', lines[k])
        if m2:
            title = lines[k].strip()
            break
        if lines[k].strip().startswith('→'):
            title = lines[k].strip()
            break
        k -= 1
    if empties:
        rows.append([idx+1, title, len(empties), ';'.join(empties)])

with open(out, 'w', newline='', encoding='utf-8') as csvf:
    writer = csv.writer(csvf)
    writer.writerow(['features_line', 'title', 'empty_count', 'empty_fields'])
    writer.writerows(rows)

print(f'Wrote {len(rows)} rows to {out}')

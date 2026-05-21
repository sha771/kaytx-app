#!/usr/bin/env python3
import sys, re
from collections import Counter

if len(sys.argv) < 2:
    print('Usage: find_empty_feature_values.py <file>')
    sys.exit(2)

path = sys.argv[1]
with open(path, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

features_idxs = [i for i,l in enumerate(lines) if l.strip().lower() == 'features:']
print('Found Features blocks:', len(features_idxs))

empty_blocks = []
total_empty = 0
field_counts = Counter()

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
                field_counts[field.lower()] += 1
                total_empty += 1
    # find title above
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
        empty_blocks.append((idx+1, title, empties))

print('Blocks with at least one empty field:', len(empty_blocks))
print('Total empty fields found:', total_empty)
print('\nTop 30 fields most frequently empty:')
for f,c in field_counts.most_common(30):
    print(f'  {f}: {c}')

print('\nTop 30 blocks with most empty fields:')
empty_blocks.sort(key=lambda x: len(x[2]), reverse=True)
for line_no, title, empties in empty_blocks[:30]:
    print(f'Line {line_no}: {title} — {len(empties)} empty: {", ".join(empties[:6])}{"..." if len(empties)>6 else ""}')

# print first 10 detailed blocks
print('\nSample detailed (first 10):')
for line_no, title, empties in empty_blocks[:10]:
    print(f'\nLine {line_no}: {title} — empty fields ({len(empties)}):')
    for e in empties:
        print(f'  - {e}')

# exit code 0 if none else 0 as informational
sys.exit(0)

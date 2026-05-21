#!/usr/bin/env python3
import sys, re
path = sys.argv[1]
with open(path, 'r', encoding='utf-8') as f:
    s = f.read()
config = s.count('Configuration:')
features = s.count('Features:')
print(f'Configuration occurrences: {config}')
print(f'Features occurrences: {features}')
lines = s.splitlines()
misses = []
for i, line in enumerate(lines):
    if 'Configuration:' in line:
        has = False
        k = i+1
        checked = 0
        while k < len(lines) and checked < 4:
            if lines[k].strip() == '':
                k += 1
                continue
            checked += 1
            if 'Features:' in lines[k]:
                has = True
                break
            k += 1
        if not has:
            # find nearest title above
            j = i
            title = None
            while j >= 0:
                m = re.match(r'^\s*(\d+\.)\s+(.*)', lines[j])
                if m:
                    title = lines[j].strip()
                    break
                j -= 1
            misses.append((i+1, title or 'unknown'))
print('Configurations scanned (by script):', config)
print('Missing Features blocks count:', len(misses))
if misses:
    print('\nFirst 50 missing:')
    for idx, title in misses[:50]:
        print(f'  line {idx}: {title}')

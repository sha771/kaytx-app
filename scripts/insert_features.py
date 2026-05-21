#!/usr/bin/env python3
import re
import os
import sys


def insert_features(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        original = f.read()
    lines = original.splitlines(keepends=True)

    backup_path = file_path + '.bak'
    if not os.path.exists(backup_path):
        with open(backup_path, 'w', encoding='utf-8') as bf:
            bf.write(original)

    new_lines = []
    inserted = 0
    i = 0
    total_lines = len(lines)
    config_count = 0
    # We'll check only the next few non-empty lines to avoid false positives
    LOOKAHEAD_NON_EMPTY = 4
    while i < total_lines:
        line = lines[i]
        new_lines.append(line)
        if 'Configuration:' in line:
            config_count += 1
            # look ahead a few non-empty lines to see if 'Features:' already present
            has_features = False
            k = i + 1
            checked_non_empty = 0
            while k < total_lines and checked_non_empty < LOOKAHEAD_NON_EMPTY:
                if lines[k].strip() == '':
                    k += 1
                    continue
                checked_non_empty += 1
                if 'Features:' in lines[k]:
                    has_features = True
                    break
                k += 1
            if not has_features:
                indent_match = re.match(r'^(\s*)', line)
                indent = indent_match.group(1) if indent_match else ''
                prefix = indent + '  '
                block = [
                    f"{prefix}Features:\n",
                    f"{prefix}  - Separate Dashboard: \n",
                    f"{prefix}  - Security Layer: \n",
                    f"{prefix}  - Call: \n",
                    f"{prefix}  - Chat System: \n",
                    f"{prefix}  - SMS: \n",
                    f"{prefix}  - Voice & Phone Number: \n",
                    f"{prefix}  - Recording & Script: \n",
                    f"{prefix}  - Location & Country: \n",
                    f"{prefix}  - Company Setup: \n",
                    f"{prefix}  - General Info: (Name, Role, Availability, Personality, Tone)\n",
                    f"{prefix}  - Model & Language: \n",
                    f"{prefix}  - Timing & Scheduling: \n",
                    f"{prefix}  - Pricing & Negotiation: \n",
                    f"{prefix}  - Integrations: \n",
                    f"{prefix}  - Responsibilities & Routing: \n",
                    f"{prefix}  - Tasks & Work Management: \n",
                    f"{prefix}  - Behaviour & Limitations: \n",
                    f"{prefix}  - Performance & Insights: \n",
                    f"{prefix}  - Summary & Notes: \n",
                    f"{prefix}  - Predictive Layers: \n",
                    f"{prefix}  - Rules & Regulations: \n",
                    f"{prefix}  - Memory: \n",
                    f"{prefix}  - Setup Company (detailed): \n",
                    f"{prefix}  - 2-Step Verification: \n",
                    f"{prefix}  - Import & Export Data: \n",
                    f"{prefix}  - Reports: \n",
                    f"{prefix}  - Integrations & MCP: \n",
                    f"{prefix}\n",
                ]
                new_lines.extend(block)
                inserted += 1
        i += 1

    if inserted > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

    # write debug log
    log_path = os.path.join(os.path.dirname(__file__), 'insert_features.log')
    with open(log_path, 'w', encoding='utf-8') as lf:
        lf.write(f"Processed file: {file_path}\n")
        lf.write(f"Configuration occurrences scanned: {config_count}\n")
        lf.write(f"Inserted features block count: {inserted}\n")

    print(f"Inserted features block in {inserted} locations.")
    return inserted


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: insert_features.py <path-to-file>')
        sys.exit(2)
    path = sys.argv[1]
    inserted = insert_features(path)
    sys.exit(0 if inserted >= 0 else 1)

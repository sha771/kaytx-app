# Security Operations Knowledge Base

## Security Incident Response Plan

### Severity Classification
| Level | Definition | Examples | Response |
|---|---|---|---|
| Critical | Active breach, data exfiltration | Ransomware, leaked credentials | Page CISO immediately, activate war room |
| High | Confirmed vulnerability being exploited | Zero-day in production | Engage within 1 hour |
| Medium | Vulnerability with limited exposure | Misconfigured S3 bucket | Fix within 24 hours |
| Low | Theoretical risk | Outdated dependency | Address in next sprint |

### Incident Response Phases
1. **Detect** — Alert from SIEM, user report, or external researcher
2. **Triage** — Determine severity, assign incident commander
3. **Contain** — Isolate affected systems, preserve evidence
4. **Eradicate** — Remove threat, patch vulnerability
5. **Recover** — Restore services, verify integrity
6. **Post-Mortem** — Within 48 hours, blameless, action items tracked

## Access Control Policy

### Principle of Least Privilege
- Default access: None
- Access granted via ticketed request
- Manager approval required for: production DB, admin consoles, customer data
- Quarterly access review by team leads
- Offboard within 4 hours of termination (automated via SCIM)

### Multi-Factor Authentication
**Required for**:
- All production systems (no exceptions)
- Admin panels
- Cloud provider consoles (AWS, GCP, Azure)
- Code repository (GitHub/GitLab)
- VPN access

**Approved MFA methods**:
- ✅ Hardware key (YubiKey) — preferred
- ✅ TOTP app (Authy, 1Password)
- ✅ Push notification (Okta Verify)
- ❌ SMS — deprecated, phase out by Q3

### Session Management
- Idle timeout: 15 minutes for admin tools
- Maximum session: 8 hours
- Concurrent sessions: Maximum 3 per user

## Data Classification

| Classification | Examples | Handling |
|---|---|---|
| Public | Marketing materials, public docs | No restrictions |
| Internal | Internal wikis, org charts | Encrypt in transit |
| Confidential | Financial data, contracts | Encrypt at rest + in transit, access logged |
| Restricted | PII, credentials, health data | Encrypt everywhere, MFA required, audit trail |

## Encryption Standards

### At Rest
- Database: AES-256 via PostgreSQL TDE or cloud KMS
- Backups: AES-256, separate key from primary
- File storage: Server-side encryption (S3 SSE-KMS)

### In Transit
- TLS 1.3 minimum (TLS 1.2 deprecated)
- HSTS enabled with preload
- Certificate rotation: automated, 90-day max

### Key Management
- Production keys in AWS KMS or HashiCorp Vault
- Key rotation: every 90 days for app keys, annually for root
- No hard-coded secrets in code (use secrets manager)
- Secrets scanning in CI pipeline

## Vulnerability Management

### Scanning Cadence
- **Dependencies**: Daily automated scan (Snyk/Dependabot)
- **Container images**: On every build (Trivy)
- **Infrastructure**: Weekly (Terraform static analysis)
- **Applications**: On every PR (SAST) + monthly DAST
- **External attack surface**: Monthly (manual pentest quarterly)

### SLAs for Remediation
| Severity | Time to Fix |
|---|---|
| Critical (CVSS 9-10) | 24 hours |
| High (CVSS 7-8.9) | 7 days |
| Medium (CVSS 4-6.9) | 30 days |
| Low (CVSS <4) | Next quarter |

## Compliance & Audit

### Annual Audits
- **SOC 2 Type II**: Q1 (continuous evidence collection via Drata)
- **ISO 27001**: Q2 (if applicable to customer base)
- **HIPAA**: Q3 (if handling PHI)

### Penetration Testing
- External: Annual by third party
- Internal: Semi-annual by red team
- Bug bounty: Continuous (HackerOne)

### Evidence Collection
Automate evidence gathering for:
- Access reviews (quarterly exports)
- Change management (Jira + Git integration)
- Vulnerability scans (API to GRC tool)
- Training completion (LMS export)

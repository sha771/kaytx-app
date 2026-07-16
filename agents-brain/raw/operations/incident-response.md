# Operations Knowledge Base — Incident Management

## On-Call Rotation

### Schedule
- **Primary on-call**: 1-week rotation, Monday 9am → next Monday 9am
- **Secondary on-call**: 1-week rotation, backup for primary
- **Schedule published**: 4 weeks in advance
- **Swap requests**: Via PagerDuty, must be approved by both parties

### Compensation
- Weekday on-call: $200/day stipend
- Weekend/holiday on-call: $400/day stipend
- Called outside business hours: 1.5x overtime
- Post-incident: Comp day for SEV-1 responses

## Incident Severity Matrix

### SEV-1: Critical Outage
**Definition**: Complete service unavailability or data loss affecting >10% of users

**Response**:
1. Acknowledge within 5 minutes
2. Create #incident-[date] Slack channel
3. Page Incident Commander (IC)
4. IC assigns roles: Scribe, Comms, Investigator
5. Status page updated within 15 minutes
6. Customer comms every 30 minutes until resolved
7. Executive briefing at 60 minutes if unresolved
8. Post-mortem scheduled within 24 hours

### SEV-2: Major Degradation
**Definition**: Significant feature broken or performance severely degraded

**Response**:
1. Acknowledge within 15 minutes
2. Slack channel created
3. Status page updated within 30 minutes
4. Customer comms every hour
5. Post-mortem within 48 hours

### SEV-3: Minor Issue
**Definition**: Limited impact, workaround available

**Response**:
1. Acknowledge within 1 hour
2. Ticket created
3. Fix in current or next sprint
4. No status page update unless customer-facing

## Communication Templates

### Initial Customer Comms (SEV-1)
> We're investigating an issue affecting [service]. Some customers may experience [symptom]. We're working to identify the root cause and will provide an update within 30 minutes. Track status at status.kaytx.com.

### Resolution Comms
> The issue with [service] has been resolved as of [time]. The root cause was [brief explanation]. We've implemented [fix] and are monitoring closely. We apologize for the inconvenience.

### Post-Mortem (Blameless Format)
1. **Summary**: What happened, in 2-3 sentences
2. **Impact**: Duration, users affected, revenue impact
3. **Timeline**: Minute-by-minute from detection to resolution
4. **Root Cause**: Technical root cause (5 whys)
5. **Contributing Factors**: What made it worse
6. **What went well**: Effective responses
7. **What went poorly**: Gaps in process
8. **Action Items**: Owner + due date for each

## Post-Incident Review Process

### Action Item Tracking
- All action items logged in Jira with "post-mortem" label
- Due dates: SEV-1 = 2 weeks, SEV-2 = 4 weeks
- Weekly review in Engineering All-Hands
- SLA: 90% of action items closed by due date

### Metrics Tracked
- **MTTA** (Mean Time to Acknowledge): Target < 5 min for SEV-1
- **MTTR** (Mean Time to Resolve): Target < 60 min for SEV-1
- **Incident frequency**: Target < 2 SEV-1 per quarter
- **Customer-reported %**: Target < 20% (we should detect before customers)

## Capacity & Scaling Runbook

### Database
- **CPU > 80% for 5 min**: Scale up instance, investigate slow queries
- **Connections > 80% of max**: Check for connection leaks, increase pool
- **Replication lag > 10s**: Check network, consider read replica scaling

### Application
- **Error rate > 1%**: Check recent deployments, rollback if correlated
- **P99 latency > 2s**: Investigate slow endpoints, check downstream deps
- **Memory > 85%**: Check for leaks, consider scaling

### Queue Backlog
- **Messages > 10,000**: Scale consumers, investigate poison messages
- **Dead letter queue growing**: Alert team, investigate root cause

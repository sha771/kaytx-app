# Company Brain Demo Video Prompt

**Duration:** 3-4 minutes
**Tone:** Professional, confident, slightly urgent (the 70% stat is real)
**Target audience:** CTOs, Heads of Engineering, HR Directors, Operations Leaders
**Core message:** "When employees leave, their knowledge stays."

---

## Scene 1: The Problem (0:00-0:30)

**Visual:** Split screen. Left side: employee packing a box, walking out the door. Right side: a new hire staring at a blank screen, frustrated.

**Narrator:**
"70% of your company's know-how walks out the door when an employee leaves."

**Visual:** Animated stat: `70% → 0%` with a knowledge graph fading to empty nodes.

**Narrator:**
"Projects stall. Onboarding starts from zero. Productivity drops 42% during every turnover cycle."

**Visual:** Dashboard showing productivity line graph cratering during personnel changes.

**Narrator:**
"Why? Because the knowledge lives in their head — not in your systems."

---

## Scene 2: The Solution — Company Brain (0:30-1:00)

**Visual:** Logo animation — "Company Brain" with a neural network brain graphic pulsing.

**Narrator:**
"This is Company Brain. It automatically captures every piece of knowledge flowing through your organization — from documents and conversations to meetings and code."

**Visual:** Split screen with multiple sources feeding into a central brain:
- Slack messages flowing in
- Documents being uploaded
- Zoom transcripts processing
- Emails being ingested
- Code commits analyzed

**Narrator:**
"Slack messages, documents, emails, Zoom transcripts, code commits — Company Brain ingests them all in real time."

**Visual:** Central brain hub glowing, connections radiating out.

**Narrator:**
"And it doesn't just store them. It extracts the skills, decisions, and procedures from every single piece of content."

---

## Scene 3: Skill.md — The Atomic Unit of Knowledge (1:00-1:45)

**Visual:** Animate a document being processed. Show text being analyzed, with skill categories lighting up (TECHNICAL, PROCESS, DECISION, TRIBAL, etc.).

**Narrator:**
"Every document, every conversation, every email gets its own skill.md file."

**Visual:** Open a skill.md file on screen:
```
---
title: "API Authentication Design"
skills: 7
people: 3
transferReadiness: ready
coverageScore: 85%
---

## Skills
- OAuth 2.0 Implementation (EXPERT)
- JWT Token Management (PROFICIENT)
- API Security Patterns (EXPERT)

## People
- Alex Chen (Senior DevOps)
- Sarah Lee (Security Lead)
```

**Narrator:**
"Each skill.md captures exactly what was learned: the skills involved, the people who know them, the competency level, and how ready that knowledge is to transfer to someone else."

**Visual:** Highlight "transferReadiness: ready" and "coverageScore: 85%".

**Narrator:**
"Nothing gets lost. Everything is structured. Everything is transferable."

---

## Scene 4: The Skill Brain Dashboard (1:45-2:15)

**Visual:** Dashboard UI appearing with live data.

**Narrator:**
"The Skill Brain Dashboard gives you a live view of your organization's knowledge health."

**Visual:** Camera moves across dashboard cards:
- Total skills tracked: 1,247
- People covered: 43
- At-risk skills: 14 (highlighted in red)
- Transfer ready: 312

**Narrator:**
"You can see exactly which skills are at risk — expert-level knowledge that isn't documented. And which skills are ready to transfer."

**Visual:** Click on "At-Risk Skills" → expands to show list with names and departments.

**Narrator:**
"Kubernetes cluster management. Legacy mainframe integration. Critical knowledge about to walk out the door."

**Visual:** Filter by department → Engineering shows heat map of skill coverage.

**Narrator:**
"Drill into any department to see coverage gaps before they become crises."

---

## Scene 5: Departure & Succession (2:15-2:50)

**Visual:** Alert notification: "Employee Departure Detected: Alex Chen"

**Narrator:**
"When an employee gives notice, Company Brain springs into action."

**Visual:** Animated pipeline:
1. Departure detected → Skill extraction triggered
2. All their documents, conversations, and decisions analyzed
3. Skill.md files generated for their entire body of work
4. Transfer plan created automatically

**Visual:** Transfer plan UI showing:
- Person: Alex Chen → Maria Garcia
- 12 skills to transfer
- 4 expert-level skills (PRIORITY: CRITICAL)
- Estimated handoff: 46 hours
- 3 skills undocumented (needs immediate sessions)

**Narrator:**
"A complete skill transfer plan is generated automatically, with estimated handoff hours, readiness scores, and priority levels. Nothing is left to chance."

**Visual:** Succession workflow with checklist items, scheduled sessions.

**Narrator:**
"The succession workflow manages the entire handoff — scheduling sessions, tracking progress, and alerting stakeholders until every skill is transferred."

---

## Scene 6: AI Agent Integration (2:50-3:20)

**Visual:** Two AI agent avatars communicating, with skill data flowing between them.

**Narrator:**
"Company Brain connects to your AI agent network through A2A — Agent-to-Agent protocol."

**Visual:** Text bubble: "skill_brain_query('Kubernetes')" → Results appear with matching skills, people, competency levels.

**Narrator:**
"Any AI agent can query the Skill Brain to find who knows what, assess transfer readiness, or even execute a transfer plan."

**Visual:** Agent dashboard showing 8 registered skill-brain tools: `skill_brain_query`, `skill_brain_at_risk`, `skill_brain_transfer_plan`, etc.

**Narrator:**
"Eight specialized tools let agents consult each other's knowledge, identify at-risk skills, and orchestrate handoffs autonomously."

**Visual:** A2A consult flow: Agent A → Agent B → Skill Brain → Transfer complete.

**Narrator:**
"When one agent needs a skill another agent has, Company Brain makes the transfer seamless."

---

## Scene 7: The Result (3:20-3:45)

**Visual:** Same split screen as opening — but now the departing employee leaves, and the new hire opens Company Brain to see everything.

**Narrator:**
"The result? When an employee leaves, 0% of their knowledge walks out the door."

**Visual:** Dashboard showing:
- Knowledge preservation: 100%
- Skills transferred: 12/12
- Onboarding time reduced: 60%

**Narrator:**
"New hires onboard in weeks instead of months. Projects don't stall. And your institutional knowledge grows forever."

**Visual:** Company Brain logo with tagline: "Knowledge that outlasts everyone."

**Narrator:**
"Company Brain. Knowledge that outlasts everyone."

---

## Technical Specs for Video Production

### Visual Style
- Dark mode UI with blue/purple gradient accents
- Clean, modern data visualization (charts, graphs, node-link diagrams)
- Smooth transitions — no harsh cuts
- Knowledge represented as glowing nodes in a network

### Key Stats to Display (animated)
| Stat | Value |
|------|-------|
| Knowledge loss without Company Brain | 70% |
| Productivity drop during turnover | 42% |
| Skills tracked per employee | ~30-50 |
| Transfer readiness improvement | 4x |
| Onboarding time reduction | 60% |

### Demo Data Setup
Use these mock entities for the demo:
- **Departing employee:** Alex Chen, Senior DevOps Engineer
- **Successor:** Maria Garcia, DevOps Engineer
- **Company:** AcmeCorp (250 employees, Engineering: 45)
- **Skills to transfer:** Kubernetes, Terraform, CI/CD, Mainframe Integration, Cloud Cost Optimization
- **At-risk skills:** Legacy Mainframe Integration (only Alex knows it)

### Software to Capture
1. Company Brain Dashboard (`/skill-brain`)
2. Employee Skill Profile (`/skill-brain/employee/person_1`)
3. Skill.md file (rendered as markdown)
4. Transfer Management (`/skill-brain/transfer`)
5. Succession Workflow (from Company Brain)
6. A2A agent consultation (showing skill query results)

### Audio
- **Voice:** Professional, authoritative, moderate pace
- **Background music:** Low, modern electronic/ambient — starts subtle, builds slightly through the problem section, peaks at the result, fades out
- **Sound effects:** Subtle UI clicks, data flow whooshes, alert chimes

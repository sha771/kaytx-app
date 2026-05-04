create a demo video like this https://openswarm.com/demo.webm
create a demo video like this https://openswarm.com/demo.webm


# Kaytx Demo Video Production Guide

A comprehensive guide to creating a professional product demo video similar to openswarm.com/demo.webm

---

## Video Overview

**Target Length:** 2-3 minutes  
**Style:** Modern SaaS product demo (smooth screen recordings, subtle animations, professional voiceover)  
**Resolution:** 1920x1080 (Full HD) or 2560x1440 (2K)  
**Frame Rate:** 60fps for smooth scrolling

---

## Section 1: Pre-Production

### Storyboard (3-3.5 Minutes Total)

| Time | Section | Visual | Audio/Narration |
|------|---------|--------|-----------------|
| 0:00-0:05 | HOOK | Notification chaos → text: "What if you never missed a message again?" | *Notification cascade SFX* → sudden silence |
| 0:05-0:30 | Unified Inbox | Messages tab, omnichannel view | "The Unified Inbox brings all your communication together" |
| 0:30-1:00 | AI Workforce | C-Suite hierarchy, agent categories | "From C-Suite executives to specialized agents - organized like a real company" |
| 1:00-1:15 | Token Efficiency | Cost comparison, savings metrics | "85% cost reduction through smart hierarchical routing" |
| 1:15-1:35 | Social Media | Content calendar, cross-platform publishing | "Social Media Management handles content creation to engagement tracking" |
| 1:35-2:00 | Social CRM | Customer profiles, 360° intelligence | "Social CRM gives you a complete view of every relationship" |
| 2:00-2:25 | Team Collaboration | Workspace, task boards, agent coordination | "Team Collaboration enables seamless human and AI coordination" |
| 2:25-2:35 | Brand Opening | Animated Kaytx logo reveal | "Meet Kaytx - The World's Most Comprehensive Enterprise AI Operating System" |
| 2:35-2:50 | The Problem | Fragmented tools visualization | "Enterprises struggle with disconnected tools and siloed departments" |
| 2:50-3:10 | Solution Intro | Main dashboard reveal | "Kaytx unifies everything into one AI Operating System" |
| 3:10-3:30 | ROI/CTA | Pricing tiers, ROI calculator, contact info | "Ready to transform your enterprise? Visit kaytx.com" |

---

## Section 2: Recording Setup

### Option A: Web Version (Recommended for Best Quality)

1. **Run the web version:**
   ```bash
   cd c:\Users\shaida\Desktop\kaytx-full-app
   npx expo start --web
   ```

2. **Browser Setup:**
   - Open in Chrome/Edge at `http://localhost:8081`
   - Press F12 → Toggle Device Toolbar (Ctrl+Shift+M)
   - Select "Responsive" and set dimensions to 1920x1080
   - Zoom to 75-80% for better visibility

3. **Screen Recorder Settings:**
   - **OBS Studio (Free):**
     - Source: Browser Window capture
     - Resolution: 1920x1080
     - FPS: 60
     - Output: MKV (remux to MP4 after)
   
   - **Camtasia (Paid - Easier):**
     - Region recording: 1920x1080
     - Smooth mouse highlighting
     - Auto-zoom on clicks

### Option B: Mobile Version

Use for showing mobile-specific features:
- iOS Simulator (Mac) + QuickTime recording
- Android Emulator + screen recorder
- Actual device + OBS capture card

---

## Section 3: Key Screens to Record

### Must-Have Shots (in order of appearance)

1. **Home Dashboard** (`/app/(tabs)/home.tsx`)
   - Full sidebar expanded showing all 600+ agents
   - Smooth scroll through AI Agents & Employees section
   - Show C-Suite, Command Center, Workforce sections

2. **AI Agents Grid** (`/app/ai-agent/`)
   - Agent categories (Executive, Accounting, Sales, etc.)
   - Individual agent cards with capabilities
   - Agent activation/deployment animation

3. **Enterprise Dashboard** (`/app/enterprise-dashboard.tsx`)
   - Key metrics cards ($2.4M MRR, 99.9% uptime)
   - System status indicators
   - Quick actions grid
   - Recent activity feed

4. **Command Center** (`/app/command-center-main.tsx`)
   - Real-time agent orchestration
   - Swarm intelligence visualization
   - Live agent status monitoring

5. **Specific Agent Examples** (pick 3-4):
   - CEO Advisor (`/app/ai-agent/executive/ceo-advisor.tsx`)
   - Sales Agent (`/app/ai-agent/sales-revenue-ai.tsx`)
   - Marketing Agent (`/app/ai-agent/marketing-growth-ai.tsx`)
   - Data Analytics (`/app/ai-agent/data-intelligence-ai.tsx`)

6. **Social Media Management** (`/app/social-media/`)
   - Content calendar
   - Analytics dashboard
   - Cross-platform publishing

7. **Security/Privacy Dashboard** (`/app/privacy-dashboard.tsx`)
   - Compliance badges (GDPR, SOC2, HIPAA)
   - Encryption indicators
   - Audit trail visualization

8. **Unified Inbox** (`/(tabs)/messages`)
   - Message list with channel icons (Email, WhatsApp, LinkedIn, SMS)
   - AI-powered priority badges
   - Conversation view with AI summaries
   - Omnichannel communication stream

9. **Social Media Management** (`/social-media/dashboard`)
   - Content calendar (monthly view)
   - Post scheduler interface
   - Cross-platform publishing previews
   - Engagement analytics charts

10. **Social CRM** (`/business/crm`)
   - Customer profile cards with social links
   - 360° interaction history timeline
   - Social sentiment scoring
   - Lead scoring and segmentation

11. **Team Collaboration** (`/collaboration/team-collaboration`)
   - Team workspace with human and AI members
   - Kanban task board
   - Real-time activity feed
   - Agent-to-agent task assignment

---

## Section 4: Recording Tips

### Smooth Movement Techniques

1. **Plan your mouse path** before recording
2. **Use keyboard shortcuts** for navigation (Tab, Arrow keys)
3. **Enable smooth scroll** in browser settings
4. **Record at 60fps** - essential for smooth scrolling demos
5. **Use click highlighting** (OBS plugin or Camtasia built-in)

### Professional Touches

```bash
# Add mouse click effects with OBS plugin
# Or use Camtasia's built-in cursor effects:
# - Highlight clicks with yellow circle
# - Add subtle click sound (optional)
# - Smooth zoom on important elements
```

### Recording Checklist

- [ ] Close all unrelated applications
- [ ] Hide browser bookmarks/toolbars
- [ ] Clear browser cache (fresh load)
- [ ] Use incognito mode (no extensions)
- [ ] Set system volume to 0 (no notification sounds)
- [ ] Disable screensaver/sleep mode
- [ ] Record in a quiet environment
- [ ] Use wired internet (no WiFi lag)

---

## Section 5: Editing

### Recommended Software

| Tool | Cost | Best For |
|------|------|----------|
| **CapCut** (Desktop) | Free | Quick editing, modern transitions |
| **DaVinci Resolve** | Free | Professional color grading |
| **Camtasia** | $249 | Screen recording + editing combined |
| **Adobe Premiere Pro** | $22/mo | Full professional workflow |

### Editing Structure

1. **Import all clips** and organize in bins
2. **Add voiceover first** - match visuals to audio
3. **Add B-roll** - use screen recordings as primary
4. **Text overlays** for key stats:
   - "628+ AI Agents"
   - "99.9% Uptime"
   - "$49/month vs $60,000/year"
5. **Transitions:** Use simple fades or slide transitions
6. **Background music:** Subtle, corporate, instrumental

### Text Overlay Templates

```markdown
Font: Inter, SF Pro, or Poppins (modern sans-serif)
Size: 48-64px for headlines, 24-32px for body
Color: White with subtle drop shadow or dark semi-transparent box
Animation: Fade in + slight upward motion (0.5s)

Key Stats to Highlight:
- 628+ AI Employees
- 15 C-Suite Executives
- 95+ Screens
- 99.9% Uptime
- AES-256 Encryption
- GDPR, SOC2, HIPAA Ready
```

### Music Recommendations

- **Uplift Corporate** - upbeat, modern tech feel
- **Technology Minimal** - subtle background
- **Corporate Motivational** - builds excitement

Sources: Epidemic Sound, Artlist, or YouTube Audio Library (free)

---

## Section 6: Voiceover Script

### Full Script (3.5 minutes)

**[0:00-0:05] HOOK**
> *Notification cascade SFX* — "What if you never missed a message again?"

**[0:05-0:30] Unified Inbox**
> "The Unified Inbox brings all your communication together. Email, WhatsApp, LinkedIn, SMS - one stream, automatically prioritized by AI."

**[0:30-1:00] AI Workforce**
> "Your AI workforce includes C-Suite executives for strategic decisions, VPs and Directors for operational oversight, and hundreds of specialized agents for execution."

**[1:00-1:15] Token Efficiency**
> "Traditional approaches drain resources. But KAYTX hierarchical architecture delivers an 85% cost reduction through smart routing."

**[1:15-1:35] Social Media Management**
> "Social Media Management handles everything from content creation to trend analysis, automated posting across platforms, and 24/7 engagement tracking."

**[1:35-2:00] Social CRM**
> "Social CRM combines traditional customer management with social intelligence - giving you a complete 360-degree view of every relationship."

**[2:00-2:25] Team Collaboration**
> "Team Collaboration enables seamless coordination between human and AI team members. Assign tasks, track progress on Kanban boards, and watch agents communicate in real-time."

**[2:25-2:35] Brand Opening**
> "Meet Kaytx. The world's most comprehensive Enterprise AI Operating System."

**[2:35-2:50] The Problem**
> "Enterprises today face three critical challenges: fragmented tools that don't talk to each other, scalability limits, and security vulnerabilities."

**[2:50-3:10] Solution Intro**
> "Kaytx solves all three with a unified AI workforce. Imagine having 628 specialized AI employees organized in a real corporate hierarchy, working 24/7 across every department."

**[3:10-3:30] ROI/CTA**
> "Compare $49 per month versus sixty thousand dollars per year. The ROI is immediate. Ready to transform your business? Visit kaytx.com today."



### Voiceover Tips

- Record in a quiet room with soft furnishings (reduces echo)
- Use a quality microphone (Blue Yeti, Rode NT-USB, or similar)
- Speak slowly and clearly - 130-150 words per minute
- Add 1-2 second pauses between sections
- Export as WAV or high-quality MP3 (320kbps)

---

## Section 7: Export & Delivery

### Export Settings

**Format:** MP4 (H.264 codec)  
**Resolution:** 1920x1080  
**Frame Rate:** 30fps (or 60fps if recorded at 60)  
**Bitrate:** 8-12 Mbps for web  
**Audio:** AAC, 320kbps, 48kHz

### Multiple Versions

Create these variants:

1. **Full Demo** (3:30) - Website hero, sales meetings
2. **Short Teaser** (0:30) - Social media, LinkedIn
3. **Feature Spotlight** (1:00) - Specific use cases
4. **Silent Version** - With just text overlays and music (social media)

### Hosting

- **Website:** Self-host MP4 or use Cloudflare Stream
- **Social:** LinkedIn, Twitter/X, YouTube
- **Sales:** Loom integration, custom landing page

---

## Section 8: Quick Start Checklist

### Day 1: Setup
- [ ] Set up recording environment
- [ ] Start the app in web mode
- [ ] Configure OBS/Camtasia
- [ ] Test record 30 seconds

### Day 2: Recording
- [ ] Record all planned screen sections
- [ ] Capture 2-3 takes of each section
- [ ] Record voiceover separately
- [ ] Back up all files

### Day 3: Editing
- [ ] Import to editing software
- [ ] Sync voiceover with visuals
- [ ] Add text overlays
- [ ] Add background music
- [ ] Review and adjust timing

### Day 4: Finalize
- [ ] Export final versions
- [ ] Create thumbnail image
- [ ] Upload to hosting platforms
- [ ] Embed on website

---

## Section 9: Tools & Resources

### Free Tools
- **OBS Studio** - Recording and streaming
- **DaVinci Resolve** - Professional editing
- **CapCut** - Easy mobile/desktop editing
- **Audacity** - Audio recording and cleanup

### Paid Tools (Worth It)
- **Camtasia** ($249) - All-in-one screen recording
- **ScreenFlow** ($149) - Mac-only, excellent quality
- **Adobe Creative Cloud** ($55/mo) - Full suite
- **Epidemic Sound** ($15/mo) - Quality music

### Stock Assets
- **Unsplash** - Free background images
- **LottieFiles** - Free animations
- **Figma Community** - UI mockup templates

---

## Next Steps

1. Review this guide and customize the storyboard
2. Set up your recording environment
3. Create a shot list specific to your app's current state
4. Schedule 2-3 days for recording and editing
5. Share the final video and gather feedback

---

**Questions or need help?** Refer to your existing Demo Speech and Presentation materials in `/speech and demo/` folder.

# Unified Inbox Demo Video - Professional Production Prompt

**Length:** 3-4 minutes  
**Platform:** YouTube / Website / Sales Demos  
**Style:** Founder-led, confident, visionary  
**Resolution:** 1920x1080 (60fps)

---

## Overview

| Scene | Time | Feature | Key Visual |
|-------|------|---------|------------|
| 1 | 0:00-0:20 | Hook | Notification chaos across platforms → unified dashboard |
| 2 | 0:20-0:50 | Omnichannel Inbox | 60+ platforms, unified stream, platform filtering |
| 3 | 0:50-1:30 | AI Priority System | High/Medium/Low scoring, VIP contacts, smart filtering |
| 4 | 1:30-2:10 | Priority Messaging Modal | VIP management, rules engine, analytics |
| 5 | 2:10-2:40 | Real-Time Sync | WebSocket connection, live message updates |
| 6 | 2:40-3:00 | Smart Actions | Star, archive, quick reply, AI summaries |
| 7 | 3:00-3:20 | Search & Organization | Universal search, platform-specific filters |
| 8 | 3:20-3:40 | Brand Close | CTA + integration showcase |

---

## SCENE 1: THE HOOK (0:00-0:20)

**Visual:**
- 0:00-0:05: Black screen with rapid notification sounds (email ping, WhatsApp chime, Slack notification, Twitter mention, SMS alert)
- 0:05-0:10: Split screen showing: Email inbox open, WhatsApp web, Slack workspace, Twitter DMs, SMS messages - all flashing with new messages
- 0:10-0:15: All screens collapse into one → KAYTX Unified Inbox logo appears
- 0:15-0:20: Dashboard slides into view with smooth animation showing 60+ platform icons

**Voiceover:**
> "Every day, you're drowning in notifications. 247 emails. 89 WhatsApp messages. 45 Slack pings. 32 Twitter DMs. 18 SMS texts. All scattered across different apps. Different tabs. Different devices. What if there was one place to see it all? One inbox to rule them all."

**Text Overlay:**
- "247 emails"
- "89 WhatsApp messages"
- "45 Slack pings"
- "32 Twitter DMs"
- "18 SMS texts"
- "What if... everything was in one place?"

---

## SCENE 2: OMNICHANNEL INBOX (0:20-0:50)

**Screen:** `app/communications/unified-inbox.tsx`

**Visual Sequence:**

**Shot 2A (0:20-0:30):** Full inbox overview
- Camera: Wide shot showing unified message list
- Show 15-20 messages with different platform icons
- Highlight platform badges: Email 📧 | WhatsApp 💬 | Instagram 📷 | Twitter 🐦 | Facebook 📘 | SMS 💭 | LinkedIn 🔗
- Show platform count: "Platforms: 60 (Email, SMS, WhatsApp, Instagram, Twitter, FB, LinkedIn, Slack, Discord, Telegram, and 50+ more)"
- Show filter tabs at top: All | Unread | Starred | High Priority

**Shot 2B (0:30-0:40):** Platform filtering
- Click "WhatsApp" platform filter → show only WhatsApp messages
- Click "Email" platform filter → show only email messages
- Click "Instagram" platform filter → show only Instagram DMs
- Click "All" → show unified stream with all platforms mixed
- Smooth transition between filters with platform-specific colors

**Shot 2C (0:40-0:50):** Message detail preview
- Hover over a high-priority email → show preview card
- Show sender avatar, platform badge, priority indicator, subject line
- Show unread indicator (left border highlight)
- Show star icon for important messages
- Show attachment count indicator

**Voiceover:**
> "The Unified Inbox brings 60+ platforms into one intelligent stream. Email. WhatsApp. Instagram. Twitter. Facebook. SMS. LinkedIn. Slack. Discord. Telegram. All in one place. Filter by platform. Filter by priority. Filter by status. The noise becomes signal. The chaos becomes clarity."

**Text Overlay:**
- "📬 60+ Platforms Unified"
- "🎯 Platform-Specific Filtering"
- "📊 Priority-Based Organization"
- "⚡ Real-Time Sync"

---

## SCENE 3: AI PRIORITY SYSTEM (0:50-1:30)

**Visual Sequence:**

**Shot 3A (0:50-1:00):** Priority visualization
- Show message cards with priority badges
- 🔴 High Priority (red badge with alert icon) - urgent messages
- 🟠 Medium Priority (orange badge with clock icon) - time-sensitive
- 🟢 Low Priority (green badge with check icon) - can wait
- Hover over high priority → tooltip shows "AI-scored: High intent based on keywords, sender importance, and response time"

**Shot 3B (1:00-1:15):** Filter by priority
- Click "High" filter → show only high-priority messages
- Show 3-4 urgent messages with red badges
- Click "Unread" filter → show all unread messages
- Click "Starred" filter → show starred/important messages
- Return to "All" → show full unified stream

**Shot 3C (1:15-1:30):** AI scoring explanation
- Click on a message → expand detail view
- Show "AI Score: 85/100" with circular progress indicator
- Show scoring factors:
  - +25: Urgent keywords detected
  - +20: VIP sender
  - +15: No response in 2+ hours
  - +15: High engagement history
  - +10: Multiple mentions
- Show "Priority: HIGH" with animated badge

**Voiceover:**
> "AI Priority System analyzes every message. Keywords. Sender importance. Response time. Engagement history. It calculates a score from 0 to 100. High. Medium. Low. Urgent messages float to the top. VIP contacts get special treatment. You focus on what matters. The AI handles the rest."

**Text Overlay:**
- "🎯 AI-Powered Priority Scoring"
- "👑 VIP Contact Recognition"
- "⏱️ Response Time Tracking"
- "📈 Smart Filtering"
- "🧠 94% AI Accuracy"

---

## SCENE 4: PRIORITY MESSAGING MODAL (1:30-2:10)

**Screen:** `components/messaging/PriorityMessagingModal.tsx`

**Visual Sequence:**

**Shot 4A (1:30-1:40):** Open Priority Modal
- Click star icon in header → Priority Messaging Modal slides up
- Show modal with 5 tabs: Inbox | VIP | Rules | Analytics | Settings
- Show AI banner: "AI Priority Engine Active - 3 VIP • 5 urgent • 94% accuracy"
- Show refresh button for re-scoring

**Shot 4B (1:40-1:50):** VIP Contacts tab
- Click "VIP" tab → show VIP contacts grid
- Show VIP stats: 12 VIP contacts, 45 unread, 12m avg response, 98% response rate
- Show VIP contact cards with crown badges
- Show toggle to mark/unmark contacts as VIP
- Click "Add VIP" button → show contact selector

**Shot 4C (1:50-2:00):** Rules Engine tab
- Click "Rules" tab → show priority rules
- Show enabled rules:
  - VIP Auto-Priority: Always show at top, bypass DND
  - Urgent Keywords: Mark as high priority, send alert
  - Quick Response Needed: Escalate if no reply in 2+ hours
  - Low Engagement Filter: Auto-snooze low engagement contacts
- Show toggle switches for each rule
- Show "Add Rule" button

**Shot 4D (2:00-2:10):** Analytics tab
- Click "Analytics" tab → show priority analytics
- Show timeframe selector: Day | Week | Month
- Show analytics cards:
  - Prioritized Contacts: 156
  - Avg Response Time: 18m (-23%)
  - Urgent Handled: 24 (+12)
  - AI Accuracy: 94%
- Show AI Insights:
  - "You saved 2.5h this week with smart prioritization"
  - "Peak activity hours: 9AM - 11AM"
  - "Most active platform: WhatsApp"

**Voiceover:**
> "Priority Messaging Modal gives you complete control. Manage VIP contacts. Create custom rules. View analytics. AI tells you who's important. Rules tell the system how to prioritize. Analytics show you the impact. You saved 2.5 hours this week. Response time dropped 23%. Urgent messages handled instantly. This is intelligent messaging."

**Text Overlay:**
- "👑 VIP Contact Management"
- "📋 Custom Priority Rules"
- "📊 Performance Analytics"
- "💡 AI-Powered Insights"
- "⏱️ 2.5h Time Saved/Week"

---

## SCENE 5: REAL-TIME SYNC (2:10-2:40)

**Visual Sequence:**

**Shot 5A (2:10-2:20):** WebSocket connection
- Show connection status indicator in header: "🟢 Real-time Connected"
- Show sync status: "Synced"
- Show incoming message counter: "Incoming: 0"
- Show message queue: "Queue: 0"

**Shot 5B (2:20-2:30):** Live message arrival
- Simulate incoming message from WhatsApp
- Show notification toast: "New message from Sarah via WhatsApp"
- Message appears at top of list with animation
- Unread count updates: "Incoming: 1"
- Sync status briefly shows "Syncing" then returns to "Synced"

**Shot 5C (2:30-2:40):** Multi-platform sync
- Show rapid sequence of incoming messages:
  - Email from john@company.com
  - WhatsApp from Mike
  - Twitter DM from @customer
  - Slack message from #sales
- All messages appear in real-time with platform badges
- Show last message timestamp updating
- End with smooth scroll through all new messages

**Voiceover:**
> "Real-time sync keeps you connected. WebSocket connection established. E2E encryption enabled. Messages arrive instantly from all platforms. WhatsApp. Email. Twitter. Slack. No refresh needed. No delay. Just instant communication across 60+ channels."

**Text Overlay:**
- "🔄 Real-Time WebSocket Sync"
- "🔐 End-to-End Encryption"
- "⚡ Instant Message Delivery"
- "📱 60+ Platforms Connected"
- "🟢 Always Online"

---

## SCENE 6: SMART ACTIONS (2:40-3:00)

**Visual Sequence:**

**Shot 6A (2:40-2:45):** Star messages
- Click star icon on important message → star turns gold
- Click "Starred" filter → show only starred messages
- Show starred count badge

**Shot 6B (2:45-2:50):** Archive messages
- Click archive icon → message slides away with animation
- Show archive confirmation toast
- Message removed from active inbox

**Shot 6C (2:50-3:00):** Quick actions menu
- Click ellipsis icon on message → action menu appears
- Show options: Mark as Read, Archive, Star, Mute, Delete, Reply
- Click "Reply" → quick reply composer opens
- Show AI-suggested responses: "Yes, I can help", "Let me check and get back to you", "Thanks for reaching out"

**Voiceover:**
> "Smart actions help you stay organized. Star important messages. Archive what you don't need. Mute noisy conversations. Quick reply with AI suggestions. One click. Done. Your inbox stays clean. Your focus stays sharp."

**Text Overlay:**
- "⭐ Star Important Messages"
- "📦 Archive with One Click"
- "🔇 Mute Noisy Conversations"
- "💬 AI-Suggested Replies"
- "⚡ Instant Actions"

---

## SCENE 7: SEARCH & ORGANIZATION (3:00-3:20)

**Visual Sequence:**

**Shot 7A (3:00-3:08):** Universal search
- Click search bar → type "project update"
- Show real-time search results across all platforms
- Highlight matching text in sender name, subject, and preview
- Show result count: "5 messages found"

**Shot 7B (3:08-3:15):** Advanced filtering
- Clear search
- Click "Unread" + "High Priority" + "WhatsApp" filters
- Show only unread, high-priority WhatsApp messages
- Show active filter chips with remove buttons

**Shot 7C (3:15-3:20):** Platform-specific search
- Select "Email" platform
- Type "invoice" in search
- Show only email messages containing "invoice"
- Show subject line highlighting

**Voiceover:**
> "Universal search finds anything in seconds. Search across all platforms. Filter by status. Filter by priority. Filter by platform. Combine filters for precision. Find that one message from three months ago. Instantly. Organization made simple."

**Text Overlay:**
- "🔍 Universal Search"
- "🎯 Multi-Filter Combinations"
- "📱 Platform-Specific Search"
- "⚡ Instant Results"
- "📊 Smart Organization"

---

## SCENE 8: BRAND CLOSE (3:20-3:40)

**Visual Sequence:**

**Shot 8A (3:20-3:30):** Feature recap
- Rapid montage of key features:
  - 60+ platforms unified
  - AI priority scoring
  - VIP contact management
  - Custom rules engine
  - Real-time sync
  - Smart actions
  - Universal search
- Each feature shows for 1.5 seconds with icon

**Shot 8B (3:30-3:35):** Integration showcase
- Show all 60+ platform icons in a grid
- Highlight key integrations: Email, WhatsApp, Instagram, Twitter, Facebook, SMS, LinkedIn, Slack, Discord, Telegram
- Show "Connect More" button

**Shot 8C (3:35-3:40):** Final CTA
- KAYTX logo animates in
- Tagline: "Unified Inbox - One Inbox. Every Platform."
- Show website: kaytx.com
- Fade to black with white text:
  - "The future of messaging isn't scattered."
  - "The future of messaging is unified."
  - "The future is KAYTX."

**Voiceover:**
> "Unified Inbox by KAYTX. 60+ platforms. One intelligent stream. AI-powered priority. Real-time sync. Smart actions. Universal search. The future of messaging isn't scattered. The future of messaging is unified. The future is KAYTX. Start free today."

**Text Overlay:**
- "KAYTX Unified Inbox"
- "One Inbox. Every Platform."
- "kaytx.com"
- "Start Free Today"

---

## Recording Setup

```bash
# Start the app
npx expo start --web

# Browser settings
- Chrome or Edge
- Resolution: 1920x1080
- Zoom: 75%
- Device mode: Responsive

# Recording software
- OBS Studio (free) or Camtasia (paid)
- Capture: Browser window
- Frame rate: 60fps
- Output: MKV (remux to MP4)
```

## Screen Recording Checklist

| Item | Status |
|------|--------|
| Close all unrelated apps | ☐ |
| Hide browser bookmarks | ☐ |
| Clear browser cache | ☐ |
| Use incognito mode | ☐ |
| Disable notifications | ☐ |
| Set volume to 0 | ☐ |
| Record in quiet room | ☐ |
| Use wired internet | ☐ |

---

## Twitter/X Short Version (30-45 sec)

| Time | Visual | Voiceover |
|------|--------|-----------|
| 0:00-0:05 | Notification chaos → Unified Inbox | "Drowning in notifications across 60+ platforms?" |
| 0:05-0:10 | Omnichannel Inbox | "Email, WhatsApp, Instagram, Twitter, all in one place" |
| 0:10-0:15 | AI Priority System | "AI scores every message 0-100. VIP contacts float to the top" |
| 0:15-0:20 | Priority Modal | "Custom rules. Analytics. 94% AI accuracy" |
| 0:20-0:25 | Real-Time Sync | "WebSocket sync. Instant delivery. E2E encryption" |
| 0:25-0:30 | Smart Actions | "Star. Archive. Quick reply. AI suggestions" |
| 0:30-0:45 | Logo + CTA | "Unified Inbox by KAYTX. Start free today." |

### Twitter Caption

```
📬 One Inbox. Every Platform.

📱 60+ Platforms Unified - Email, WhatsApp, Instagram, Twitter, and 50+ more
🎯 AI Priority Scoring - Messages scored 0-100, VIP contacts prioritized
👑 VIP Management - Mark important contacts, custom rules
📊 Analytics - Track response time, urgent handled, AI accuracy
🔄 Real-Time Sync - WebSocket connection, instant delivery
⚡ Smart Actions - Star, archive, quick reply with AI suggestions

Starts at $49/month ⚡

Link in bio to try free 👆

#Messaging #Productivity #AI #SaaS #Tech
```

---

## Key Hooks for Unified Inbox

### Hook 1: The Problem Hook
"Every day, you're drowning in notifications. 247 emails. 89 WhatsApp messages. 45 Slack pings. 32 Twitter DMs. 18 SMS texts. All scattered across different apps. Different tabs. Different devices. What if there was one place to see it all?"

### Hook 2: The Vision Hook
"Imagine 60+ platforms in one intelligent stream. Email. WhatsApp. Instagram. Twitter. Facebook. SMS. LinkedIn. Slack. Discord. Telegram. All in one place. Filter by platform. Filter by priority. The noise becomes signal."

### Hook 3: The AI Hook
"AI Priority System analyzes every message. Keywords. Sender importance. Response time. Engagement history. It calculates a score from 0 to 100. High. Medium. Low. Urgent messages float to the top. VIP contacts get special treatment."

### Hook 4: The Control Hook
"Priority Messaging Modal gives you complete control. Manage VIP contacts. Create custom rules. View analytics. AI tells you who's important. Rules tell the system how to prioritize. You saved 2.5 hours this week."

### Hook 5: The Real-Time Hook
"Real-time sync keeps you connected. WebSocket connection established. E2E encryption enabled. Messages arrive instantly from all platforms. No refresh needed. No delay. Just instant communication across 60+ channels."

### Hook 6: The Productivity Hook
"Smart actions help you stay organized. Star important messages. Archive what you don't need. Mute noisy conversations. Quick reply with AI suggestions. One click. Done. Your inbox stays clean. Your focus stays sharp."

---

## Technical Implementation Details

### Hooks Used

The Unified Inbox uses the following custom hooks:

#### `useMessaging` (from `providers/MessagingProvider.tsx`)
**Purpose:** Core messaging state management and real-time sync

**Returns:**
- `conversations`: Array of all conversations across platforms
- `activeConversation`: Currently selected conversation
- `setActiveConversation`: Function to set active conversation
- `sendMessage`: Function to send a message
- `markAsRead`: Function to mark conversation as read
- `searchConversations`: Function to search conversations
- `connectedServices`: Array of connected platform services
- `connectService`: Function to connect a new platform
- `disconnectService`: Function to disconnect a platform
- `isRealTimeConnected`: Boolean indicating WebSocket connection status
- `syncStatus`: Current sync status ('syncing' | 'synced' | 'error')
- `incomingMessages`: Counter for incoming messages
- `lastMessageTimestamp`: Timestamp of last received message
- `messageQueue`: Number of messages in processing queue
- `reconnectRealTime`: Function to manually reconnect WebSocket
- `clearIncomingCounter`: Function to reset incoming message counter

**Key Features:**
- Real-time WebSocket connection for live message updates
- E2E encryption for all messages
- AsyncStorage persistence for offline access
- Automatic message simulation for demo purposes
- Service connection management with credential storage

#### `useTheme` (from `providers/ThemeProvider.tsx`)
**Purpose:** Theme management for dark/light mode

**Returns:**
- `theme`: Current theme object with colors
- `toggleTheme`: Function to switch themes

#### `useSafeAreaInsets` (from `react-native-safe-area-context`)
**Purpose:** Handle safe area insets for notched devices

**Returns:**
- `insets`: Object with top, bottom, left, right safe area values

### Component Structure

**Main Screen:** `app/communications/unified-inbox.tsx`
- Unified message list with platform filtering
- Priority-based sorting and filtering
- Search functionality
- Smart actions (star, archive, etc.)

**Modal Component:** `components/messaging/PriorityMessagingModal.tsx`
- VIP contact management
- Custom priority rules engine
- Analytics dashboard
- Settings configuration

**Provider:** `providers/MessagingProvider.tsx`
- Global messaging state
- Real-time sync management
- Service connection handling

**Types:** `types/messaging.ts`
- `Message`: Message interface with attachments
- `Attachment`: Attachment type (image, video, file, audio)
- `Conversation`: Conversation interface with metadata
- `ServiceType`: Union type for 20+ platform types
- `Service`: Service configuration interface

**Utilities:** `utils/services.ts`
- `getServiceIcon()`: Returns platform-specific icon component
- `getServiceColor()`: Returns platform-specific brand color

### Supported Platforms (60+)

**Primary Platforms:**
- Email (Gmail, Outlook, Yahoo, etc.)
- WhatsApp
- Instagram DM
- Twitter/X DM
- Facebook Messenger
- SMS
- LinkedIn Messages
- Slack
- Discord
- Telegram
- Signal
- iMessage
- Microsoft Teams
- TikTok DM
- Snapchat
- Line
- WeChat
- Skype
- Viber

**And 40+ more platforms...**

---

## Production Notes

### Voice Style
- Confident, visionary, energetic
- Pace: Moderate with strategic pauses
- Tone: Professional yet approachable
- Emphasis: Key features and benefits

### Visual Style
- Clean, modern, minimal
- Smooth transitions between scenes
- Color palette: Platform-specific colors + KAYTX brand colors
- Typography: Bold, readable, consistent

### Music
- Upbeat, modern tech background music
- Volume: Low, doesn't compete with voiceover
- Mood: Inspiring, confident, forward-thinking

### Graphics
- Animated platform icons
- Priority badges with color coding
- Progress indicators for AI scoring
- Smooth data visualizations
- Real-time notification animations

---

## Target Audience

- **Primary**: Sales Directors, Customer Success Managers, Support Leads
- **Secondary**: Marketing Directors, Social Media Managers
- **Tertiary**: Founders, CEOs of SMBs, Freelancers

### Pain Points Addressed
- Scattered communication across 60+ platforms
- Missed urgent messages in the noise
- No unified view of customer interactions
- Manual prioritization of messages
- Slow response times
- Lack of message organization

### Desired Outcomes
- Unified omnichannel inbox
- AI-powered message prioritization
- VIP contact management
- Custom priority rules
- Real-time message sync
- Improved response times
- Better organization and search

---

**Document Version:** 1.0 | **Created:** May 21, 2026 | **Purpose:** Unified Inbox Demo Video Production

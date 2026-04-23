# Kaydex Platform - Revenue Streams Analysis

**Report Generated:** March 23, 2026  
**Classification:** Internal Financial Documentation  
**Status:** Production Active

---

## Overview

This document provides a detailed analysis of all revenue-generating streams within the Kaydex platform. The platform employs a hybrid SaaS model combining subscription, usage-based, and professional services revenue.

---

## 1. Subscription Revenue

### 1.1 Pricing Strategy

#### Tiered Pricing Model

The platform utilizes a value-based pricing strategy aligned with customer segments and usage patterns.

| Tier | Monthly/User | Annual/User | Savings (Annual) |
|------|--------------|-------------|------------------|
| Free | $0 | $0 | N/A |
| Starter | $29 | $290 | 17% |
| Professional | $79 | $790 | 17% |
| Enterprise | Custom | Custom | Negotiated |

### 1.2 Feature Matrix by Tier

```
┌─────────────────────────┬───────┬─────────┬─────────────┬───────────┐
│         Feature         │ Free  │ Starter │ Professional│ Enterprise│
├─────────────────────────┼───────┼─────────┼─────────────┼───────────┤
│ AI Agents               │   1   │    3    │  Unlimited  │ Unlimited │
│ AI Interactions/Month   │  100  │   500   │   2,500     │ Unlimited │
│ Storage                 │  5GB  │  50GB   │   500GB     │   5TB+    │
│ Team Members            │   1   │    5    │     20      │  Unlimited│
│ Integrations            │ Basic │Standard │  Advanced   │   Custom  │
│ API Rate Limit (req/min)│  100  │  1,000  │   10,000    │  100,000  │
│ Support                 │Community│Email  │  24/7 Priority│ Dedicated│
│ Analytics               │ Basic │Standard │   Advanced  │   Custom  │
│ Workflow Automation     │   -   │  Basic  │   Advanced  │   Custom  │
│ Custom AI Training      │   -   │   -     │   Limited   │   Full    │
│ SLA Guarantees          │   -   │   -     │    99.9%    │  99.99%   │
│ Dedicated Infrastructure│   -   │   -     │      -      │    Yes    │
│ White-Label Option      │   -   │   -     │      -      │    Yes    │
└─────────────────────────┴───────┴─────────┴─────────────┴───────────┘
```

### 1.3 Revenue Calculation Examples

#### Scenario A: Small Business (10 users)

| Component | Quantity | Unit Price | Monthly |
|-----------|----------|------------|---------|
| Starter Plan | 10 users | $29 | $290 |
| Additional AI Interactions | 500 | $0.002 | $1 |
| Storage Overages | 20GB | $0.023 | $0.46 |
| **Total Monthly** | | | **$291.46** |
| **Annual Revenue** | | | **$3,497.52** |

#### Scenario B: Mid-Market Company (50 users)

| Component | Quantity | Unit Price | Monthly |
|-----------|----------|------------|---------|
| Professional Plan | 50 users | $79 | $3,950 |
| Additional AI Interactions | 5,000 | $0.003 | $15 |
| Storage Overages | 200GB | $0.023 | $4.60 |
| Premium Support | 1 | $500 | $500 |
| **Total Monthly** | | | **$4,469.60** |
| **Annual Revenue** | | | **$53,635.20** |

#### Scenario C: Enterprise (500 users)

| Component | Quantity | Unit Price | Monthly |
|-----------|----------|------------|---------|
| Enterprise Plan | 500 users | Custom ($95) | $47,500 |
| Custom AI Training | 1 model | $2,500/mo | $2,500 |
| Dedicated Infrastructure | 1 | $5,000/mo | $5,000 |
| Implementation Services | Amortized | $10,000/yr | $833 |
| **Total Monthly** | | | **$55,833** |
| **Annual Revenue** | | | **$670,000** |

### 1.4 Subscription Lifecycle

```
Trial (14 days)
    ↓
Free Tier Activation
    ↓
Starter/Professional Upgrade
    ↓
Usage Growth → Enterprise Negotiation
    ↓
Annual Contract Negotiation
    ↓
Renewal/Upsell/Cross-sell
```

**Trial to Paid Conversion Targets:**
- Free → Paid: 15-20%
- Starter → Professional: 25-30%
- Professional → Enterprise: 10-15%

---

## 2. Usage-Based Revenue

### 2.1 AI Interaction Billing

#### Token-Based Pricing

| Model | Input Price | Output Price | Context Window |
|-------|-------------|--------------|----------------|
| **GPT-4 Turbo** | $0.01/1K tokens | $0.03/1K tokens | 128K |
| **GPT-4** | $0.03/1K tokens | $0.06/1K tokens | 8K |
| **GPT-3.5 Turbo** | $0.0005/1K tokens | $0.0015/1K tokens | 16K |
| **Claude 3 Opus** | $0.015/1K tokens | $0.075/1K tokens | 200K |
| **Claude 3 Sonnet** | $0.003/1K tokens | $0.015/1K tokens | 200K |
| **Kaydex Custom** | $0.02/1K tokens | $0.04/1K tokens | 32K |

#### Markup Strategy

Kaydex applies a 25-50% markup on AI API costs:

| Model | Provider Cost | Kaydex Price | Markup | Margin |
|-------|---------------|--------------|--------|--------|
| GPT-4 Turbo | $0.02/1K | $0.025/1K | 25% | 20% |
| GPT-3.5 Turbo | $0.001/1K | $0.002/1K | 100% | 50% |
| Claude 3 | $0.018/1K | $0.0225/1K | 25% | 20% |

#### Usage Tiers (Discount Structure)

| Monthly Usage | Discount | Effective Rate |
|---------------|----------|----------------|
| 0 - 100K tokens | 0% | Standard |
| 100K - 1M tokens | 10% | -10% |
| 1M - 10M tokens | 20% | -20% |
| 10M+ tokens | Custom | Negotiated |

### 2.2 Storage & Bandwidth Revenue

#### Storage Pricing

| Tier | Price/GB/Month | Annual Commitment |
|------|----------------|-------------------|
| Included | Tier dependent | - |
| Overage (Hot) | $0.023 | $0.020 |
| Cold Storage | $0.012 | $0.010 |
| Archive | $0.004 | $0.003 |

#### Bandwidth Pricing

| Type | Price/GB | Notes |
|------|----------|-------|
| Upload | Free | No charge |
| Download (First 1TB) | Free | Included |
| Download (Over 1TB) | $0.09 | Per GB |
| CDN Edge | $0.085 | Cached content |

### 2.3 Advanced Features Usage

#### Feature-Specific Pricing

| Feature | Base Price | Unit | Notes |
|---------|------------|------|-------|
| **Document Processing** | $0.10 | Per page | OCR, extraction |
| **Image Generation** | $0.04 | Per image | DALL-E 3 quality |
| **Video Processing** | $0.05 | Per minute | Transcription |
| **Data Export** | $0.001 | Per record | Bulk operations |
| **API Calls (Premium)** | $0.001 | Per call | Over 1M/month |
| **Webhook Delivery** | $0.0001 | Per webhook | Over 100K/month |
| **Advanced Analytics** | $500 | Per month | Custom dashboards |
| **Audit Reports** | $100 | Per report | Compliance exports |

### 2.4 Usage Revenue Projections

#### Monthly Usage-Based Revenue by Customer Segment

| Segment | Avg Monthly Usage | Price | Monthly Revenue |
|---------|-------------------|-------|---------------|
| Free Tier | 50K tokens | $0 | $0 |
| Starter (avg) | 400K tokens | $10 | $10 |
| Professional (avg) | 2M tokens | $50 | $50 |
| Enterprise (avg) | 20M tokens | $400 | $400 |

#### Annual Usage Revenue Forecast

| Year | Subscription % | Usage % | Professional Services % |
|------|----------------|---------|------------------------|
| Year 1 | 70% | 20% | 10% |
| Year 2 | 65% | 25% | 10% |
| Year 3 | 60% | 30% | 10% |

---

## 3. Professional Services Revenue

### 3.1 Implementation Services

#### Service Tiers

| Package | Price | Duration | Includes |
|---------|-------|----------|----------|
| **Basic Onboarding** | $2,500 | 1 week | Setup, training, basic config |
| **Standard Implementation** | $10,000 | 2-3 weeks | Custom workflows, integrations |
| **Enterprise Implementation** | $25,000+ | 4-8 weeks | Full customization, migration |

#### Implementation Components

**Phase 1: Discovery & Planning ($5,000 - $15,000)**
- Business requirements analysis
- Technical architecture review
- Integration planning
- Success metrics definition
- Timeline and resource planning

**Phase 2: Configuration & Integration ($10,000 - $30,000)**
- System configuration
- Custom workflow development
- Third-party integrations
- Data migration
- User acceptance testing

**Phase 3: Training & Launch ($5,000 - $10,000)**
- Administrator training
- End-user training materials
- Go-live support
- Post-launch optimization
- Knowledge transfer

### 3.2 Custom Development

#### AI Training Services

| Service | Price Range | Timeline | Deliverables |
|---------|-------------|----------|--------------|
| **Domain-Specific Model** | $15,000 - $50,000 | 4-8 weeks | Fine-tuned model |
| **Custom Agent Development** | $10,000 - $30,000 | 2-4 weeks | Custom agent |
| **Workflow Automation** | $5,000 - $20,000 | 1-3 weeks | Automated workflow |
| **Integration Development** | $8,000 - $25,000 | 2-6 weeks | Custom integration |
| **Data Pipeline Setup** | $10,000 - $40,000 | 3-8 weeks | ETL pipelines |

#### Consulting Services

| Engagement Type | Rate | Min Hours | Typical Use Case |
|-----------------|------|-----------|------------------|
| **Strategic Advisory** | $500/hr | 20 hrs | AI strategy, roadmap |
| **Technical Consulting** | $400/hr | 10 hrs | Architecture, best practices |
| **Training & Workshops** | $350/hr | 4 hrs | Team training, certification |
| **Managed Services** | $15,000/mo | - | Ongoing support, optimization |

### 3.3 Support Packages

#### Support Tiers

| Package | Monthly Price | Response Time | Includes |
|---------|---------------|---------------|----------|
| **Standard** | Included | 24 business hrs | Email, docs, community |
| **Business** | $1,000 | 4 business hrs | Priority email, phone |
| **Premium** | $5,000 | 1 business hr | Dedicated CSM, 24/7 |
| **Enterprise** | $15,000 | 1 hour (24/7) | Full white-glove service |

---

## 4. Revenue Recognition

### 4.1 Accounting Treatment

#### Subscription Revenue

**Monthly Subscriptions:**
- Recognized: Monthly over subscription period
- Deferred: Prepaid amounts recognized monthly
- Canceled: Remaining deferred revenue forfeited

**Annual Subscriptions:**
- Initial: Full amount deferred
- Recognition: 1/12 monthly
- Discounts: Recognized ratably

#### Usage-Based Revenue

**AI Interactions:**
- Recognized: When service delivered
- Estimates: Monthly true-up based on usage
- Credits: Applied against future usage

**Overage Charges:**
- Recognized: In month incurred
- Invoicing: Monthly in arrears
- Disputes: Deferred until resolution

#### Professional Services

**Fixed-Price Projects:**
- Recognized: Percentage of completion
- Milestones: Revenue at achievement
- Retainers: Recognized as services performed

**Time & Materials:**
- Recognized: As hours worked
- Billing: Monthly based on timesheets
- Adjustments: Credited/debited monthly

### 4.2 Revenue Recognition Schedule Example

#### Enterprise Deal: $120,000 Annual Contract

| Month | Subscription | Usage | Services | Total Revenue |
|-------|--------------|-------|----------|---------------|
| Jan | $8,333 | $2,000 | $5,000 | $15,333 |
| Feb | $8,333 | $1,800 | $3,000 | $13,133 |
| Mar | $8,333 | $2,200 | $2,000 | $12,533 |
| ... | ... | ... | ... | ... |
| Dec | $8,333 | $2,500 | $1,000 | $11,833 |
| **Total** | **$100,000** | **$24,000** | **$20,000** | **$144,000** |

**Deferred Revenue Movement:**
- Initial deferral: $120,000
- Monthly recognition: $10,000
- Year-end deferred: $0

---

## 5. Revenue Optimization Strategies

### 5.1 Expansion Revenue

#### Upsell Opportunities

| From | To | Revenue Increase | Conversion Rate |
|------|-----|------------------|-----------------|
| Free | Starter | $29/month | 15-20% |
| Starter | Professional | $50/month | 25-30% |
| Professional | Enterprise | Custom | 10-15% |

#### Cross-Sell Opportunities

| Add-on | Price | Target Segment | Attachment Rate |
|--------|-------|----------------|-----------------|
| Additional Storage | $0.023/GB | All tiers | 40% |
| Premium AI Models | $20/month | Professional+ | 25% |
| Advanced Analytics | $500/month | Enterprise | 60% |
| White-Label | $2,000/month | Enterprise | 30% |

### 5.2 Churn Prevention

#### Churn Risk Indicators

| Indicator | Risk Level | Action |
|-----------|------------|--------|
| Usage drop >50% | High | CSM outreach |
| Support tickets spike | Medium | Proactive support |
| Payment failures | High | Payment recovery |
| No login >30 days | High | Re-engagement campaign |
| Feature adoption <20% | Medium | Training offer |

#### Retention Programs

**Annual Commitment Incentives:**
- 17% discount for annual prepay
- Price lock guarantee
- Priority feature access
- Success planning sessions

**Usage-Based Loyalty:**
- Volume discounts
- Loyalty credits
- Exclusive features
- Executive business reviews

### 5.3 Pricing Experiments

#### A/B Testing Roadmap

| Test | Hypothesis | Success Metric | Timeline |
|------|------------|--------------|----------|
| Starter price $24 vs $29 | Lower price increases conversion | Trial-to-paid | 6 weeks |
| Professional $69 vs $79 | Price sensitivity | Conversion rate | 6 weeks |
| Usage bundle pricing | Bundles increase usage | ARPU | 8 weeks |
| Enterprise anchoring | High anchor increases deal size | ACV | 12 weeks |

---

## 6. Key Revenue Metrics

### 6.1 Monthly Tracking

| Metric | Formula | Target | Frequency |
|--------|---------|--------|-----------|
| **MRR** | Monthly Recurring Revenue | Growing 10% MoM | Daily |
| **ARPU** | MRR / Total Customers | $150+ | Monthly |
| **Expansion MRR** | Upsell + Cross-sell revenue | >20% of new MRR | Monthly |
| **Contraction MRR** | Downgrades + churn | <5% of MRR | Monthly |
| **Net MRR** | New + Expansion - Contraction - Churn | Positive | Monthly |
| **Usage Revenue** | AI + Storage + Features | 25% of total | Monthly |

### 6.2 Annual Tracking

| Metric | Formula | Target | Frequency |
|--------|---------|--------|-----------|
| **ARR** | Annual Recurring Revenue | $1M+ Year 1 | Monthly |
| **ACV** | ARR / Customer Count | $3,000+ | Quarterly |
| **LTV** | Average Revenue * Lifespan | >3x CAC | Annually |
| **Gross Margin** | (Revenue - COGS) / Revenue | >70% | Quarterly |
| **Rule of 40** | Growth Rate + Profit Margin | >40% | Annually |

### 6.3 Cohort Analysis

#### Cohort Revenue Retention

| Cohort | Month 0 | Month 6 | Month 12 | Month 18 | Month 24 |
|--------|---------|---------|----------|-----------|-----------|
| Jan 2026 | $10K | $11K | $12K | $14K | $15K |
| Feb 2026 | $15K | $16K | $18K | $20K | - |
| Mar 2026 | $20K | $22K | $25K | - | - |

**Net Revenue Retention Target:** 110%+ at 12 months

---

## 7. Revenue Projections

### 7.1 Conservative Scenario

| Quarter | New Customers | Expansion | Churn | Ending MRR | Ending ARR |
|-----------|---------------|-----------|-------|------------|------------|
| Q1 2026 | 50 | $2K | -$1K | $12K | $144K |
| Q2 2026 | 75 | $5K | -$2K | $25K | $300K |
| Q3 2026 | 100 | $10K | -$3K | $42K | $504K |
| Q4 2026 | 150 | $20K | -$5K | $75K | $900K |
| Q1 2027 | 200 | $40K | -$8K | $127K | $1.524M |
| Q2 2027 | 300 | $80K | -$13K | $214K | $2.568M |

### 7.2 Aggressive Scenario

| Quarter | New Customers | Expansion | Churn | Ending MRR | Ending ARR |
|-----------|---------------|-----------|-------|------------|------------|
| Q1 2026 | 100 | $5K | -$1K | $25K | $300K |
| Q2 2026 | 200 | $15K | -$3K | $62K | $744K |
| Q3 2026 | 350 | $40K | -$6K | $141K | $1.692M |
| Q4 2026 | 500 | $100K | -$10K | $331K | $3.972M |
| Q1 2027 | 800 | $200K | -$17K | $714K | $8.568M |
| Q2 2027 | 1,200 | $400K | -$29K | $1.485M | $17.82M |

### 7.3 Revenue Mix Evolution

| Year | Subscription | Usage | Services | Total ARR |
|------|--------------|-------|----------|-----------|
| 2026 | $1.5M (75%) | $300K (15%) | $200K (10%) | $2M |
| 2027 | $5M (70%) | $1.5M (21%) | $650K (9%) | $7.15M |
| 2028 | $15M (65%) | $6M (26%) | $2M (9%) | $23M |

---

## 8. Appendix

### A. Revenue Recognition Policies

#### ASC 606 Compliance

1. **Identify the Contract** - Signed agreement or online terms acceptance
2. **Identify Performance Obligations** - Platform access, support, professional services
3. **Determine Transaction Price** - Fixed (subscription) or variable (usage)
4. **Allocate Price** - Standalone selling price allocation
5. **Recognize Revenue** - As performance obligations satisfied

#### Key Judgments

- **Standalone Selling Prices:** Based on observable inputs from tiered pricing
- **Variable Consideration:** Usage estimates constrained to highly probable amounts
- **Performance Obligation Timing:**
  - Platform access: Over time (subscription period)
  - Support: Over time (subscription period)
  - Professional services: Point in time or over time based on contract

### B. Revenue System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  REVENUE MANAGEMENT STACK                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │   Stripe     │    │   Billing    │                  │
│  │   Billing    │◄──►│   Engine     │                  │
│  │              │    │              │                  │
│  └──────┬───────┘    └──────┬───────┘                  │
│         │                   │                           │
│         ▼                   ▼                           │
│  ┌──────────────────────────────────────┐               │
│  │         REVENUE DATABASE             │               │
│  │  (Subscriptions, Usage, Invoices)    │               │
│  └──────────────────┬─────────────────┘               │
│                     │                                    │
│         ┌───────────┴───────────┐                       │
│         │                       │                       │
│  ┌──────▼──────┐         ┌──────▼──────┐               │
│  │  Revenue    │         │  Reporting  │               │
│  │ Recognition │         │  & Analytics│               │
│  │   Engine    │         │             │               │
│  └─────────────┘         └─────────────┘               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

**Document Control:**
- Version: 1.0
- Last Updated: March 23, 2026
- Owner: Finance & Revenue Operations
- Distribution: Executive Team, Sales, Product

**Next Review:** June 23, 2026

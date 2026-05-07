const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..', 'app', 'ai-agent', 'healthcare');
const SUB = path.join(BASE, 'sub-agents');
const C = '#B71C1C';

const agents = [
  { id:'chief-medical-officer', title:'AI Chief Medical Officer', sub:'Clinical Strategy & Medical Leadership', icon:'Stethoscope', badge:'C-Suite',
    overview:'The AI Chief Medical Officer provides executive-level clinical leadership and strategic oversight across the Healthcare division. It drives clinical excellence, ensures quality standards enforcement, manages medical policy review, and delivers board-level clinical intelligence.',
    caps:['Clinical Strategy','Quality Standards','Medical Policy Review','Patient Safety','Clinical Innovation','Regulatory Compliance','Medical Staff Oversight','Evidence-Based Medicine','Clinical Outcomes','Healthcare Technology','Clinical Governance','Board Advisory'],
    resps:['Clinical strategy development and enterprise-wide medical direction','Quality standards enforcement and clinical excellence program leadership','Medical policy review, development, and organizational implementation','Patient safety program oversight and adverse event management','Clinical innovation and healthcare technology adoption leadership','Medical staff credentialing, performance, and governance oversight','Evidence-based medicine promotion and clinical guideline development','Clinical outcomes monitoring, benchmarking, and improvement initiatives','Board and executive clinical reporting and strategic medical advisory'],
    metrics:[{l:'Clinical Outcomes',v:'97.8%',c:'+2.3%'},{l:'Policy Reviews',v:'184',c:'+12'},{l:'Safety Score',v:'99.2%',c:'+0.8%'},{l:'Staff Compliance',v:'98.5%',c:'+1.2%'}],
    acts:[{t:'3 min ago',x:'Approved new clinical protocols for cardiology',i:'CircleCheckBig'},{t:'6 min ago',x:'Reviewed patient safety metrics for Q3',i:'ChartBarBig'},{t:'9 min ago',x:'Led medical staff credentialing review',i:'Stethoscope'},{t:'15 min ago',x:'Published updated medical policy guidelines',i:'FileText'},{t:'32 min ago',x:'Presented clinical outcomes to board',i:'TrendingUp'}],
    qa:[{l:'Clinical Dashboard',i:'ChartBarBig'},{l:'Team Chat',i:'MessageSquare'},{l:'Policy Review',i:'FileText'},{l:'Safety Alerts',i:'AlertTriangle'}],
    subs:[{id:'clinical-strategy-advisor',n:'AI Clinical Strategy Advisor',i:'Heart',d:'Strategic clinical planning and evidence-based advisory'},{id:'quality-standards-enforcer',n:'AI Quality Standards Enforcer',i:'ShieldCheck',d:'Enforces clinical quality standards and compliance protocols'},{id:'medical-policy-reviewer',n:'AI Medical Policy Reviewer',i:'FileText',d:'Reviews, develops, and implements medical policies'}]
  },
  { id:'vp-healthcare-operations', title:'AI VP Healthcare Operations', sub:'Operational Excellence & Workflow Optimization', icon:'Settings', badge:'VP Level',
    overview:'The AI VP Healthcare Operations leads operational strategy, workflow optimization, and performance management across the Healthcare division. It orchestrates sub-agents for workflow optimization, staff scheduling, and regulatory compliance monitoring.',
    caps:['Operations Strategy','Workflow Optimization','Staff Scheduling','Regulatory Compliance','Performance Management','Resource Allocation','Process Improvement','Capacity Planning','Quality Assurance','Budget Oversight','Vendor Management','Data Analytics'],
    resps:['Healthcare operations strategy development and execution oversight','Workflow optimization and process improvement across clinical operations','Staff scheduling, resource allocation, and capacity planning management','Regulatory compliance monitoring and audit readiness coordination','Performance management and operational KPI tracking and reporting','Budget oversight and financial performance management for operations','Vendor management and service level agreement enforcement','Data analytics and operational intelligence for decision support','Cross-departmental coordination and operational alignment'],
    metrics:[{l:'Op Efficiency',v:'94.2%',c:'+3.1%'},{l:'Staff Utilization',v:'91.8%',c:'+2.4%'},{l:'Compliance Rate',v:'99.1%',c:'+0.5%'},{l:'Cost Savings',v:'$2.4M',c:'+18%'}],
    acts:[{t:'3 min ago',x:'Optimized emergency department workflow',i:'Settings'},{t:'6 min ago',x:'Reviewed staff scheduling for next quarter',i:'Calendar'},{t:'9 min ago',x:'Completed regulatory compliance audit',i:'ShieldCheck'},{t:'15 min ago',x:'Allocated resources for new outpatient clinic',i:'Users'},{t:'32 min ago',x:'Presented operational efficiency report',i:'ChartBarBig'}],
    qa:[{l:'Ops Dashboard',i:'ChartBarBig'},{l:'Team Chat',i:'MessageSquare'},{l:'Schedule',i:'Calendar'},{l:'Compliance',i:'ShieldCheck'}],
    subs:[{id:'workflow-optimizer',n:'AI Workflow Optimizer',i:'Zap',d:'Optimizes clinical and administrative workflows for efficiency'},{id:'staff-scheduler',n:'AI Staff Scheduler',i:'Calendar',d:'Manages staff scheduling, shifts, and resource allocation'},{id:'regulatory-compliance-monitor',n:'AI Regulatory Compliance Monitor',i:'ShieldCheck',d:'Monitors regulatory compliance and audit readiness'}]
  },
  { id:'vp-patient-experience', title:'AI VP Patient Experience', sub:'Patient Satisfaction & Service Excellence', icon:'HeartPulse', badge:'VP Level',
    overview:'The AI VP Patient Experience leads patient satisfaction strategy, service improvement planning, and feedback coordination across the Healthcare division. It orchestrates sub-agents for satisfaction analysis, service improvement planning, and feedback coordination.',
    caps:['Patient Satisfaction','Service Improvement','Feedback Analysis','Experience Design','Patient Journey Mapping','Complaint Resolution','Satisfaction Analytics','Service Quality','Patient Engagement','Communication Strategy','Benchmarking','Continuous Improvement'],
    resps:['Patient experience strategy development and enterprise-wide implementation','Service improvement planning and quality enhancement program leadership','Patient feedback coordination, analysis, and action planning','Patient journey mapping and experience touchpoint optimization','Complaint resolution process management and escalation oversight','Patient satisfaction analytics, benchmarking, and reporting','Patient engagement and communication strategy development','Service quality monitoring and continuous improvement initiatives','Cross-departmental patient experience alignment and coordination'],
    metrics:[{l:'Satisfaction',v:'94.7%',c:'+3.2%'},{l:'NPS Score',v:'82',c:'+5'},{l:'Complaints Resolved',v:'1,847',c:'+12%'},{l:'Response Time',v:'2.1h',c:'-24%'}],
    acts:[{t:'3 min ago',x:'Analyzed patient satisfaction survey results',i:'HeartPulse'},{t:'6 min ago',x:'Launched service improvement initiative for ER',i:'TrendingUp'},{t:'9 min ago',x:'Coordinated patient feedback review session',i:'MessageSquare'},{t:'15 min ago',x:'Resolved escalated patient complaint',i:'Star'},{t:'32 min ago',x:'Published patient experience quarterly report',i:'ChartBarBig'}],
    qa:[{l:'Satisfaction Dashboard',i:'ChartBarBig'},{l:'Team Chat',i:'MessageSquare'},{l:'Feedback',i:'MessageSquare'},{l:'Escalations',i:'AlertTriangle'}],
    subs:[{id:'satisfaction-analyzer',n:'AI Satisfaction Analyzer',i:'Star',d:'Analyzes patient satisfaction data and identifies trends'},{id:'service-improvement-planner',n:'AI Service Improvement Planner',i:'TrendingUp',d:'Plans and implements service quality improvement initiatives'},{id:'feedback-coordinator',n:'AI Feedback Coordinator',i:'MessageSquare',d:'Coordinates patient feedback collection and action planning'}]
  },
  { id:'patient-services-manager', title:'AI Patient Services Manager', sub:'Patient Intake & Service Navigation', icon:'Users', badge:'Manager',
    overview:'The AI Patient Services Manager oversees patient intake coordination, service navigation, and discharge planning across the Healthcare division. It orchestrates sub-agents for intake coordination, service navigation, and discharge planning.',
    caps:['Patient Intake','Service Navigation','Discharge Planning','Patient Relations','Resource Coordination','Compliance','Staff Management','Quality Improvement','Budget Management','Patient Flow','Communication','Documentation'],
    resps:['Patient services operations management and team leadership','Patient intake coordination and registration process optimization','Service navigation and care pathway guidance for patients','Discharge planning and post-care transition coordination','Patient relations management and complaint resolution','Resource coordination and department capacity management','Regulatory compliance oversight for patient services','Staff scheduling, performance management, and development','Department budget management and financial performance oversight'],
    metrics:[{l:'Patients Served',v:'8,421',c:'+8.2%'},{l:'Avg Wait Time',v:'12 min',c:'-22%'},{l:'Discharge Efficiency',v:'94.1%',c:'+3.4%'},{l:'Satisfaction',v:'93.8%',c:'+2.1%'}],
    acts:[{t:'3 min ago',x:'Managed intake for 45 new patients',i:'Users'},{t:'6 min ago',x:'Coordinated discharge plans for 12 patients',i:'CircleCheckBig'},{t:'9 min ago',x:'Resolved 8 patient service complaints',i:'MessageSquare'},{t:'15 min ago',x:'Updated service navigation pathways',i:'ArrowRight'},{t:'32 min ago',x:'Improved satisfaction scores by 5%',i:'TrendingUp'}],
    qa:[{l:'Patient Queue',i:'Users'},{l:'Team Chat',i:'MessageSquare'},{l:'Discharge',i:'CircleCheckBig'},{l:'Escalations',i:'AlertTriangle'}],
    subs:[{id:'intake-coordinator',n:'AI Intake Coordinator',i:'ClipboardList',d:'Coordinates patient intake, registration, and onboarding'},{id:'service-navigator',n:'AI Service Navigator',i:'Compass',d:'Navigates patients through care pathways and service options'},{id:'discharge-planner',n:'AI Discharge Planner',i:'LogOut',d:'Plans and coordinates patient discharge and post-care transitions'}]
  },
  { id:'medical-billing-manager', title:'AI Medical Billing Manager', sub:'Revenue Cycle & Claims Management', icon:'DollarSign', badge:'Manager',
    overview:'The AI Medical Billing Manager oversees claims optimization, denial management, and revenue cycle analysis across the Healthcare division. It orchestrates sub-agents for claims optimization, denial management, and revenue cycle analysis.',
    caps:['Claims Optimization','Denial Management','Revenue Cycle','Billing Compliance','Payment Processing','Charge Capture','Insurance Verification','Appeals Management','Financial Reporting','Contract Analysis','Underpayment Recovery','A/R Management'],
    resps:['Medical billing operations management and team leadership','Claims optimization and submission accuracy improvement','Denial management, root cause analysis, and prevention strategies','Revenue cycle analysis, monitoring, and performance optimization','Billing compliance and regulatory requirement adherence','Payment processing, posting, and reconciliation oversight','Insurance verification and authorization management','Appeals management and overturn rate optimization','Financial reporting, A/R management, and cash flow optimization'],
    metrics:[{l:'Claims Processed',v:'14,821',c:'+7.3%'},{l:'Denial Rate',v:'4.2%',c:'-1.8%'},{l:'Revenue Collected',v:'$8.4M',c:'+12%'},{l:'Days in A/R',v:'32',c:'-8'}],
    acts:[{t:'3 min ago',x:'Processed 124 claims batch submission',i:'DollarSign'},{t:'6 min ago',x:'Appealed 18 denied claims with documentation',i:'FileText'},{t:'9 min ago',x:'Analyzed revenue cycle performance trends',i:'ChartBarBig'},{t:'15 min ago',x:'Identified underpayment patterns for 3 payers',i:'TrendingUp'},{t:'32 min ago',x:'Reduced denial rate by implementing pre-submission checks',i:'ShieldCheck'}],
    qa:[{l:'Billing Dashboard',i:'ChartBarBig'},{l:'Team Chat',i:'MessageSquare'},{l:'Denials',i:'AlertTriangle'},{l:'Claims Queue',i:'ClipboardList'}],
    subs:[{id:'claims-optimizer',n:'AI Claims Optimizer',i:'Zap',d:'Optimizes claims submission for maximum reimbursement and accuracy'},{id:'denial-manager',n:'AI Denial Manager',i:'ShieldAlert',d:'Manages claim denials, root cause analysis, and appeals'},{id:'revenue-cycle-analyst',n:'AI Revenue Cycle Analyst',i:'TrendingUp',d:'Analyzes revenue cycle performance and identifies optimization opportunities'}]
  },
  { id:'scheduling-manager', title:'AI Scheduling Manager', sub:'Appointment Optimization & Provider Scheduling', icon:'Calendar', badge:'Manager',
    overview:'The AI Scheduling Manager oversees appointment optimization, no-show prediction, and provider calendar management across the Healthcare division. It orchestrates sub-agents for appointment optimization, no-show prediction, and provider calendar management.',
    caps:['Schedule Optimization','No-Show Prediction','Provider Scheduling','Resource Allocation','Wait Time Management','Patient Flow','Capacity Planning','Automated Reminders','Telehealth Scheduling','Multi-Location Support','Analytics','Emergency Scheduling'],
    resps:['Appointment scheduling optimization and efficiency improvement','No-show prediction and proactive mitigation strategy implementation','Provider calendar management and utilization optimization','Resource allocation and capacity planning for clinical operations','Wait time reduction and patient flow management initiatives','Automated patient reminder and confirmation system management','Telehealth scheduling integration and virtual visit coordination','Multi-location scheduling support and provider rotation management','Emergency and urgent appointment scheduling protocols'],
    metrics:[{l:'Appointments',v:'12,847',c:'+9.1%'},{l:'No-Show Rate',v:'6.8%',c:'-3.2%'},{l:'Provider Util',v:'92.4%',c:'+4.1%'},{l:'Avg Wait',v:'8 min',c:'-28%'}],
    acts:[{t:'3 min ago',x:'Optimized 200+ appointments for next week',i:'Calendar'},{t:'6 min ago',x:'Predicted and mitigated 15 potential no-shows',i:'Target'},{t:'9 min ago',x:'Managed provider schedule changes for 3 departments',i:'Users'},{t:'15 min ago',x:'Reduced average wait time by 18%',i:'Clock'},{t:'32 min ago',x:'Added telehealth slots for cardiology',i:'Monitor'}],
    qa:[{l:'Schedule View',i:'Calendar'},{l:'Team Chat',i:'MessageSquare'},{l:'No-Show Alerts',i:'AlertTriangle'},{l:'Provider Cal',i:'Users'}],
    subs:[{id:'appointment-optimizer',n:'AI Appointment Optimizer',i:'Zap',d:'Optimizes appointment scheduling for efficiency and satisfaction'},{id:'no-show-predictor',n:'AI No-Show Predictor',i:'Target',d:'Predicts no-show risk and triggers proactive mitigation'},{id:'provider-calendar-manager',n:'AI Provider Calendar Manager',i:'Calendar',d:'Manages provider schedules, availability, and utilization'}]
  },
  { id:'patient-coordinator', title:'AI Patient Coordinator', sub:'Referrals & Pre-Authorization Management', icon:'GitBranch', badge:'Coordinator',
    overview:'The AI Patient Coordinator manages referral processing, pre-authorization management, and care transition coordination across the Healthcare division. It orchestrates sub-agents for referral processing, pre-authorization management, and care transition coordination.',
    caps:['Referral Processing','Pre-Authorization','Care Transitions','Insurance Coordination','Multi-Disciplinary Care','Communication','Documentation','Follow-up Tracking','Provider Liaison','Patient Advocacy','Scheduling','Compliance'],
    resps:['Referral processing and coordination across providers and specialists','Pre-authorization management and insurance authorization tracking','Care transition coordination between inpatient, outpatient, and community settings','Insurance coordination and benefits verification for patients','Multi-disciplinary care pathway coordination and communication','Patient communication and care plan education','Documentation management and care coordination records','Follow-up tracking and appointment adherence monitoring','Provider liaison and inter-facility transfer coordination'],
    metrics:[{l:'Referrals Processed',v:'6,421',c:'+11.2%'},{l:'Auth Approval',v:'96.8%',c:'+2.4%'},{l:'Transition Success',v:'98.1%',c:'+1.7%'},{l:'Avg Process Time',v:'1.2h',c:'-32%'}],
    acts:[{t:'3 min ago',x:'Processed 28 specialist referrals',i:'GitBranch'},{t:'6 min ago',x:'Obtained pre-authorization for 12 procedures',i:'ShieldCheck'},{t:'9 min ago',x:'Coordinated care transition for 8 patients',i:'ArrowRight'},{t:'15 min ago',x:'Verified insurance benefits for 15 patients',i:'FileText'},{t:'32 min ago',x:'Scheduled multi-disciplinary care conference',i:'Users'}],
    qa:[{l:'Referral Queue',i:'GitBranch'},{l:'Team Chat',i:'MessageSquare'},{l:'Auth Status',i:'ShieldCheck'},{l:'Transitions',i:'ArrowRight'}],
    subs:[{id:'referral-processor',n:'AI Referral Processor',i:'ArrowRight',d:'Processes and tracks referrals between providers and specialists'},{id:'pre-authorization-agent',n:'AI Pre-Authorization Agent',i:'ShieldCheck',d:'Manages insurance pre-authorizations and approval tracking'},{id:'care-transition-coordinator',n:'AI Care Transition Coordinator',i:'GitMerge',d:'Coordinates care transitions across settings and providers'}]
  },
  { id:'medical-coder', title:'AI Medical Coder', sub:'Code Assignment & Coding Compliance', icon:'Code', badge:'Specialist',
    overview:'The AI Medical Coder manages code assignment, coding compliance auditing, and coding update tracking across the Healthcare division. It orchestrates sub-agents for code assignment, coding compliance auditing, and coding update tracking.',
    caps:['ICD-10 Coding','CPT Coding','HCPCS Coding','Coding Compliance','Audit Support','Code Updates','DRG Assignment','Modifier Management','Coding Analytics','Documentation Review','Query Management','Training'],
    resps:['ICD-10, CPT, and HCPCS code assignment and accuracy assurance','Coding compliance auditing and regulatory adherence monitoring','Coding update tracking and regulatory change implementation','DRG assignment optimization and accuracy verification','Modifier management and coding specificity improvement','Coding analytics and performance benchmarking','Clinical documentation review and query management','Coding team training and education program coordination','Revenue impact analysis and coding optimization strategies'],
    metrics:[{l:'Codes Assigned',v:'24,847',c:'+8.4%'},{l:'Accuracy Rate',v:'98.9%',c:'+1.2%'},{l:'Compliance Score',v:'99.1%',c:'+0.7%'},{l:'Query Response',v:'2.1h',c:'-18%'}],
    acts:[{t:'3 min ago',x:'Assigned ICD-10 codes for 42 encounters',i:'Code'},{t:'6 min ago',x:'Completed coding compliance audit for cardiology',i:'ShieldCheck'},{t:'9 min ago',x:'Tracked new ICD-10 updates for Q4 implementation',i:'FileText'},{t:'15 min ago',x:'Resolved 8 coding queries from physicians',i:'MessageSquare'},{t:'32 min ago',x:'Optimized DRG assignment accuracy by 2%',i:'TrendingUp'}],
    qa:[{l:'Coding Queue',i:'Code'},{l:'Team Chat',i:'MessageSquare'},{l:'Compliance',i:'ShieldCheck'},{l:'Code Updates',i:'FileText'}],
    subs:[{id:'code-assigner',n:'AI Code Assigner',i:'Code',d:'Assigns accurate ICD-10, CPT, and HCPCS codes to clinical encounters'},{id:'coding-compliance-auditor',n:'AI Coding Compliance Auditor',i:'ShieldCheck',d:'Audits coding compliance and identifies regulatory adherence issues'},{id:'coding-update-tracker',n:'AI Coding Update Tracker',i:'RefreshCw',d:'Tracks coding regulatory updates and implements changes'}]
  },
  { id:'billing-specialist', title:'AI Billing Specialist', sub:'Charge Capture & Payment Processing', icon:'CreditCard', badge:'Specialist',
    overview:'The AI Billing Specialist manages charge capture, payment posting, and balance collection across the Healthcare division. It orchestrates sub-agents for charge capture, payment posting, and balance collection.',
    caps:['Charge Capture','Payment Posting','Balance Collection','Reconciliation','Insurance Billing','Patient Billing','Payment Plans','Refund Processing','Financial Reporting','Denial Follow-up','Contract Compliance','A/R Management'],
    resps:['Charge capture from clinical encounters and accuracy verification','Payment posting, reconciliation, and financial record management','Balance collection strategy development and execution oversight','Insurance billing and claims submission management','Patient billing, statement generation, and payment plan coordination','Refund processing and overpayment identification and resolution','Financial reporting and revenue performance analysis','Denial follow-up and appeals support for billing issues','Contract compliance monitoring and payer agreement adherence'],
    metrics:[{l:'Charges Captured',v:'$12.4M',c:'+14%'},{l:'Payment Accuracy',v:'99.2%',c:'+0.8%'},{l:'Collection Rate',v:'94.7%',c:'+3.1%'},{l:'Avg Collection Days',v:'28',c:'-6'}],
    acts:[{t:'3 min ago',x:'Captured charges for 56 clinical encounters',i:'CreditCard'},{t:'6 min ago',x:'Posted 124 insurance payments totaling $842K',i:'DollarSign'},{t:'9 min ago',x:'Initiated collection process for 32 past-due accounts',i:'TrendingUp'},{t:'15 min ago',x:'Reconciled payment discrepancies for 8 accounts',i:'ChartBarBig'},{t:'32 min ago',x:'Processed 4 patient refund requests',i:'CircleCheckBig'}],
    qa:[{l:'Billing Queue',i:'CreditCard'},{l:'Team Chat',i:'MessageSquare'},{l:'Collections',i:'DollarSign'},{l:'Payments',i:'ChartBarBig'}],
    subs:[{id:'charge-capture-agent',n:'AI Charge Capture Agent',i:'ClipboardList',d:'Captures and verifies charges from clinical encounters'},{id:'payment-poster',n:'AI Payment Poster',i:'DollarSign',d:'Posts payments and manages financial reconciliation'},{id:'balance-collector',n:'AI Balance Collector',i:'TrendingUp',d:'Manages balance collection strategies and past-due accounts'}]
  },
  { id:'care-coordinator', title:'AI Care Coordinator', sub:'Care Planning & Outcome Tracking', icon:'HeartHandshake', badge:'Coordinator',
    overview:'The AI Care Coordinator manages care plan development, follow-up scheduling, and outcome tracking across the Healthcare division. It orchestrates sub-agents for care plan management, follow-up scheduling, and outcome tracking.',
    caps:['Care Planning','Follow-up Management','Outcome Tracking','Multi-Disciplinary Coordination','Patient Education','Risk Stratification','Chronic Disease Management','Care Gap Analysis','Population Health','Quality Metrics','Communication','Documentation'],
    resps:['Comprehensive care plan development and management for patient populations','Follow-up scheduling and appointment adherence monitoring','Clinical outcome tracking and quality metric reporting','Multi-disciplinary care coordination and communication management','Patient education and self-management support coordination','Risk stratification and care intensity level assignment','Chronic disease management program coordination and oversight','Care gap analysis and proactive outreach for overdue patients','Population health management and quality improvement initiatives'],
    metrics:[{l:'Care Plans',v:'4,821',c:'+12.4%'},{l:'Follow-up Rate',v:'96.8%',c:'+4.2%'},{l:'Outcome Score',v:'94.1%',c:'+2.8%'},{l:'Care Gaps Closed',v:'1,247',c:'+18%'}],
    acts:[{t:'3 min ago',x:'Developed care plans for 24 new patients',i:'HeartHandshake'},{t:'6 min ago',x:'Scheduled follow-ups for 48 patients',i:'Calendar'},{t:'9 min ago',x:'Tracked outcomes for chronic disease cohort',i:'ChartBarBig'},{t:'15 min ago',x:'Closed 12 care gaps through proactive outreach',i:'CircleCheckBig'},{t:'32 min ago',x:'Coordinated multi-disciplinary team meeting',i:'Users'}],
    qa:[{l:'Care Plans',i:'HeartHandshake'},{l:'Team Chat',i:'MessageSquare'},{l:'Follow-ups',i:'Calendar'},{l:'Outcomes',i:'ChartBarBig'}],
    subs:[{id:'care-plan-manager',n:'AI Care Plan Manager',i:'ClipboardList',d:'Develops and manages comprehensive patient care plans'},{id:'follow-up-scheduler',n:'AI Follow-up Scheduler',i:'Calendar',d:'Schedules and monitors patient follow-up appointments'},{id:'outcome-tracker',n:'AI Outcome Tracker',i:'TrendingUp',d:'Tracks clinical outcomes and quality metrics'}]
  },
  { id:'health-records-specialist', title:'AI Health Records Specialist', sub:'Record Management & Data Integrity', icon:'FolderOpen', badge:'Specialist',
    overview:'The AI Health Records Specialist manages health record organization, release management, and data integrity checking across the Healthcare division. It orchestrates sub-agents for record organization, release management, and data integrity checking.',
    caps:['Record Management','Release of Information','Data Integrity','HIPAA Compliance','EHR Management','Document Scanning','Record Retrieval','Authentication','Retention Policies','Privacy Controls','Audit Support','System Integration'],
    resps:['Health record organization, maintenance, and lifecycle management','Release of information management and HIPAA compliance oversight','Data integrity checking and quality assurance across health information systems','EHR management and electronic health record system optimization','Document scanning, indexing, and digital records management','Record retrieval and timely information access for clinical teams','Patient authentication and identity verification for record access','Record retention policy management and compliance monitoring','Privacy controls, audit support, and breach prevention oversight'],
    metrics:[{l:'Records Managed',v:'84,217',c:'+6.2%'},{l:'Release Accuracy',v:'99.8%',c:'+0.3%'},{l:'Data Integrity',v:'99.9%',c:'+0.1%'},{l:'Retrieval Time',v:'1.8s',c:'-42%'}],
    acts:[{t:'3 min ago',x:'Organized 124 patient records for cardiology',i:'FolderOpen'},{t:'6 min ago',x:'Processed 18 release of information requests',i:'FileText'},{t:'9 min ago',x:'Completed data integrity check for radiology',i:'ShieldCheck'},{t:'15 min ago',x:'Updated record retention policies for 2024',i:'Clock'},{t:'32 min ago',x:'Resolved 4 record access authentication issues',i:'Lock'}],
    qa:[{l:'Records Search',i:'FolderOpen'},{l:'Team Chat',i:'MessageSquare'},{l:'Release Mgmt',i:'FileText'},{l:'Data Audit',i:'ShieldCheck'}],
    subs:[{id:'record-organizer',n:'AI Record Organizer',i:'FolderOpen',d:'Organizes and maintains health record systems and filing'},{id:'release-manager',n:'AI Release Manager',i:'FileText',d:'Manages release of information and HIPAA compliance'},{id:'data-integrity-checker',n:'AI Data Integrity Checker',i:'ShieldCheck',d:'Checks and ensures data integrity across health information systems'}]
  },
  { id:'telehealth-support', title:'AI Telehealth Support', sub:'Virtual Visits & Remote Monitoring', icon:'Monitor', badge:'Specialist',
    overview:'The AI Telehealth Support manages virtual visit facilitation, technical troubleshooting, and remote patient monitoring across the Healthcare division. It orchestrates sub-agents for virtual visit facilitation, tech troubleshooting, and remote monitoring.',
    caps:['Virtual Visits','Tech Support','Remote Monitoring','Video Integration','Patient Onboarding','Device Management','Alert Management','Data Streaming','Platform Support','Security','Compliance','Analytics'],
    resps:['Virtual visit facilitation and telehealth session management','Technical troubleshooting for patients and providers during virtual visits','Remote patient monitoring data collection and alert management','Video integration and telehealth platform optimization','Patient onboarding and digital literacy support for telehealth','Connected device management and data streaming coordination','Clinical alert management and escalation for remote monitoring','Telehealth security, privacy, and compliance oversight','Telehealth analytics and performance reporting'],
    metrics:[{l:'Virtual Visits',v:'8,421',c:'+24.2%'},{l:'Tech Success',v:'98.4%',c:'+1.8%'},{l:'Remote Patients',v:'2,847',c:'+18%'},{l:'Alert Response',v:'3.2 min',c:'-28%'}],
    acts:[{t:'3 min ago',x:'Facilitated 24 virtual visit sessions',i:'Monitor'},{t:'6 min ago',x:'Resolved 8 technical issues for patients',i:'Wrench'},{t:'9 min ago',x:'Monitored remote vitals for 142 patients',i:'Activity'},{t:'15 min ago',x:'Escalated 2 clinical alerts from remote monitoring',i:'AlertTriangle'},{t:'32 min ago',x:'Onboarded 12 new patients to telehealth platform',i:'Users'}],
    qa:[{l:'Virtual Visits',i:'Monitor'},{l:'Team Chat',i:'MessageSquare'},{l:'Tech Support',i:'Wrench'},{l:'Remote Alerts',i:'AlertTriangle'}],
    subs:[{id:'virtual-visit-facilitator',n:'AI Virtual Visit Facilitator',i:'Video',d:'Facilitates and manages virtual visit sessions end-to-end'},{id:'tech-troubleshooter',n:'AI Tech Troubleshooter',i:'Wrench',d:'Troubleshoots technical issues for telehealth participants'},{id:'remote-monitor',n:'AI Remote Monitor',i:'Activity',d:'Monitors remote patient data and manages clinical alerts'}]
  },
  { id:'healthcare-compliance', title:'AI Healthcare Compliance', sub:'Regulatory Tracking & Audit Preparation', icon:'ShieldCheck', badge:'Specialist',
    overview:'The AI Healthcare Compliance manages regulation tracking, audit preparation, and compliance training coordination across the Healthcare division. It orchestrates sub-agents for regulation tracking, audit preparation, and compliance training coordination.',
    caps:['Regulation Tracking','Audit Preparation','Compliance Training','HIPAA Compliance','Joint Commission','CMS Compliance','Policy Management','Risk Assessment','Incident Reporting','Corrective Actions','Vendor Compliance','Documentation'],
    resps:['Regulation tracking and regulatory change management across healthcare operations','Audit preparation and survey readiness coordination for regulatory bodies','Compliance training program development and coordination','HIPAA compliance monitoring and privacy program management','Joint Commission and CMS compliance standards adherence oversight','Policy management and organizational compliance framework maintenance','Risk assessment and compliance vulnerability identification and mitigation','Incident reporting and corrective action plan management','Vendor compliance monitoring and third-party risk management'],
    metrics:[{l:'Regulations Tracked',v:'847',c:'+42'},{l:'Audit Readiness',v:'98.1%',c:'+2.3%'},{l:'Training Rate',v:'97.4%',c:'+3.1%'},{l:'Incidents',v:'3',c:'-57%'}],
    acts:[{t:'3 min ago',x:'Tracked 12 new regulatory updates from CMS',i:'ShieldCheck'},{t:'6 min ago',x:'Prepared audit documentation for Joint Commission',i:'FileText'},{t:'9 min ago',x:'Coordinated compliance training for 84 staff',i:'Users'},{t:'15 min ago',x:'Completed HIPAA risk assessment for new system',i:'Lock'},{t:'32 min ago',x:'Resolved 2 compliance incidents with corrective actions',i:'CircleCheckBig'}],
    qa:[{l:'Regulation Tracker',i:'ShieldCheck'},{l:'Team Chat',i:'MessageSquare'},{l:'Audit Prep',i:'FileText'},{l:'Training',i:'Users'}],
    subs:[{id:'regulation-tracker',n:'AI Regulation Tracker',i:'Search',d:'Tracks regulatory changes and updates across healthcare laws'},{id:'audit-preparer',n:'AI Audit Preparer',i:'FileText',d:'Prepares documentation and readiness for regulatory audits'},{id:'compliance-training-coordinator',n:'AI Compliance Training Coordinator',i:'GraduationCap',d:'Coordinates compliance training programs and staff education'}]
  },
  { id:'quality-improvement-specialist', title:'AI Quality Improvement Specialist', sub:'Metric Analysis & Benchmark Reporting', icon:'TrendingUp', badge:'Specialist',
    overview:'The AI Quality Improvement Specialist manages metric analysis, improvement planning, and benchmark reporting across the Healthcare division. It orchestrates sub-agents for metric analysis, improvement planning, and benchmark reporting.',
    caps:['Metric Analysis','Improvement Planning','Benchmark Reporting','Quality Indicators','PDSA Cycles','Root Cause Analysis','Data Analytics','Performance Tracking','Best Practices','Lean Methodology','Six Sigma','Outcome Measurement'],
    resps:['Quality metric analysis and performance indicator monitoring and reporting','Improvement planning and quality initiative development and implementation','Benchmark reporting and industry standard comparison analysis','Quality indicator development and organizational performance tracking','PDSA cycle management and improvement project execution oversight','Root cause analysis and systemic quality issue identification and resolution','Data analytics and quality intelligence for decision support','Performance tracking and trend analysis for quality outcomes','Best practice identification, Lean methodology, and Six Sigma application'],
    metrics:[{l:'Metrics Tracked',v:'247',c:'+18'},{l:'Improvement Rate',v:'94.2%',c:'+4.1%'},{l:'Benchmark Score',v:'96.8%',c:'+2.7%'},{l:'Projects Completed',v:'42',c:'+8'}],
    acts:[{t:'3 min ago',x:'Analyzed quality metrics for surgical department',i:'TrendingUp'},{t:'6 min ago',x:'Developed improvement plan for ED wait times',i:'ChartBarBig'},{t:'9 min ago',x:'Published benchmark report against national standards',i:'FileText'},{t:'15 min ago',x:'Completed root cause analysis for medication error',i:'Search'},{t:'32 min ago',x:'Launched PDSA cycle for infection rate reduction',i:'Zap'}],
    qa:[{l:'Quality Dashboard',i:'ChartBarBig'},{l:'Team Chat',i:'MessageSquare'},{l:'Benchmarks',i:'TrendingUp'},{l:'Improvements',i:'Zap'}],
    subs:[{id:'metric-analyzer',n:'AI Metric Analyzer',i:'BarChart3',d:'Analyzes quality metrics and performance indicators'},{id:'improvement-planner',n:'AI Improvement Planner',i:'Zap',d:'Plans and implements quality improvement initiatives'},{id:'benchmark-reporter',n:'AI Benchmark Reporter',i:'TrendingUp',d:'Reports benchmark comparisons against industry standards'}]
  }
];

// Collect all unique icons
const allIcons = new Set();
agents.forEach(a => {
  allIcons.add(a.icon);
  a.subs.forEach(s => allIcons.add(s.i));
  a.acts.forEach(act => allIcons.add(act.i));
  a.qa.forEach(q => allIcons.add(q.i));
  allIcons.add('Activity'); allIcons.add('Star'); allIcons.add('Users');
  allIcons.add('CircleCheckBig'); allIcons.add('Clock'); allIcons.add('Target');
  allIcons.add('ArrowRight'); allIcons.add('ChartBarBig'); allIcons.add('TrendingUp');
  allIcons.add('ChevronRight'); allIcons.add('MessageSquare'); allIcons.add('AlertTriangle');
  allIcons.add('FileText'); allIcons.add('ShieldCheck'); allIcons.add('Zap');
});

function genMain(a) {
  const icons = new Set([a.icon, 'Activity','Star','Users','CircleCheckBig','Clock','Target','ArrowRight','ChartBarBig','TrendingUp','ChevronRight','MessageSquare','AlertTriangle','FileText','ShieldCheck','Zap']);
  a.subs.forEach(s => icons.add(s.i));
  a.acts.forEach(act => icons.add(act.i));
  a.qa.forEach(q => icons.add(q.i));

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  ${[...icons].join(', ')}
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = ${JSON.stringify(a.subs.map(s => ({id:s.id,name:s.n,icon:s.i,desc:s.d})),null,2)};

const QUICK_ACTIONS = ${JSON.stringify(a.qa.map(q => ({label:q.l,icon:q.i})),null,2)};

const METRICS = ${JSON.stringify(a.metrics.map(m => ({label:m.l,value:m.v,change:m.c,trend:'up'})),null,2)};

export default function ${a.id.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join('')}Page() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = ${JSON.stringify(a.acts.length ? [
    {label:'Tasks',value:String(2000+Math.floor(Math.random()*2000)),icon:'CircleCheckBig',color:'#34C759'},
    {label:'Uptime',value:'99.9%',icon:'Activity',color:'#007AFF'},
    {label:'Response',value:(0.5+Math.random()*1.5).toFixed(1)+'s',icon:'Clock',color:'#FF9500'},
    {label:'Accuracy',value:(96+Math.random()*3).toFixed(1)+'%',icon:'Target',color:'#B71C1C'}
  ] : [],null,2)};

  const capabilities = ${JSON.stringify(a.caps,null,2)};

  const responsibilities = ${JSON.stringify(a.resps,null,2)};

  const activities = ${JSON.stringify(a.acts.map(act => ({time:act.t,text:act.x,icon:act.i})),null,2)};

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${C}20' }]}>
          <${a.icon} size={48} color="${C}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${a.title}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>${a.sub}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '${C}22' }]}>
            <Star size={12} color="${C}" />
            <Text style={[styles.badgeText, { color: '${C}' }]}>${a.badge}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>${a.subs.length} Sub-Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}>
            <ShieldCheck size={12} color="#AF52DE" />
            <Text style={[styles.badgeText, { color: '#AF52DE' }]}>Healthcare</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          ${a.overview}
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '${C}18' }]}>
              <Text style={[styles.tagText, { color: '${C}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="${C}" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Direct reports and specialized sub-agents executing ${a.title.replace('AI ','').toLowerCase()} functions.
        </Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            onPress={() => router.push(\`/ai-agent/healthcare/sub-agents/\${agent.id}\`)}
            style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={[styles.agentIcon, { backgroundColor: '#F59E0B20' }]}>
              <agent.icon size={28} color="#F59E0B" />
            </View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.desc}</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          {METRICS.map((m, i) => (
            <View key={i} style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.value}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.label}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>{m.change}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '${C}15' }]}>
              <act.icon size={14} color="${C}" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '${C}12' }]}>
              <action.icon size={24} color="${C}" />
              <Text style={[styles.actionText, { color: '${C}' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="${a.id}" agentName="${a.title}" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  metricValue: { fontSize: 20, fontWeight: 'bold' },
  metricLabel: { fontSize: 12, marginTop: 4 },
  metricTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
`;
}

// Generate main agent pages
agents.forEach(a => {
  const content = genMain(a);
  fs.writeFileSync(path.join(BASE, a.id + '.tsx'), content);
  console.log('Generated main:', a.id);
});

console.log('Done generating', agents.length, 'main agent pages');

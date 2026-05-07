const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'app', 'ai-agent', 'manufacturing');

const agents = [
  {
    file: 'vp-quality-assurance.tsx',
    componentName: 'VPQualityAssurancePage',
    title: 'AI VP Quality Assurance',
    subtitle: 'Quality Standards & Compliance Strategy',
    icon: 'Award',
    iconColor: '#5C6BC0',
    level: 'VP Level',
    subAgents: [
      { id: 'quality-standards-enforcer', name: 'AI Quality Standards Enforcer', icon: 'Shield', desc: 'Quality standards enforcement and compliance monitoring across all production lines' },
      { id: 'audit-scheduler', name: 'AI Audit Scheduler', icon: 'Calendar', desc: 'Internal and external audit scheduling, planning, and coordination' },
      { id: 'corrective-action-monitor', name: 'AI Corrective Action Monitor', icon: 'Activity', desc: 'CAPA tracking, corrective action verification, and effectiveness monitoring' },
    ],
    capabilities: ['Quality Strategy', 'QMS Governance', 'Regulatory Affairs', 'Supplier Quality Strategy', 'Continuous Improvement', 'Metrics & Reporting', 'ISO 9001/14001', 'Six Sigma', 'CAPA Management', 'Audit Coordination', 'SPC Analysis', 'Supplier Audits'],
    responsibilities: [
      'Quality assurance strategy development and governance framework oversight',
      'QMS framework development, deployment, and continuous improvement',
      'Regulatory affairs management and compliance across all standards',
      'Supplier quality strategy and vendor qualification programs',
      'Continuous improvement program leadership including Six Sigma deployment',
      'Quality metrics development, executive reporting, and board advisory',
      'Audit program management including ISO and customer audits',
      'CAPA system oversight and corrective action effectiveness monitoring'
    ],
    activities: [
      { time: '3 min ago', text: 'Set Q3 quality improvement targets for all plants', icon: 'CircleCheckBig' },
      { time: '8 min ago', text: 'Reviewed regulatory audit findings for ISO 9001', icon: 'FileText' },
      { time: '15 min ago', text: 'Approved supplier quality program for 12 vendors', icon: 'Shield' },
      { time: '32 min ago', text: 'Closed 5 CAPA investigations with verified effectiveness', icon: 'Activity' },
      { time: '1 hour ago', text: 'Presented quality dashboard to executive team', icon: 'ChartBarBig' },
    ],
    metrics: [
      { label: 'First Pass Yield', value: '98.4%', change: '+1.2%', trend: 'up' },
      { label: 'Defect Rate', value: '0.16%', change: '-0.04%', trend: 'up' },
      { label: 'Audit Score', value: '96.2', change: '+2.1', trend: 'up' },
      { label: 'CAPA Closure', value: '94.8%', change: '+3.2%', trend: 'up' },
    ],
    quickActions: [
      { label: 'Quality Dashboard', icon: 'ChartBarBig' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'Audit Schedule', icon: 'Calendar' },
      { label: 'CAPA Review', icon: 'Shield' },
    ],
    stats: [
      { label: 'Tasks', value: '3,547', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.2s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '97.0%', icon: 'Target', color: '#5C6BC0' }
    ],
  },
  {
    file: 'production-manager.tsx',
    componentName: 'ProductionManagerPage',
    title: 'AI Production Manager',
    subtitle: 'Production Operations & Shift Management',
    icon: 'Factory',
    iconColor: '#BF360C',
    level: 'Manager',
    subAgents: [
      { id: 'shift-coordinator', name: 'AI Shift Coordinator', icon: 'Clock', desc: 'Shift scheduling, handoff management, and cross-shift coordination' },
      { id: 'production-scheduler', name: 'AI Production Scheduler', icon: 'Calendar', desc: 'Production scheduling, sequencing, and order prioritization' },
      { id: 'output-tracker', name: 'AI Output Tracker', icon: 'ChartBarBig', desc: 'Real-time production output tracking and variance analysis' },
    ],
    capabilities: ['Production Planning', 'Scheduling', 'Quality Control', 'Team Management', 'KPI Tracking', 'Safety', 'Shift Management', 'Output Monitoring', 'Capacity Planning', 'Order Sequencing', 'Variance Analysis', 'OEE Optimization'],
    responsibilities: [
      'Production planning and scheduling across all manufacturing lines',
      'Quality control oversight and in-process inspection coordination',
      'Production team management and shift scheduling optimization',
      'KPI tracking, performance improvement, and variance analysis',
      'Safety compliance enforcement and incident prevention',
      'Production reporting, analytics, and executive communication',
      'Shift coordination and cross-shift handoff management',
      'OEE optimization and production efficiency improvement programs'
    ],
    activities: [
      { time: '3 min ago', text: 'Managed 3 production lines achieving 98.5% OEE', icon: 'CircleCheckBig' },
      { time: '8 min ago', text: 'Coordinated shift handoff for night crew', icon: 'Clock' },
      { time: '15 min ago', text: 'Reduced scrap rate by 15% on line A', icon: 'Zap' },
      { time: '30 min ago', text: 'Updated production schedule for 12 new orders', icon: 'Calendar' },
      { time: '1 hour ago', text: 'Reviewed output variance report for all lines', icon: 'ChartBarBig' },
    ],
    metrics: [
      { label: 'OEE Score', value: '98.5%', change: '+2.1%', trend: 'up' },
      { label: 'On-Time Delivery', value: '99.2%', change: '+0.8%', trend: 'up' },
      { label: 'Scrap Rate', value: '0.8%', change: '-0.3%', trend: 'up' },
      { label: 'Shift Efficiency', value: '96.4%', change: '+1.5%', trend: 'up' },
    ],
    quickActions: [
      { label: 'Production Board', icon: 'ChartBarBig' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'Shift Schedule', icon: 'Calendar' },
      { label: 'Output Report', icon: 'FileText' },
    ],
    stats: [
      { label: 'Tasks', value: '1,590', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.5s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '97.6%', icon: 'Target', color: '#BF360C' }
    ],
  },
  {
    file: 'quality-manager.tsx',
    componentName: 'QualityManagerPage',
    title: 'AI Quality Manager',
    subtitle: 'Quality Management Systems & Compliance',
    icon: 'CircleCheckBig',
    iconColor: '#BF360C',
    level: 'Manager',
    subAgents: [
      { id: 'inspection-planner', name: 'AI Inspection Planner', icon: 'Search', desc: 'Inspection planning, sampling strategy, and test scheduling' },
      { id: 'defect-categorizer', name: 'AI Defect Categorizer', icon: 'AlertTriangle', desc: 'Defect classification, root cause categorization, and trend analysis' },
      { id: 'supplier-quality-auditor', name: 'AI Supplier Quality Auditor', icon: 'Users', desc: 'Supplier quality auditing, scoring, and qualification management' },
    ],
    capabilities: ['QMS', 'Audit Management', 'CAPA', 'Supplier Quality', 'Continuous Improvement', 'Regulatory Compliance', 'Inspection Planning', 'Defect Analysis', 'SPC', 'FMEA', 'Root Cause Analysis', 'Quality Costing'],
    responsibilities: [
      'Quality management system oversight and continuous improvement',
      'Internal and external audit management and coordination',
      'Corrective and preventive action program leadership',
      'Supplier quality management and vendor qualification',
      'Continuous improvement initiatives and Kaizen programs',
      'Regulatory compliance management across all standards',
      'Inspection planning and sampling strategy development',
      'Defect categorization, root cause analysis, and trend monitoring'
    ],
    activities: [
      { time: '3 min ago', text: 'Led ISO 9001 surveillance audit across 3 facilities', icon: 'CircleCheckBig' },
      { time: '8 min ago', text: 'Closed 5 CAPA investigations with verified effectiveness', icon: 'Shield' },
      { time: '15 min ago', text: 'Improved supplier quality score by 8 points', icon: 'Users' },
      { time: '30 min ago', text: 'Categorized 12 new defects in production line C', icon: 'AlertTriangle' },
      { time: '1 hour ago', text: 'Updated inspection plan for incoming materials', icon: 'Search' },
    ],
    metrics: [
      { label: 'Defect Rate', value: '0.12%', change: '-0.03%', trend: 'up' },
      { label: 'CAPA Closure', value: '96.2%', change: '+2.4%', trend: 'up' },
      { label: 'Supplier Score', value: '92.8', change: '+4.1', trend: 'up' },
      { label: 'Audit Pass', value: '100%', change: '+0%', trend: 'up' },
    ],
    quickActions: [
      { label: 'Quality Dashboard', icon: 'ChartBarBig' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'CAPA Tracker', icon: 'Shield' },
      { label: 'Audit Schedule', icon: 'Calendar' },
    ],
    stats: [
      { label: 'Tasks', value: '567', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '1.9s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '98.1%', icon: 'Target', color: '#BF360C' }
    ],
  },
  {
    file: 'safety-manager.tsx',
    componentName: 'SafetyManagerPage',
    title: 'AI Safety Manager',
    subtitle: 'Workplace Safety & Compliance Management',
    icon: 'Shield',
    iconColor: '#BF360C',
    level: 'Manager',
    subAgents: [
      { id: 'hazard-identifier', name: 'AI Hazard Identifier', icon: 'AlertTriangle', desc: 'Workplace hazard identification, risk assessment, and mitigation planning' },
      { id: 'safety-trainer', name: 'AI Safety Trainer', icon: 'BookOpen', desc: 'Safety training program development, delivery, and compliance tracking' },
      { id: 'incident-investigator', name: 'AI Incident Investigator', icon: 'Search', desc: 'Incident investigation, root cause analysis, and corrective action development' },
    ],
    capabilities: ['Safety Programs', 'Compliance', 'Training', 'Incident Mgmt', 'Culture Development', 'Reporting', 'Hazard Assessment', 'Risk Analysis', 'OSHA Compliance', 'Emergency Response', 'Ergonomics', 'Industrial Hygiene'],
    responsibilities: [
      'Safety program development, implementation, and continuous improvement',
      'Regulatory compliance oversight including OSHA and EPA standards',
      'Safety training program management and competency verification',
      'Incident management, investigation, and root cause analysis',
      'Safety culture development initiatives and behavioral programs',
      'Safety metrics development, reporting, and trend analysis',
      'Hazard identification and risk assessment across all facilities',
      'Emergency response planning and drill coordination'
    ],
    activities: [
      { time: '3 min ago', text: 'Reduced incident rate by 25% through new protocols', icon: 'CircleCheckBig' },
      { time: '8 min ago', text: 'Managed safety training for 200 employees', icon: 'BookOpen' },
      { time: '15 min ago', text: 'Published monthly safety report to leadership', icon: 'FileText' },
      { time: '30 min ago', text: 'Identified 3 new hazards in assembly area', icon: 'AlertTriangle' },
      { time: '1 hour ago', text: 'Completed incident investigation for near-miss', icon: 'Search' },
    ],
    metrics: [
      { label: 'TRIR', value: '0.42', change: '-0.18', trend: 'up' },
      { label: 'Near Misses', value: '12', change: '+4', trend: 'up' },
      { label: 'Training', value: '98.6%', change: '+1.2%', trend: 'up' },
      { label: 'Days Safe', value: '247', change: '+30', trend: 'up' },
    ],
    quickActions: [
      { label: 'Safety Dashboard', icon: 'ChartBarBig' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'Hazard Report', icon: 'AlertTriangle' },
      { label: 'Training Log', icon: 'BookOpen' },
    ],
    stats: [
      { label: 'Tasks', value: '3,022', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.8s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '99.2%', icon: 'Target', color: '#BF360C' }
    ],
  },
  {
    file: 'production-planner.tsx',
    componentName: 'ProductionPlannerPage',
    title: 'AI Production Planner',
    subtitle: 'Production Planning & Material Requirements',
    icon: 'ClipboardList',
    iconColor: '#BF360C',
    level: 'Specialist',
    subAgents: [
      { id: 'material-requirements-planner', name: 'AI Material Requirements Planner', icon: 'Package', desc: 'MRP execution, bill of materials management, and material allocation' },
      { id: 'capacity-loader', name: 'AI Capacity Loader', icon: 'Gauge', desc: 'Capacity loading, resource leveling, and constraint management' },
      { id: 'order-sequencer', name: 'AI Order Sequencer', icon: 'ListFilter', desc: 'Production order sequencing, priority management, and scheduling optimization' },
    ],
    capabilities: ['Production Planning', 'MRP', 'Capacity Planning', 'Scheduling', 'Material Management', 'Order Sequencing', 'BOM Management', 'Resource Leveling', 'Demand Planning', 'Inventory Planning', 'Lead Time Analysis', 'Constraint Management'],
    responsibilities: [
      'Production planning and scheduling across all manufacturing orders',
      'Material requirements planning and procurement coordination',
      'Capacity planning, resource leveling, and constraint management',
      'Production order sequencing and priority management',
      'Bill of materials management and engineering change coordination',
      'Demand planning integration and forecast alignment',
      'Inventory planning and safety stock optimization',
      'Lead time analysis and supplier delivery performance tracking'
    ],
    activities: [
      { time: '3 min ago', text: 'Released 24 production orders for next week', icon: 'CircleCheckBig' },
      { time: '8 min ago', text: 'Updated MRP for 3 new product configurations', icon: 'ClipboardList' },
      { time: '15 min ago', text: 'Leveled capacity across 5 work centers', icon: 'Gauge' },
      { time: '30 min ago', text: 'Sequenced priority orders for customer A', icon: 'ListFilter' },
      { time: '1 hour ago', text: 'Coordinated material delivery with 8 suppliers', icon: 'Truck' },
    ],
    metrics: [
      { label: 'Plan Accuracy', value: '97.8%', change: '+1.4%', trend: 'up' },
      { label: 'On-Time Start', value: '96.2%', change: '+2.1%', trend: 'up' },
      { label: 'Material Ready', value: '99.1%', change: '+0.5%', trend: 'up' },
      { label: 'Schedule Adherence', value: '95.4%', change: '+1.8%', trend: 'up' },
    ],
    quickActions: [
      { label: 'Planning Board', icon: 'ChartBarBig' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'MRP Status', icon: 'ClipboardList' },
      { label: 'Capacity View', icon: 'Gauge' },
    ],
    stats: [
      { label: 'Tasks', value: '2,847', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.4s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '97.8%', icon: 'Target', color: '#BF360C' }
    ],
  },
  {
    file: 'quality-inspector.tsx',
    componentName: 'QualityInspectorPage',
    title: 'AI Quality Inspector',
    subtitle: 'Quality Inspection & Measurement Analysis',
    icon: 'Search',
    iconColor: '#BF360C',
    level: 'Specialist',
    subAgents: [
      { id: 'measurement-analyst', name: 'AI Measurement Analyst', icon: 'Ruler', desc: 'Measurement data analysis, GRR studies, and measurement system evaluation' },
      { id: 'specification-checker', name: 'AI Specification Checker', icon: 'FileCheck', desc: 'Specification compliance verification and tolerance analysis' },
      { id: 'non-conformance-reporter', name: 'AI Non-conformance Reporter', icon: 'AlertTriangle', desc: 'Non-conformance reporting, disposition, and corrective action initiation' },
    ],
    capabilities: ['Inspection', 'Measurement', 'Specification Compliance', 'Non-conformance', 'Sampling Plans', 'SPC', 'GRR Studies', 'Tolerance Analysis', 'Visual Inspection', 'Dimensional Analysis', 'Material Testing', 'Calibration'],
    responsibilities: [
      'Quality inspection execution and in-process monitoring',
      'Measurement data analysis and measurement system evaluation',
      'Specification compliance verification and tolerance analysis',
      'Non-conformance reporting, disposition, and escalation',
      'Sampling plan development and statistical process control',
      'GRR studies and measurement system analysis',
      'Visual, dimensional, and material testing coordination',
      'Calibration management and measurement equipment oversight'
    ],
    activities: [
      { time: '3 min ago', text: 'Completed incoming inspection for 50 components', icon: 'CircleCheckBig' },
      { time: '8 min ago', text: 'Analyzed GRR study results for new gauge', icon: 'Search' },
      { time: '15 min ago', text: 'Flagged 3 non-conformances in batch #4421', icon: 'AlertTriangle' },
      { time: '30 min ago', text: 'Verified specification compliance for 12 parts', icon: 'FileCheck' },
      { time: '1 hour ago', text: 'Updated SPC charts for critical dimensions', icon: 'ChartBarBig' },
    ],
    metrics: [
      { label: 'Inspections', value: '1,247', change: '+84', trend: 'up' },
      { label: 'Pass Rate', value: '99.4%', change: '+0.2%', trend: 'up' },
      { label: 'NCRs Filed', value: '8', change: '-3', trend: 'up' },
      { label: 'GRR Score', value: '12.4%', change: '-2.1%', trend: 'up' },
    ],
    quickActions: [
      { label: 'Inspection Queue', icon: 'Search' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'NCR Log', icon: 'AlertTriangle' },
      { label: 'SPC Charts', icon: 'ChartBarBig' },
    ],
    stats: [
      { label: 'Tasks', value: '1,247', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.3s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '99.4%', icon: 'Target', color: '#BF360C' }
    ],
  },
  {
    file: 'supply-chain-coordinator.tsx',
    componentName: 'SupplyChainCoordinatorPage',
    title: 'AI Supply Chain Coordinator',
    subtitle: 'Supply Chain Scheduling & Delivery Management',
    icon: 'Link',
    iconColor: '#BF360C',
    level: 'Specialist',
    subAgents: [
      { id: 'supplier-scheduler', name: 'AI Supplier Scheduler', icon: 'Calendar', desc: 'Supplier delivery scheduling, coordination, and performance tracking' },
      { id: 'delivery-tracker', name: 'AI Delivery Tracker', icon: 'Truck', desc: 'Delivery tracking, ETA management, and exception handling' },
      { id: 'inventory-buffer-manager', name: 'AI Inventory Buffer Manager', icon: 'Database', desc: 'Safety stock management, buffer sizing, and replenishment optimization' },
    ],
    capabilities: ['Supply Chain Coordination', 'Supplier Scheduling', 'Delivery Tracking', 'Inventory Buffers', 'Demand Alignment', 'Logistics', 'Vendor Management', 'Replenishment', 'Safety Stock', 'Lead Time Mgmt', 'Exception Handling', 'Performance Tracking'],
    responsibilities: [
      'Supply chain coordination and supplier relationship management',
      'Supplier delivery scheduling and performance tracking',
      'Delivery tracking, ETA management, and exception handling',
      'Inventory buffer management and safety stock optimization',
      'Demand alignment and production-supply synchronization',
      'Vendor management and supplier scorecard maintenance',
      'Replenishment planning and automatic reorder management',
      'Lead time management and supplier risk mitigation'
    ],
    activities: [
      { time: '3 min ago', text: 'Coordinated delivery schedule with 6 suppliers', icon: 'Calendar' },
      { time: '8 min ago', text: 'Tracked 24 shipments arriving today', icon: 'Truck' },
      { time: '15 min ago', text: 'Adjusted safety stock for 15 critical items', icon: 'Database' },
      { time: '30 min ago', text: 'Resolved delivery exception for priority order', icon: 'AlertTriangle' },
      { time: '1 hour ago', text: 'Updated supplier scorecards for Q2 review', icon: 'ChartBarBig' },
    ],
    metrics: [
      { label: 'On-Time Delivery', value: '97.8%', change: '+1.2%', trend: 'up' },
      { label: 'Supplier Score', value: '94.2', change: '+2.4', trend: 'up' },
      { label: 'Stock Outs', value: '0', change: '-2', trend: 'up' },
      { label: 'Lead Time', value: '4.2 days', change: '-0.8', trend: 'up' },
    ],
    quickActions: [
      { label: 'Supply Dashboard', icon: 'ChartBarBig' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'Delivery Track', icon: 'Truck' },
      { label: 'Buffer Status', icon: 'Database' },
    ],
    stats: [
      { label: 'Tasks', value: '2,156', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.6s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '98.4%', icon: 'Target', color: '#BF360C' }
    ],
  },
  {
    file: 'maintenance-technician.tsx',
    componentName: 'MaintenanceTechnicianPage',
    title: 'AI Maintenance Technician',
    subtitle: 'Equipment Maintenance & Reliability Engineering',
    icon: 'Wrench',
    iconColor: '#BF360C',
    level: 'Specialist',
    subAgents: [
      { id: 'predictive-maintenance-monitor', name: 'AI Predictive Maintenance Monitor', icon: 'Activity', desc: 'Predictive maintenance monitoring using vibration, thermal, and oil analysis' },
      { id: 'repair-scheduler', name: 'AI Repair Scheduler', icon: 'Calendar', desc: 'Repair scheduling, resource allocation, and downtime minimization' },
      { id: 'spare-parts-manager', name: 'AI Spare Parts Manager', icon: 'Package', desc: 'Spare parts inventory management, procurement, and cataloging' },
    ],
    capabilities: ['Preventive Maintenance', 'Predictive Maintenance', 'Repair Scheduling', 'Spare Parts', 'Reliability Engineering', 'CMMS', 'Vibration Analysis', 'Thermal Imaging', 'Root Cause Analysis', 'Equipment History', 'Calibration', 'Safety Compliance'],
    responsibilities: [
      'Preventive maintenance program execution and optimization',
      'Predictive maintenance monitoring and early warning detection',
      'Repair scheduling, resource allocation, and downtime minimization',
      'Spare parts inventory management and procurement coordination',
      'Reliability engineering and equipment lifecycle management',
      'CMMS administration and maintenance data management',
      'Vibration analysis, thermal imaging, and condition monitoring',
      'Equipment history tracking and failure pattern analysis'
    ],
    activities: [
      { time: '3 min ago', text: 'Completed PM on 4 critical production machines', icon: 'CircleCheckBig' },
      { time: '8 min ago', text: 'Detected bearing wear on press #7 via vibration', icon: 'Activity' },
      { time: '15 min ago', text: 'Scheduled emergency repair for conveyor motor', icon: 'Calendar' },
      { time: '30 min ago', text: 'Replenished spare parts for hydraulic systems', icon: 'Package' },
      { time: '1 hour ago', text: 'Updated equipment reliability database', icon: 'Wrench' },
    ],
    metrics: [
      { label: 'MTBF', value: '842 hrs', change: '+56', trend: 'up' },
      { label: 'MTTR', value: '2.1 hrs', change: '-0.4', trend: 'up' },
      { label: 'PM Compliance', value: '99.2%', change: '+1.1%', trend: 'up' },
      { label: 'Spare Fill Rate', value: '97.8%', change: '+0.6%', trend: 'up' },
    ],
    quickActions: [
      { label: 'Maintenance Board', icon: 'ChartBarBig' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'PM Schedule', icon: 'Calendar' },
      { label: 'Spare Parts', icon: 'Package' },
    ],
    stats: [
      { label: 'Tasks', value: '1,892', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.7s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '98.8%', icon: 'Target', color: '#BF360C' }
    ],
  },
  {
    file: 'inventory-controller.tsx',
    componentName: 'InventoryControllerPage',
    title: 'AI Inventory Controller',
    subtitle: 'Inventory Management & Stock Optimization',
    icon: 'Database',
    iconColor: '#BF360C',
    level: 'Specialist',
    subAgents: [
      { id: 'stock-level-monitor', name: 'AI Stock Level Monitor', icon: 'BarChart3', desc: 'Real-time stock level monitoring, alerts, and replenishment triggers' },
      { id: 'reorder-point-calculator', name: 'AI Reorder Point Calculator', icon: 'Calculator', desc: 'Reorder point calculation, EOQ optimization, and lead time analysis' },
      { id: 'cycle-count-coordinator', name: 'AI Cycle Count Coordinator', icon: 'ClipboardCheck', desc: 'Cycle count scheduling, execution coordination, and variance analysis' },
    ],
    capabilities: ['Inventory Control', 'Stock Monitoring', 'Reorder Points', 'EOQ', 'Cycle Counting', 'ABC Analysis', 'Safety Stock', 'Warehouse Mgmt', 'FIFO/LIFO', 'Shrinkage Control', 'Demand Forecasting', 'Inventory Turns'],
    responsibilities: [
      'Inventory control and stock level management across all warehouses',
      'Real-time stock level monitoring and automated alert management',
      'Reorder point calculation and economic order quantity optimization',
      'Cycle count scheduling, coordination, and variance analysis',
      'ABC analysis and inventory classification management',
      'Safety stock optimization and service level management',
      'Warehouse management and storage optimization',
      'Inventory accuracy improvement and shrinkage control'
    ],
    activities: [
      { time: '3 min ago', text: 'Monitored stock levels for 2,400 SKUs', icon: 'BarChart3' },
      { time: '8 min ago', text: 'Calculated reorder points for 85 critical items', icon: 'Calculator' },
      { time: '15 min ago', text: 'Coordinated cycle count for warehouse B', icon: 'ClipboardCheck' },
      { time: '30 min ago', text: 'Updated ABC classification for Q3', icon: 'Database' },
      { time: '1 hour ago', text: 'Resolved 4 stock discrepancies in receiving', icon: 'AlertTriangle' },
    ],
    metrics: [
      { label: 'Inventory Accuracy', value: '99.4%', change: '+0.3%', trend: 'up' },
      { label: 'Turns/Year', value: '12.8', change: '+1.2', trend: 'up' },
      { label: 'Stock Outs', value: '2', change: '-4', trend: 'up' },
      { label: 'Carrying Cost', value: '$1.2M', change: '-8%', trend: 'up' },
    ],
    quickActions: [
      { label: 'Inventory Dashboard', icon: 'ChartBarBig' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'Cycle Count', icon: 'ClipboardCheck' },
      { label: 'Reorder Alert', icon: 'AlertTriangle' },
    ],
    stats: [
      { label: 'Tasks', value: '1,567', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.5s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '99.4%', icon: 'Target', color: '#BF360C' }
    ],
  },
  {
    file: 'lean-specialist.tsx',
    componentName: 'LeanSpecialistPage',
    title: 'AI Lean Specialist',
    subtitle: 'Lean Manufacturing & Continuous Improvement',
    icon: 'Zap',
    iconColor: '#BF360C',
    level: 'Specialist',
    subAgents: [
      { id: 'waste-identifier', name: 'AI Waste Identifier', icon: 'Trash2', desc: 'Waste identification across 8 categories and elimination strategy development' },
      { id: 'value-stream-mapper', name: 'AI Value Stream Mapper', icon: 'GitBranch', desc: 'Value stream mapping, process flow analysis, and improvement opportunity identification' },
      { id: 'kaizen-facilitator', name: 'AI Kaizen Facilitator', icon: 'Sparkles', desc: 'Kaizen event planning, facilitation, and results tracking' },
    ],
    capabilities: ['Lean Manufacturing', 'Waste Elimination', 'Value Stream Mapping', 'Kaizen', '5S', 'Kanban', 'Poka-Yoke', 'SMED', 'TPM', 'Standard Work', 'A3 Problem Solving', 'Gemba Walks'],
    responsibilities: [
      'Lean manufacturing program development and deployment',
      'Waste identification across 8 lean waste categories',
      'Value stream mapping and process flow optimization',
      'Kaizen event planning, facilitation, and results tracking',
      '5S program implementation and sustainability auditing',
      'Kanban system design and pull production implementation',
      'Poka-yoke (error-proofing) design and SMED implementation',
      'Standard work development and continuous improvement coaching'
    ],
    activities: [
      { time: '3 min ago', text: 'Identified 7 wastes in assembly process', icon: 'AlertTriangle' },
      { time: '8 min ago', text: 'Completed value stream map for product line C', icon: 'GitBranch' },
      { time: '15 min ago', text: 'Facilitated Kaizen event reducing changeover 40%', icon: 'Zap' },
      { time: '30 min ago', text: 'Audited 5S compliance in packaging area', icon: 'CircleCheckBig' },
      { time: '1 hour ago', text: 'Designed Kanban system for sub-assembly cell', icon: 'LayoutGrid' },
    ],
    metrics: [
      { label: 'Waste Reduced', value: '$840K', change: '+18%', trend: 'up' },
      { label: 'Kaizen Events', value: '24', change: '+6', trend: 'up' },
      { label: 'Cycle Time', value: '-32%', change: '-4%', trend: 'up' },
      { label: '5S Score', value: '94.2', change: '+3.8', trend: 'up' },
    ],
    quickActions: [
      { label: 'Lean Dashboard', icon: 'ChartBarBig' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'VSM Library', icon: 'GitBranch' },
      { label: 'Kaizen Board', icon: 'Zap' },
    ],
    stats: [
      { label: 'Tasks', value: '1,234', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.4s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '98.2%', icon: 'Target', color: '#BF360C' }
    ],
  },
  {
    file: 'safety-inspector.tsx',
    componentName: 'SafetyInspectorPage',
    title: 'AI Safety Inspector',
    subtitle: 'Safety Compliance & Risk Assessment',
    icon: 'ShieldAlert',
    iconColor: '#BF360C',
    level: 'Specialist',
    subAgents: [
      { id: 'compliance-auditor', name: 'AI Compliance Auditor', icon: 'ClipboardCheck', desc: 'Safety compliance auditing against OSHA, EPA, and company standards' },
      { id: 'risk-assessor', name: 'AI Risk Assessor', icon: 'Gauge', desc: 'Risk assessment, hazard ranking, and mitigation priority development' },
      { id: 'corrective-action-tracker', name: 'AI Corrective Action Tracker', icon: 'CheckCircle', desc: 'Safety corrective action tracking, verification, and effectiveness monitoring' },
    ],
    capabilities: ['Safety Inspection', 'Compliance Auditing', 'Risk Assessment', 'Corrective Actions', 'OSHA Standards', 'EPA Compliance', 'Hazard Ranking', 'PPE Verification', 'Fire Safety', 'Electrical Safety', 'Machine Guarding', 'Chemical Safety'],
    responsibilities: [
      'Safety inspection execution and compliance verification',
      'Compliance auditing against OSHA, EPA, and company standards',
      'Risk assessment, hazard ranking, and mitigation planning',
      'Safety corrective action tracking and effectiveness verification',
      'PPE compliance verification and equipment safety checks',
      'Fire safety, electrical safety, and machine guarding inspections',
      'Chemical safety and hazardous material handling compliance',
      'Safety inspection reporting and regulatory documentation'
    ],
    activities: [
      { time: '3 min ago', text: 'Completed safety inspection of assembly floor', icon: 'ShieldAlert' },
      { time: '8 min ago', text: 'Audited OSHA compliance for 12 work stations', icon: 'ClipboardCheck' },
      { time: '15 min ago', text: 'Assessed risk for new chemical storage area', icon: 'Gauge' },
      { time: '30 min ago', text: 'Verified 8 corrective actions from last inspection', icon: 'CheckCircle' },
      { time: '1 hour ago', text: 'Inspected machine guarding on 6 presses', icon: 'AlertTriangle' },
    ],
    metrics: [
      { label: 'Compliance Rate', value: '99.1%', change: '+0.8%', trend: 'up' },
      { label: 'Hazards Found', value: '4', change: '-6', trend: 'up' },
      { label: 'CA Closure', value: '97.4%', change: '+2.1%', trend: 'up' },
      { label: 'Inspections', value: '847', change: '+42', trend: 'up' },
    ],
    quickActions: [
      { label: 'Inspection Queue', icon: 'ShieldAlert' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'Risk Register', icon: 'Gauge' },
      { label: 'CA Tracker', icon: 'CheckCircle' },
    ],
    stats: [
      { label: 'Tasks', value: '847', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.3s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '99.1%', icon: 'Target', color: '#BF360C' }
    ],
  },
  {
    file: 'logistics-coordinator.tsx',
    componentName: 'LogisticsCoordinatorPage',
    title: 'AI Logistics Coordinator',
    subtitle: 'Logistics Planning & Delivery Optimization',
    icon: 'Truck',
    iconColor: '#BF360C',
    level: 'Specialist',
    subAgents: [
      { id: 'shipment-planner', name: 'AI Shipment Planner', icon: 'Package', desc: 'Shipment planning, load optimization, and carrier selection coordination' },
      { id: 'carrier-selector', name: 'AI Carrier Selector', icon: 'Globe', desc: 'Carrier evaluation, selection, and performance management' },
      { id: 'delivery-optimizer', name: 'AI Delivery Optimizer', icon: 'MapPin', desc: 'Route optimization, delivery scheduling, and cost minimization' },
    ],
    capabilities: ['Logistics Planning', 'Shipment Planning', 'Carrier Selection', 'Route Optimization', 'Freight Mgmt', 'Warehousing', 'Load Optimization', 'Delivery Tracking', 'Cost Analysis', 'Cross-docking', 'Last Mile', 'Reverse Logistics'],
    responsibilities: [
      'Logistics planning and coordination across all distribution channels',
      'Shipment planning, load optimization, and carrier coordination',
      'Carrier evaluation, selection, and performance management',
      'Route optimization and delivery scheduling for cost minimization',
      'Freight management and transportation cost analysis',
      'Warehouse coordination and cross-docking operations',
      'Delivery tracking and customer fulfillment management',
      'Reverse logistics and returns processing coordination'
    ],
    activities: [
      { time: '3 min ago', text: 'Planned 18 shipments for next-day delivery', icon: 'Package' },
      { time: '8 min ago', text: 'Selected optimal carriers for 6 routes', icon: 'Globe' },
      { time: '15 min ago', text: 'Optimized delivery routes saving 12% fuel', icon: 'MapPin' },
      { time: '30 min ago', text: 'Coordinated cross-dock for priority order', icon: 'Truck' },
      { time: '1 hour ago', text: 'Analyzed freight costs for Q3 budget', icon: 'DollarSign' },
    ],
    metrics: [
      { label: 'On-Time Delivery', value: '98.6%', change: '+1.4%', trend: 'up' },
      { label: 'Freight Cost', value: '-8%', change: '-2%', trend: 'up' },
      { label: 'Route Efficiency', value: '94.2%', change: '+3.1%', trend: 'up' },
      { label: 'Damage Rate', value: '0.04%', change: '-0.02%', trend: 'up' },
    ],
    quickActions: [
      { label: 'Logistics Dashboard', icon: 'ChartBarBig' },
      { label: 'Team Chat', icon: 'MessageSquare' },
      { label: 'Shipment Plan', icon: 'Package' },
      { label: 'Route Map', icon: 'MapPin' },
    ],
    stats: [
      { label: 'Tasks', value: '1,892', icon: 'CircleCheckBig', color: '#34C759' },
      { label: 'Uptime', value: '99.9%', icon: 'Activity', color: '#007AFF' },
      { label: 'Response', value: '0.5s', icon: 'Clock', color: '#FF9500' },
      { label: 'Accuracy', value: '98.6%', icon: 'Target', color: '#BF360C' }
    ],
  },
];

function generatePage(agent) {
  const subAgentImports = new Set();
  agent.subAgents.forEach(sa => subAgentImports.add(sa.icon));
  agent.activities.forEach(a => subAgentImports.add(a.icon));
  agent.quickActions.forEach(qa => subAgentImports.add(qa.icon));

  const allIcons = new Set([agent.icon, 'Activity', 'Star', 'CircleCheckBig', 'Clock', 'Target', 'ArrowRight', 'Zap', 'Users', 'MessageSquare', 'ChartBarBig', 'TrendingUp', 'AlertTriangle', 'FileText', 'ChevronRight', 'Factory']);
  subAgentImports.forEach(i => allIcons.add(i));

  const iconList = Array.from(allIcons).sort().join(', ');

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  ${iconList}
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
${agent.subAgents.map(sa => `  { id: '${sa.id}', name: '${sa.name}', icon: ${sa.icon}, desc: '${sa.desc}' },`).join('\n')}
];

const QUICK_ACTIONS = [
${agent.quickActions.map(qa => `  { label: '${qa.label}', icon: ${qa.icon} },`).join('\n')}
];

const METRICS = [
${agent.metrics.map(m => `  { label: '${m.label}', value: '${m.value}', change: '${m.change}', trend: '${m.trend}' },`).join('\n')}
];

export default function ${agent.componentName}() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
${agent.stats.map(s => `    { label: '${s.label}', value: '${s.value}', icon: ${s.icon}, color: '${s.color}' },`).join('\n')}
  ];

  const capabilities = [
${agent.capabilities.map(c => `    '${c}',`).join('\n')}
  ];

  const responsibilities = [
${agent.responsibilities.map(r => `    '${r}',`).join('\n')}
  ];

  const activities = [
${agent.activities.map(a => `    { time: '${a.time}', text: '${a.text}', icon: ${a.icon} },`).join('\n')}
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${agent.iconColor}20' }]}>
          <${agent.icon} size={48} color="${agent.iconColor}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${agent.title}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>${agent.subtitle}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '${agent.iconColor}22' }]}>
            <Star size={12} color="${agent.iconColor}" />
            <Text style={[styles.badgeText, { color: '${agent.iconColor}' }]}>${agent.level}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#5C6BC022' }]}>
            <Factory size={12} color="#5C6BC0" />
            <Text style={[styles.badgeText, { color: '#5C6BC0' }]}>Manufacturing</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The ${agent.title} provides specialized capabilities within the Manufacturing division. It coordinates with sub-agents for ${agent.subAgents.map(sa => sa.name.replace('AI ', '').toLowerCase()).join(', ')}, ensuring operational excellence and continuous improvement across all manufacturing operations.
        </Text>
      </View>

      {/* Capabilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '${agent.iconColor}18' }]}>
              <Text style={[styles.tagText, { color: '${agent.iconColor}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="${agent.iconColor}" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Sub-Agents */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Specialized sub-agents executing ${agent.title.replace('AI ', '').toLowerCase()} functions.
        </Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            onPress={() => router.push(\`/ai-agent/manufacturing/sub-agents/\${agent.id}\`)}
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

      {/* Performance Metrics */}
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

      {/* Recent Activity */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '${agent.iconColor}15' }]}>
              <act.icon size={14} color="${agent.iconColor}" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '${agent.iconColor}12' }]}>
              <action.icon size={24} color="${agent.iconColor}" />
              <Text style={[styles.actionText, { color: '${agent.iconColor}' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="${agent.file.replace('.tsx', '')}" agentName="${agent.title}" />
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

let count = 0;
for (const agent of agents) {
  const filePath = path.join(baseDir, agent.file);
  const content = generatePage(agent);
  fs.writeFileSync(filePath, content, 'utf8');
  count++;
  console.log(`Upgraded: ${agent.file}`);
}
console.log(`\nDone! Upgraded ${count} manufacturing agent pages.`);

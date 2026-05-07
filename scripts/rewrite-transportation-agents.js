const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'app', 'ai-agent', 'transportation');

const agents = [
  {
    file: 'fleet-manager.tsx',
    name: 'AI Fleet Manager',
    subtitle: 'Fleet Operations & Vehicle Management',
    icon: 'Truck',
    badge: 'Manager',
    agentId: 'fleet-manager',
    subAgents: [
      { id: 'vehicle-scheduler', name: 'AI Vehicle Scheduler', icon: 'Calendar', desc: 'Vehicle scheduling and assignment optimization' },
      { id: 'fuel-efficiency-monitor', name: 'AI Fuel Efficiency Monitor', icon: 'Gauge', desc: 'Fuel consumption tracking and efficiency optimization' },
      { id: 'maintenance-planner', name: 'AI Maintenance Planner', icon: 'Wrench', desc: 'Preventive maintenance scheduling and lifecycle planning' },
    ],
    capabilities: ['Fleet Management', 'Vehicle Scheduling', 'Fuel Management', 'Maintenance Planning', 'Vehicle Tracking', 'Driver Assignment', 'Lifecycle Management', 'Telematics', 'GPS Monitoring', 'Insurance Management', 'Depreciation Tracking', 'Compliance', 'Vehicle Procurement', 'Disposal Planning', 'Safety Programs', 'Cost Control'],
    responsibilities: ['Fleet vehicle scheduling and assignment optimization', 'Fuel consumption monitoring and efficiency improvement', 'Preventive maintenance scheduling and lifecycle management', 'Vehicle tracking and telematics system management', 'Driver assignment and vehicle allocation coordination', 'Vehicle procurement and disposal planning', 'Fleet insurance and compliance management', 'Depreciation tracking and cost control', 'Safety program implementation and monitoring'],
    metrics: [
      { label: 'Vehicle Availability', value: '96.3%', change: '+2.1%' },
      { label: 'Fuel Efficiency', value: '8.2 mpg', change: '+12%' },
      { label: 'Maintenance SLA', value: '99.4%', change: '+0.8%' },
      { label: 'Fleet Size', value: '2,847', change: '+142' },
    ],
    activities: [
      { time: '5 min ago', text: 'Scheduled 34 vehicles for preventive maintenance', icon: 'Wrench' },
      { time: '20 min ago', text: 'Identified fuel efficiency improvement for Midwest fleet', icon: 'Gauge' },
      { time: '45 min ago', text: 'Updated vehicle assignment matrix for Q3', icon: 'Truck' },
      { time: '2 hr ago', text: 'Processed 12 vehicle disposal requests', icon: 'FileText' },
      { time: '4 hr ago', text: 'Reviewed telematics alerts for 8 vehicles', icon: 'AlertTriangle' },
    ],
  },
  {
    file: 'warehouse-manager.tsx',
    name: 'AI Warehouse Manager',
    subtitle: 'Warehouse Operations & Storage Optimization',
    icon: 'Package',
    badge: 'Manager',
    agentId: 'warehouse-manager',
    subAgents: [
      { id: 'slot-optimizer', name: 'AI Slot Optimizer', icon: 'LayoutGrid', desc: 'Warehouse slot optimization and space utilization' },
      { id: 'pick-path-planner', name: 'AI Pick Path Planner', icon: 'Route', desc: 'Pick path optimization and travel time reduction' },
      { id: 'labor-scheduler', name: 'AI Labor Scheduler', icon: 'Users', desc: 'Warehouse labor scheduling and workforce planning' },
    ],
    capabilities: ['Warehouse Management', 'Slot Optimization', 'Pick Path Planning', 'Labor Scheduling', 'Inventory Control', 'Receiving & Putaway', 'Order Picking', 'Pack & Ship', 'Returns Processing', 'Space Utilization', 'Temperature Control', 'Hazmat Storage', 'Cycle Counting', 'Warehouse Automation', 'Conveyor Systems', 'Safety Compliance'],
    responsibilities: ['Warehouse slot optimization and space utilization management', 'Pick path planning and travel time reduction', 'Labor scheduling and workforce planning for warehouse operations', 'Inventory control and cycle counting program management', 'Receiving and putaway process optimization', 'Order picking, packing, and shipping coordination', 'Returns processing and reverse logistics management', 'Warehouse automation and conveyor system management', 'Safety compliance and hazmat storage oversight'],
    metrics: [
      { label: 'Space Utilization', value: '91.8%', change: '+4.3%' },
      { label: 'Pick Accuracy', value: '99.7%', change: '+0.2%' },
      { label: 'Labor Efficiency', value: '94.2%', change: '+3.8%' },
      { label: 'Warehouses', value: '36', change: '+2' },
    ],
    activities: [
      { time: '3 min ago', text: 'Optimized slot assignments for 1,200 new SKUs', icon: 'LayoutGrid' },
      { time: '15 min ago', text: 'Updated pick paths reducing travel time by 18%', icon: 'Route' },
      { time: '30 min ago', text: 'Adjusted labor schedule for peak season demand', icon: 'Users' },
      { time: '1 hr ago', text: 'Completed cycle count for zone A-3', icon: 'Package' },
      { time: '3 hr ago', text: 'Deployed new conveyor routing algorithm', icon: 'Settings' },
    ],
  },
  {
    file: 'distribution-manager.tsx',
    name: 'AI Distribution Manager',
    subtitle: 'Distribution Network & Zone Management',
    icon: 'MapPin',
    badge: 'Manager',
    agentId: 'distribution-manager',
    subAgents: [
      { id: 'zone-planner', name: 'AI Zone Planner', icon: 'MapPin', desc: 'Distribution zone design and territory optimization' },
      { id: 'delivery-window-manager', name: 'AI Delivery Window Manager', icon: 'Clock', desc: 'Delivery window scheduling and appointment management' },
      { id: 'carrier-allocator', name: 'AI Carrier Allocator', icon: 'Truck', desc: 'Carrier allocation and load assignment optimization' },
    ],
    capabilities: ['Distribution Planning', 'Zone Management', 'Delivery Windows', 'Carrier Allocation', 'Load Planning', 'Territory Design', 'Route Balancing', 'Appointment Scheduling', 'Distribution Analytics', 'Channel Management', 'Stock Transfer', 'Allocation Rules', 'Priority Management', 'Service Area Design', 'Capacity Allocation', 'Cost Optimization'],
    responsibilities: ['Distribution zone design and territory optimization', 'Delivery window scheduling and appointment management', 'Carrier allocation and load assignment optimization', 'Load planning and route balancing across distribution zones', 'Stock transfer and replenishment coordination', 'Distribution channel management and analytics', 'Priority management and service level allocation', 'Service area design and capacity planning', 'Cost optimization across distribution network'],
    metrics: [
      { label: 'Zone Coverage', value: '98.4%', change: '+1.6%' },
      { label: 'Window Compliance', value: '96.7%', change: '+2.3%' },
      { label: 'Carrier Utilization', value: '89.1%', change: '+5.2%' },
      { label: 'Distribution Centers', value: '24', change: '+2' },
    ],
    activities: [
      { time: '6 min ago', text: 'Redesigned distribution zones for Southeast region', icon: 'MapPin' },
      { time: '22 min ago', text: 'Updated delivery windows for 340 customers', icon: 'Clock' },
      { time: '40 min ago', text: 'Reallocated carriers for holiday surge capacity', icon: 'Truck' },
      { time: '1 hr ago', text: 'Completed zone balancing analysis for Q3', icon: 'ChartBarBig' },
      { time: '3 hr ago', text: 'Published distribution cost report to VP', icon: 'TrendingUp' },
    ],
  },
  {
    file: 'ai-route-optimizer.tsx',
    name: 'AI Route Optimizer',
    subtitle: 'Route Planning & Real-time Optimization',
    icon: 'Route',
    badge: 'Specialist',
    agentId: 'ai-route-optimizer',
    subAgents: [
      { id: 'traffic-predictor', name: 'AI Traffic Predictor', icon: 'Activity', desc: 'Traffic pattern prediction and congestion avoidance' },
      { id: 'multi-stop-planner', name: 'AI Multi-stop Planner', icon: 'Map', desc: 'Multi-stop route planning and sequence optimization' },
      { id: 'real-time-rerouter', name: 'AI Real-time Rerouter', icon: 'RefreshCw', desc: 'Real-time route rerouting and disruption response' },
    ],
    capabilities: ['Route Optimization', 'Traffic Prediction', 'Multi-stop Planning', 'Real-time Rerouting', 'Dynamic Routing', 'Time Window Compliance', 'Vehicle Routing Problem', 'Constraint Optimization', 'GPS Integration', 'Weather Integration', 'Fuel Optimization', 'Distance Minimization', 'Turn-by-Turn Navigation', 'Route Analytics', 'Historical Analysis', 'Predictive Routing'],
    responsibilities: ['Route optimization and dynamic routing management', 'Traffic pattern prediction and congestion avoidance', 'Multi-stop route planning and sequence optimization', 'Real-time route rerouting and disruption response', 'Time window compliance and delivery scheduling', 'Vehicle routing problem solving with constraint optimization', 'Weather integration and adverse condition routing', 'Route analytics and historical performance analysis', 'Predictive routing and proactive route adjustment'],
    metrics: [
      { label: 'Route Efficiency', value: '94.6%', change: '+6.2%' },
      { label: 'Avg Stops/Route', value: '28.4', change: '+3.1' },
      { label: 'Reroute Speed', value: '0.3s', change: '-40%' },
      { label: 'Miles Saved/Day', value: '12,400', change: '+18%' },
    ],
    activities: [
      { time: '1 min ago', text: 'Rerouted 45 trucks due to I-95 congestion alert', icon: 'RefreshCw' },
      { time: '8 min ago', text: 'Predicted traffic delay for downtown corridor', icon: 'Activity' },
      { time: '20 min ago', text: 'Optimized multi-stop sequence for 62 routes', icon: 'Map' },
      { time: '45 min ago', text: 'Integrated weather data for storm avoidance routing', icon: 'Route' },
      { time: '2 hr ago', text: 'Generated route efficiency report for Q3', icon: 'ChartBarBig' },
    ],
  },
  {
    file: 'ai-fleet-coordinator.tsx',
    name: 'AI Fleet Coordinator',
    subtitle: 'Fleet Dispatch & Vehicle Coordination',
    icon: 'Truck',
    badge: 'Specialist',
    agentId: 'ai-fleet-coordinator',
    subAgents: [
      { id: 'dispatch-optimizer', name: 'AI Dispatch Optimizer', icon: 'Zap', desc: 'Dispatch optimization and load-to-vehicle matching' },
      { id: 'driver-assignment-agent', name: 'AI Driver Assignment Agent', icon: 'UserCheck', desc: 'Driver-to-vehicle and driver-to-route assignment' },
      { id: 'vehicle-tracker', name: 'AI Vehicle Tracker', icon: 'MapPin', desc: 'Real-time vehicle tracking and location monitoring' },
    ],
    capabilities: ['Fleet Coordination', 'Dispatch Optimization', 'Driver Assignment', 'Vehicle Tracking', 'Load Matching', 'GPS Monitoring', 'Geofencing', 'Driver Management', 'Hours of Service', 'ELD Compliance', 'Vehicle Utilization', 'Deadhead Reduction', 'Fleet Communication', 'Break Management', 'Fuel Card Management', 'Yard Coordination'],
    responsibilities: ['Fleet dispatch optimization and load-to-vehicle matching', 'Driver-to-vehicle and driver-to-route assignment coordination', 'Real-time vehicle tracking and location monitoring', 'Hours of service compliance and ELD management', 'Deadhead reduction and vehicle utilization improvement', 'Fleet communication and driver coordination', 'Geofencing and arrival/departure tracking', 'Fuel card management and expense monitoring', 'Yard coordination and vehicle staging management'],
    metrics: [
      { label: 'Dispatch Rate', value: '97.2%', change: '+2.4%' },
      { label: 'Deadhead Rate', value: '8.4%', change: '-3.1%' },
      { label: 'HOS Compliance', value: '99.8%', change: '+0.2%' },
      { label: 'Active Vehicles', value: '1,421', change: '+87' },
    ],
    activities: [
      { time: '2 min ago', text: 'Dispatched 28 trucks for morning delivery routes', icon: 'Zap' },
      { time: '10 min ago', text: 'Assigned 12 drivers to new load assignments', icon: 'UserCheck' },
      { time: '25 min ago', text: 'Tracked vehicle arrival at 6 distribution centers', icon: 'MapPin' },
      { time: '1 hr ago', text: 'Reduced deadhead miles by optimizing backhaul matching', icon: 'Truck' },
      { time: '2 hr ago', text: 'Updated HOS compliance dashboard for fleet', icon: 'FileText' },
    ],
  },
  {
    file: 'ai-warehouse-operator.tsx',
    name: 'AI Warehouse Operator',
    subtitle: 'Warehouse Execution & Material Handling',
    icon: 'Package',
    badge: 'Specialist',
    agentId: 'ai-warehouse-operator',
    subAgents: [
      { id: 'inventory-put-away-agent', name: 'AI Inventory Put-away Agent', icon: 'ArrowDown', desc: 'Intelligent put-away and slot assignment for inbound inventory' },
      { id: 'pick-pack-coordinator', name: 'AI Pick & Pack Coordinator', icon: 'Package', desc: 'Order picking and packing coordination and optimization' },
      { id: 'return-processor', name: 'AI Return Processor', icon: 'RotateCcw', desc: 'Return processing and disposition management' },
    ],
    capabilities: ['Warehouse Execution', 'Put-away Optimization', 'Pick & Pack', 'Return Processing', 'Material Handling', 'Conveyor Operations', 'RF Scanning', 'Batch Picking', 'Wave Planning', 'Cross-docking', 'Quality Inspection', 'Labeling', 'Shrink Wrap', 'Pallet Building', 'Staging Management', 'Dock Operations'],
    responsibilities: ['Intelligent put-away and slot assignment for inbound inventory', 'Order picking and packing coordination and optimization', 'Return processing and disposition management', 'Material handling and conveyor operations management', 'Wave planning and batch picking coordination', 'Cross-docking and flow-through operations', 'Quality inspection and labeling management', 'Pallet building and staging management', 'Dock operations and trailer coordination'],
    metrics: [
      { label: 'Put-away Speed', value: '2.1 min', change: '-18%' },
      { label: 'Pick Rate', value: '142/hr', change: '+12%' },
      { label: 'Pack Accuracy', value: '99.8%', change: '+0.1%' },
      { label: 'Returns Processed', value: '847', change: '+94' },
    ],
    activities: [
      { time: '3 min ago', text: 'Completed put-away for 340 pallets in zone B', icon: 'ArrowDown' },
      { time: '12 min ago', text: 'Released wave 47 with 1,200 order lines', icon: 'Package' },
      { time: '30 min ago', text: 'Processed 48 returns with disposition decisions', icon: 'RotateCcw' },
      { time: '1 hr ago', text: 'Cross-docked 12 pallets to outbound dock 7', icon: 'Truck' },
      { time: '2 hr ago', text: 'Completed quality inspection for high-value items', icon: 'CheckCircle' },
    ],
  },
  {
    file: 'ai-dispatcher.tsx',
    name: 'AI Dispatcher',
    subtitle: 'Load Dispatch & Delivery Sequencing',
    icon: 'Zap',
    badge: 'Specialist',
    agentId: 'ai-dispatcher',
    subAgents: [
      { id: 'load-matcher', name: 'AI Load Matcher', icon: 'Layers', desc: 'Load-to-vehicle matching and capacity utilization' },
      { id: 'driver-communicator', name: 'AI Driver Communicator', icon: 'MessageSquare', desc: 'Driver communication and instruction delivery' },
      { id: 'delivery-sequencer', name: 'AI Delivery Sequencer', icon: 'List', desc: 'Delivery stop sequencing and priority management' },
    ],
    capabilities: ['Load Dispatch', 'Load Matching', 'Driver Communication', 'Delivery Sequencing', 'Priority Management', 'Load Planning', 'Capacity Utilization', 'Real-time Dispatch', 'Emergency Dispatch', 'Time Slot Management', 'Customer Notifications', 'Proof of Delivery', 'Exception Handling', 'Load Consolidation', 'Multi-stop Dispatch', 'Carrier Coordination'],
    responsibilities: ['Load-to-vehicle matching and capacity utilization optimization', 'Driver communication and instruction delivery management', 'Delivery stop sequencing and priority management', 'Real-time dispatch and emergency response coordination', 'Time slot management and customer notification', 'Load consolidation and multi-stop dispatch planning', 'Exception handling and escalation management', 'Proof of delivery collection and verification', 'Carrier coordination and third-party dispatch'],
    metrics: [
      { label: 'Dispatch Time', value: '4.2 min', change: '-22%' },
      { label: 'Load Fill Rate', value: '93.7%', change: '+4.1%' },
      { label: 'On-time Dispatch', value: '98.1%', change: '+1.3%' },
      { label: 'Daily Dispatches', value: '847', change: '+62' },
    ],
    activities: [
      { time: '1 min ago', text: 'Dispatched 15 loads for morning delivery window', icon: 'Zap' },
      { time: '8 min ago', text: 'Matched 8 partial loads for consolidation', icon: 'Layers' },
      { time: '20 min ago', text: 'Sent updated delivery instructions to 42 drivers', icon: 'MessageSquare' },
      { time: '45 min ago', text: 'Sequenced delivery stops for 28 priority routes', icon: 'List' },
      { time: '2 hr ago', text: 'Handled emergency dispatch for same-day shipment', icon: 'AlertTriangle' },
    ],
  },
  {
    file: 'ai-tracking-specialist.tsx',
    name: 'AI Tracking Specialist',
    subtitle: 'Shipment Tracking & ETA Prediction',
    icon: 'MapPin',
    badge: 'Specialist',
    agentId: 'ai-tracking-specialist',
    subAgents: [
      { id: 'shipment-monitor', name: 'AI Shipment Monitor', icon: 'Eye', desc: 'Real-time shipment monitoring and status tracking' },
      { id: 'eta-predictor', name: 'AI ETA Predictor', icon: 'Clock', desc: 'ETA prediction and delivery time estimation' },
      { id: 'exception-alerter', name: 'AI Exception Alerter', icon: 'AlertTriangle', desc: 'Exception detection and proactive alert management' },
    ],
    capabilities: ['Shipment Tracking', 'ETA Prediction', 'Exception Alerting', 'Real-time Monitoring', 'GPS Tracking', 'Geofencing', 'Status Updates', 'Delay Prediction', 'Milestone Tracking', 'Proof of Delivery', 'Customer Visibility', 'Carrier Integration', 'Multi-modal Tracking', 'Temperature Monitoring', 'Chain of Custody', 'Analytics & Reporting'],
    responsibilities: ['Real-time shipment monitoring and status tracking', 'ETA prediction and delivery time estimation', 'Exception detection and proactive alert management', 'GPS tracking and geofencing management', 'Milestone tracking and proof of delivery verification', 'Customer visibility and status update management', 'Carrier integration and multi-modal tracking', 'Temperature monitoring for cold chain shipments', 'Chain of custody and analytics reporting'],
    metrics: [
      { label: 'Tracking Accuracy', value: '99.6%', change: '+0.3%' },
      { label: 'ETA Accuracy', value: '96.4%', change: '+2.8%' },
      { label: 'Exception Response', value: '1.2 min', change: '-35%' },
      { label: 'Active Shipments', value: '14,821', change: '+1,247' },
    ],
    activities: [
      { time: '1 min ago', text: 'Tracked 2,400 active shipments across all carriers', icon: 'Eye' },
      { time: '5 min ago', text: 'Updated ETA for 87 delayed shipments', icon: 'Clock' },
      { time: '15 min ago', text: 'Alerted 3 temperature excursions in cold chain', icon: 'AlertTriangle' },
      { time: '30 min ago', text: 'Verified proof of delivery for 142 shipments', icon: 'MapPin' },
      { time: '1 hr ago', text: 'Generated weekly tracking performance report', icon: 'ChartBarBig' },
    ],
  },
  {
    file: 'ai-last-mile-coordinator.tsx',
    name: 'AI Last Mile Coordinator',
    subtitle: 'Last Mile Delivery & Customer Experience',
    icon: 'MapPin',
    badge: 'Specialist',
    agentId: 'ai-last-mile-coordinator',
    subAgents: [
      { id: 'delivery-window-negotiator', name: 'AI Delivery Window Negotiator', icon: 'Clock', desc: 'Delivery window negotiation and customer scheduling' },
      { id: 'proof-of-delivery-manager', name: 'AI Proof-of-delivery Manager', icon: 'CheckCircle', desc: 'Proof of delivery management and verification' },
      { id: 'customer-notifier', name: 'AI Customer Notifier', icon: 'Bell', desc: 'Customer notification and delivery communication' },
    ],
    capabilities: ['Last Mile Delivery', 'Window Negotiation', 'Proof of Delivery', 'Customer Notification', 'Delivery Scheduling', 'Route Optimization', 'White Glove Service', 'Installation Coordination', 'Signature Capture', 'Photo Verification', 'Customer Preferences', 'Delivery Instructions', 'Failed Delivery Mgmt', 'Redelivery Scheduling', 'Customer Feedback', 'NPS Tracking'],
    responsibilities: ['Delivery window negotiation and customer scheduling', 'Proof of delivery management and verification', 'Customer notification and delivery communication management', 'Last mile route optimization and delivery scheduling', 'White glove service and installation coordination', 'Failed delivery management and redelivery scheduling', 'Customer preference management and delivery instructions', 'Photo verification and signature capture management', 'Customer feedback collection and NPS tracking'],
    metrics: [
      { label: 'Delivery Success', value: '97.8%', change: '+1.4%' },
      { label: 'First Attempt Rate', value: '92.3%', change: '+3.2%' },
      { label: 'Customer NPS', value: '78', change: '+6' },
      { label: 'Daily Deliveries', value: '4,821', change: '+342' },
    ],
    activities: [
      { time: '2 min ago', text: 'Negotiated delivery windows for 86 customers', icon: 'Clock' },
      { time: '10 min ago', text: 'Verified proof of delivery for 142 shipments', icon: 'CheckCircle' },
      { time: '25 min ago', text: 'Sent delivery notifications to 340 customers', icon: 'Bell' },
      { time: '1 hr ago', text: 'Rescheduled 12 failed deliveries for tomorrow', icon: 'MapPin' },
      { time: '2 hr ago', text: 'Collected NPS feedback from 48 customers', icon: 'TrendingUp' },
    ],
  },
  {
    file: 'ai-freight-broker.tsx',
    name: 'AI Freight Broker',
    subtitle: 'Freight Procurement & Rate Negotiation',
    icon: 'DollarSign',
    badge: 'Specialist',
    agentId: 'ai-freight-broker',
    subAgents: [
      { id: 'rate-negotiator', name: 'AI Rate Negotiator', icon: 'DollarSign', desc: 'Freight rate negotiation and benchmarking' },
      { id: 'carrier-qualifier', name: 'AI Carrier Qualifier', icon: 'Shield', desc: 'Carrier qualification and compliance verification' },
      { id: 'lane-optimizer', name: 'AI Lane Optimizer', icon: 'Route', desc: 'Lane optimization and freight network balancing' },
    ],
    capabilities: ['Freight Brokerage', 'Rate Negotiation', 'Carrier Qualification', 'Lane Optimization', 'Freight Procurement', 'Contract Management', 'Spot Market', 'RFP Management', 'Carrier Scoring', 'Insurance Verification', 'Safety Rating', 'Capacity Sourcing', 'Freight Audit', 'Payment Processing', 'Market Intelligence', 'Benchmarking'],
    responsibilities: ['Freight rate negotiation and benchmarking analysis', 'Carrier qualification and compliance verification', 'Lane optimization and freight network balancing', 'Freight procurement and contract management', 'Spot market management and capacity sourcing', 'Carrier scoring and performance evaluation', 'Insurance verification and safety rating management', 'Freight audit and payment processing', 'Market intelligence and rate benchmarking'],
    metrics: [
      { label: 'Rate Savings', value: '14.2%', change: '+3.8%' },
      { label: 'Carrier Pool', value: '847', change: '+62' },
      { label: 'On-time Pickup', value: '96.1%', change: '+1.7%' },
      { label: 'Active Lanes', value: '2,400', change: '+180' },
    ],
    activities: [
      { time: '4 min ago', text: 'Negotiated 12% rate reduction on Midwest lanes', icon: 'DollarSign' },
      { time: '15 min ago', text: 'Qualified 8 new carriers for compliance standards', icon: 'Shield' },
      { time: '30 min ago', text: 'Optimized lane balance reducing empty miles by 22%', icon: 'Route' },
      { time: '1 hr ago', text: 'Processed spot market bids for 34 loads', icon: 'ChartBarBig' },
      { time: '3 hr ago', text: 'Completed quarterly carrier performance review', icon: 'FileText' },
    ],
  },
  {
    file: 'ai-customs-specialist.tsx',
    name: 'AI Customs Specialist',
    subtitle: 'Customs Compliance & Trade Documentation',
    icon: 'Globe',
    badge: 'Specialist',
    agentId: 'ai-customs-specialist',
    subAgents: [
      { id: 'duty-calculator', name: 'AI Duty Calculator', icon: 'Calculator', desc: 'Duty and tariff calculation and optimization' },
      { id: 'document-preparer', name: 'AI Document Preparer', icon: 'FileText', desc: 'Customs document preparation and filing management' },
      { id: 'compliance-checker', name: 'AI Compliance Checker', icon: 'ShieldCheck', desc: 'Trade compliance verification and restricted party screening' },
    ],
    capabilities: ['Customs Management', 'Duty Calculation', 'Document Preparation', 'Compliance Checking', 'HS Code Classification', 'Free Trade Agreements', 'Duty Drawback', 'Broker Management', 'Entry Filing', 'Clearance Tracking', 'Restricted Party Screening', 'Sanctions Compliance', 'Country of Origin', 'Valuation Management', 'Audit Support', 'Trade Intelligence'],
    responsibilities: ['Duty and tariff calculation and optimization', 'Customs document preparation and filing management', 'Trade compliance verification and restricted party screening', 'HS code classification and product categorization', 'Free trade agreement utilization and qualification', 'Duty drawback program management and claims', 'Customs broker management and entry filing oversight', 'Clearance tracking and exception resolution', 'Sanctions compliance and country of origin management'],
    metrics: [
      { label: 'Clearance Rate', value: '98.7%', change: '+1.2%' },
      { label: 'Duty Savings', value: '$2.4M', change: '+18%' },
      { label: 'Doc Accuracy', value: '99.9%', change: '+0.1%' },
      { label: 'Active Entries', value: '1,247', change: '+89' },
    ],
    activities: [
      { time: '3 min ago', text: 'Calculated duty optimization for 42 import entries', icon: 'Calculator' },
      { time: '12 min ago', text: 'Prepared customs documentation for 8 shipments', icon: 'FileText' },
      { time: '25 min ago', text: 'Screened 14 parties against restricted entity lists', icon: 'ShieldCheck' },
      { time: '1 hr ago', text: 'Filed duty drawback claim for $48K recovery', icon: 'DollarSign' },
      { time: '2 hr ago', text: 'Updated HS code classifications for new product line', icon: 'Globe' },
    ],
  },
];

const iconMap = {
  'Truck': 'Truck', 'Package': 'Package', 'MapPin': 'MapPin', 'Route': 'Route',
  'Zap': 'Zap', 'Globe': 'Globe', 'DollarSign': 'DollarSign', 'Wrench': 'Wrench',
  'Gauge': 'Gauge', 'Calendar': 'Calendar', 'Users': 'Users', 'LayoutGrid': 'LayoutGrid',
  'Clock': 'Clock', 'Layers': 'Layers', 'MessageSquare': 'MessageSquare', 'List': 'List',
  'Eye': 'Eye', 'AlertTriangle': 'AlertTriangle', 'CheckCircle': 'CheckCircle',
  'Bell': 'Bell', 'Shield': 'Shield', 'Calculator': 'Calculator', 'FileText': 'FileText',
  'ShieldCheck': 'ShieldCheck', 'ArrowDown': 'ArrowDown', 'RotateCcw': 'RotateCcw',
  'UserCheck': 'UserCheck', 'RefreshCw': 'RefreshCw', 'Map': 'Map', 'Activity': 'Activity',
  'Settings': 'Settings', 'BarChart3': 'BarChart3', 'TrendingUp': 'TrendingUp',
  'ChartBarBig': 'ChartBarBig', 'Star': 'Star', 'Briefcase': 'Briefcase',
  'ChevronRight': 'ChevronRight', 'ArrowRight': 'ArrowRight',
  'CircleCheckBig': 'CircleCheckBig', 'Target': 'Target',
};

function generatePage(agent) {
  const subAgentImports = [...new Set(agent.subAgents.map(sa => sa.icon))].join(', ');
  const activityIcons = [...new Set(agent.activities.map(a => a.icon))].join(', ');
  
  const allIcons = ['Activity', 'Star', 'CircleCheckBig', 'Clock', 'Target', 'ArrowRight',
    'Users', 'MessageSquare', 'Calendar', 'ChartBarBig', 'TrendingUp', 'AlertTriangle',
    'FileText', 'ChevronRight', agent.icon, subAgentImports, activityIcons]
    .join(', ')
    .split(', ')
    .filter((v, i, a) => a.indexOf(v) === i && v.trim())
    .join(', ');

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  ${allIcons}
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
${agent.subAgents.map(sa => `  { id: '${sa.id}', name: '${sa.name}', icon: ${sa.icon}, desc: '${sa.desc}' },`).join('\n')}
];

const QUICK_ACTIONS = [
  { label: 'Dashboard', icon: ChartBarBig },
  { label: 'Team Chat', icon: MessageSquare },
  { label: 'Schedule', icon: Calendar },
  { label: 'Alerts', icon: AlertTriangle },
];

const METRICS = [
${agent.metrics.map(m => `  { label: '${m.label}', value: '${m.value}', change: '${m.change}', trend: 'up' },`).join('\n')}
];

export default function ${agent.agentId.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Page() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Tasks', value: '${(Math.floor(Math.random() * 9000) + 1000).toLocaleString()}', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.${Math.floor(Math.random() * 9)}%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.${Math.floor(Math.random() * 9) + 1}s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '99.${Math.floor(Math.random() * 9)}%', icon: Target, color: '#26A69A' }
  ];

  const capabilities = [
    ${agent.capabilities.map(c => `'${c}'`).join(', ')}
  ];

  const responsibilities = [
    ${agent.responsibilities.map(r => `'${r}'`).join(',\n    ')}
  ];

  const activities = [
${agent.activities.map(a => `    { time: '${a.time}', text: '${a.text}', icon: ${a.icon} },`).join('\n')}
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#26A69A20' }]}>
          <${agent.icon} size={48} color="#26A69A" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${agent.name}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>${agent.subtitle}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#26A69A22' }]}><Star size={12} color="#26A69A" /><Text style={[styles.badgeText, { color: '#26A69A' }]}>{agent.badge}</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Truck size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>Transport Dept</Text></View>
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
          The ${agent.name} manages ${agent.subtitle.toLowerCase()} across the transportation and logistics network. This agent ensures optimal performance through its specialized sub-agents: ${agent.subAgents.map(sa => sa.name.replace('AI ', '')).join(', ')}.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#26A69A18' }]}><Text style={[styles.tagText, { color: '#26A69A' }]}>{cap}</Text></View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#26A69A" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Direct reports executing specialized functions under ${agent.name} direction.
        </Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push(\`/ai-agent/transportation/sub-agents/\${agent.id}\`)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: '#F59E0B20' }]}><agent.icon size={28} color="#F59E0B" /></View>
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
              <View style={styles.metricTrend}><TrendingUp size={12} color="#34C759" /><Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>{m.change}</Text></View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#26A69A15' }]}><act.icon size={14} color="#26A69A" /></View>
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
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#26A69A12' }]}>
              <action.icon size={24} color="#26A69A" />
              <Text style={[styles.actionText, { color: '#26A69A' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="${agent.agentId}" agentName="${agent.name}" />
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

let success = 0;
let fail = 0;
for (const agent of agents) {
  try {
    const filePath = path.join(baseDir, agent.file);
    const content = generatePage(agent);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Written: ${agent.file}`);
    success++;
  } catch (err) {
    console.error(`❌ Failed: ${agent.file}`, err.message);
    fail++;
  }
}
console.log(`\nDone: ${success} success, ${fail} failed`);

'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Crown, 
  Gem, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Brain, 
  Zap, 
  Globe, 
  Package, 
  Truck, 
  Target, 
  Flame, 
  Award, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Heart, 
  Star, 
  Shield, 
  ShieldCheck, 
  Calculator, 
  Palette, 
  Shirt, 
  Store, 
  Factory, 
  Warehouse, 
  BarChart3, 
  Radio, 
  Mail, 
  LayoutDashboard, 
  Settings, 
  Leaf, 
  MapPin, 
  Compass, 
  Navigation, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  CreditCard, 
  Building2, 
  Server, 
  Cpu,
  Menu,
  X
} from 'lucide-react-native';

// Theme Colors
const THEME = {
  background: '#050505',
  card: '#0A0F1E',
  cardLight: '#121829',
  luxuryGold: '#D4AF37',
  platinumSilver: '#E5E4E2',
  emeraldGreen: '#10B981',
  royalPurple: '#8B5CF6',
  roseGold: '#B76E79',
  crimson: '#DC143C',
  sapphireBlue: '#0F4C75',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Executive KPI Data
const EXECUTIVE_KPIS = {
  sales: {
    totalRevenue: { value: '$4.8B', change: 18.7, trend: 'up' },
    onlineSales: { value: '$2.1B', change: 24.3, trend: 'up' },
    boutiqueSales: { value: '$2.7B', change: 14.2, trend: 'up' },
    averageOrderValue: { value: '$847', change: 8.5, trend: 'up' },
    grossMargin: { value: '67%', change: 3.2, trend: 'up' },
  },
  customer: {
    activeCustomers: { value: '2.4M', change: 12.8, trend: 'up' },
    vipClients: { value: '89K', change: 22.5, trend: 'up' },
    customerLifetimeValue: { value: '$12.4K', change: 15.3, trend: 'up' },
    repeatPurchaseRate: { value: '78%', change: 5.7, trend: 'up' },
    customerSatisfaction: { value: '94%', change: 2.4, trend: 'up' },
  },
  inventory: {
    stockValue: { value: '$890M', change: -8.3, trend: 'down' },
    sellThroughRate: { value: '87%', change: 6.2, trend: 'up' },
    outOfStockAlerts: { value: '23', change: -34.5, trend: 'down' },
    inventoryTurnover: { value: '4.2x', change: 12.8, trend: 'up' },
    returnsRate: { value: '8.4%', change: -15.7, trend: 'down' },
  },
  marketing: {
    campaignROI: { value: '340%', change: 28.5, trend: 'up' },
    socialReach: { value: '45M', change: 42.3, trend: 'up' },
    influencerRevenue: { value: '$234M', change: 67.8, trend: 'up' },
    emailConversion: { value: '12.4%', change: 8.9, trend: 'up' },
    websiteTraffic: { value: '8.9M', change: 34.2, trend: 'up' },
  },
  ai: {
    aiRecommendations: { value: '1.2M', change: 89.4, trend: 'up' },
    demandForecastAccuracy: { value: '94%', change: 7.8, trend: 'up' },
    stylingSessions: { value: '234K', change: 156.7, trend: 'up' },
    automatedDecisions: { value: '45.6K', change: 234.5, trend: 'up' },
    revenueInfluenced: { value: '$1.2B', change: 67.8, trend: 'up' },
  },
};

// AI Fashion Agents
const AI_FASHION_AGENTS = [
  {
    id: 'vogue',
    name: 'Agent Vogue',
    role: 'Fashion Trend Intelligence',
    color: THEME.royalPurple,
    icon: Sparkles,
    responsibilities: [
      'Trend forecasting',
      'Collection planning',
      'Fashion analysis',
      'Seasonal predictions',
    ],
    metrics: {
      trendsIdentified: '2,347',
      forecastAccuracy: '94%',
      collectionsOptimized: '89',
    },
    status: 'active',
    efficiency: 96,
  },
  {
    id: 'couture',
    name: 'Agent Couture',
    role: 'Luxury Merchandising',
    color: THEME.luxuryGold,
    icon: Gem,
    responsibilities: [
      'Product assortment',
      'Merchandising optimization',
      'Collection performance',
      'Category intelligence',
    ],
    metrics: {
      productsOptimized: '12,847',
      sellThroughRate: '+18%',
      revenueGrowth: '+24%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'muse',
    name: 'Agent Muse',
    role: 'AI Personal Stylist',
    color: THEME.roseGold,
    icon: Heart,
    responsibilities: [
      'Outfit recommendations',
      'Personal styling',
      'Client preferences',
      'Wardrobe suggestions',
    ],
    metrics: {
      stylingSessions: '234K',
      conversionRate: '67%',
      customerSatisfaction: '96%',
    },
    status: 'active',
    efficiency: 92,
  },
  {
    id: 'elite',
    name: 'Agent Elite',
    role: 'VIP Clienteling',
    color: THEME.platinumSilver,
    icon: Crown,
    responsibilities: [
      'VIP engagement',
      'Concierge services',
      'Purchase predictions',
      'Personalized experiences',
    ],
    metrics: {
      vipRevenue: '$890M',
      retentionRate: '94%',
      clientSatisfaction: '98%',
    },
    status: 'active',
    efficiency: 97,
  },
  {
    id: 'luxe',
    name: 'Agent Luxe',
    role: 'Pricing Intelligence',
    color: THEME.emeraldGreen,
    icon: Calculator,
    responsibilities: [
      'Dynamic pricing',
      'Promotion optimization',
      'Competitive analysis',
      'Margin optimization',
    ],
    metrics: {
      marginImprovement: '+12%',
      priceAccuracy: '96%',
      revenueImpact: '$234M',
    },
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'atlas',
    name: 'Agent Atlas',
    role: 'Global Supply Chain',
    color: THEME.sapphireBlue,
    icon: Globe,
    responsibilities: [
      'Logistics optimization',
      'Supplier monitoring',
      'Warehouse intelligence',
      'Delivery forecasting',
    ],
    metrics: {
      ordersDelivered: '1.2M',
      onTimeRate: '96%',
      supplyEfficiency: '92%',
    },
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'nova',
    name: 'Agent Nova',
    role: 'Marketing Intelligence',
    color: THEME.crimson,
    icon: TrendingUp,
    responsibilities: [
      'Campaign optimization',
      'Social media',
      'Influencer management',
      'Customer acquisition',
    ],
    metrics: {
      campaignROI: '340%',
      leadsGenerated: '890K',
      engagementGrowth: '+67%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'sentinel',
    name: 'Agent Sentinel',
    role: 'Fraud & Security',
    color: THEME.crimson,
    icon: Shield,
    responsibilities: [
      'Fraud detection',
      'Payment monitoring',
      'Counterfeit prevention',
      'Risk management',
    ],
    metrics: {
      fraudPrevented: '2,347',
      secureTransactions: '99.8%',
      riskScore: 'Low',
    },
    status: 'active',
    efficiency: 98,
  },
];

// AI Insights
const AI_INSIGHTS = [
  {
    id: 1,
    type: 'opportunity',
    title: 'Luxury Handbag Demand Surge',
    message: 'Demand forecast predicts 18% higher sales for luxury handbags next month.',
    impact: 'High',
    action: 'Increase inventory allocation for premium handbag collection',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'VIP Customer Intent Increase',
    message: 'VIP customer segment shows a 32% increase in purchase intent.',
    impact: 'High',
    action: 'Launch personalized VIP campaign with exclusive offers',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    type: 'efficiency',
    title: 'Inventory Cost Optimization',
    message: 'Inventory optimization can reduce stock costs by $8.4M.',
    impact: 'High',
    action: 'Implement AI-driven inventory allocation strategy',
    timestamp: '6 hours ago',
  },
  {
    id: 4,
    type: 'opportunity',
    title: 'Premium Footwear Outperformance',
    message: 'Premium footwear collection is outperforming forecast by 22%.',
    impact: 'Medium',
    action: 'Expand premium footwear assortment and marketing',
    timestamp: '8 hours ago',
  },
  {
    id: 5,
    type: 'prediction',
    title: 'Asia-Pacific Inventory Recommendation',
    message: 'AI recommends increasing inventory for high-demand products in Asia-Pacific.',
    impact: 'High',
    action: 'Adjust regional inventory distribution strategy',
    timestamp: '12 hours ago',
  },
];

// Live Activity Feed
const ACTIVITY_FEED = [
  { id: 1, type: 'order', message: 'VIP order completed - $45,000 Chanel handbag', time: '2 min ago', icon: ShoppingBag },
  { id: 2, type: 'styling', message: 'AI styling session - 234 recommendations generated', time: '5 min ago', icon: Sparkles },
  { id: 3, type: 'inventory', message: 'Stock alert - Limited edition Gucci collection low', time: '8 min ago', icon: Package },
  { id: 4, type: 'customer', message: 'New VIP client - Luxury tier assigned', time: '12 min ago', icon: Crown },
  { id: 5, type: 'marketing', message: 'Campaign launched - Spring collection promotion', time: '15 min ago', icon: TrendingUp },
  { id: 6, type: 'supply', message: 'Shipment arrived - Paris boutique restocked', time: '20 min ago', icon: Truck },
  { id: 7, type: 'fraud', message: 'Fraud prevented - Suspicious transaction blocked', time: '25 min ago', icon: Shield },
  { id: 8, type: 'pricing', message: 'Dynamic pricing adjusted - Premium collection +5%', time: '30 min ago', icon: Calculator },
];

// System Health Data
const SYSTEM_HEALTH = [
  { name: 'Commerce APIs', status: 'healthy', active: 23, offline: 0, health: 99.9, icon: Server },
  { name: 'Inventory Services', status: 'healthy', active: 45, offline: 0, health: 99.5, icon: Warehouse },
  { name: 'AI Models', status: 'healthy', active: 89, offline: 0, health: 98.7, icon: Brain },
  { name: 'Payment Systems', status: 'healthy', active: 12, offline: 0, health: 99.8, icon: CreditCard },
  { name: 'ERP Integration', status: 'healthy', active: 8, offline: 0, health: 99.2, icon: Building2 },
  { name: 'CRM', status: 'healthy', active: 23, offline: 0, health: 98.9, icon: Users },
  { name: 'Recommendation Engine', status: 'healthy', active: 34, offline: 0, health: 97.8, icon: Sparkles },
];

// Navigation Items
const NAVIGATION_ITEMS = [
  { id: 'executive', label: 'Executive Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Fashion Agents', icon: Brain },
  { id: 'collections', label: 'Collections', icon: Shirt },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'inventory', label: 'Inventory', icon: Warehouse },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'vip', label: 'VIP Clienteling', icon: Crown },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'boutiques', label: 'Boutiques', icon: Store },
  { id: 'ecommerce', label: 'E-Commerce', icon: Globe },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp },
  { id: 'supply', label: 'Supply Chain', icon: Truck },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function FashionLuxuryCommandCenterWeb() {
  const [selectedKPI, setSelectedKPI] = useState('sales');
  const [selectedNav, setSelectedNav] = useState('executive');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderKPICard = (label: string, data: any, color: string) => (
    <div 
      key={label}
      className="p-4 rounded-xl border border-opacity-30 bg-[#121829] min-w-[140px]"
      style={{ borderColor: color + '30' }}
    >
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-lg font-bold text-white mb-1">{data.value}</div>
      <div className="flex items-center gap-1">
        {data.trend === 'up' ? (
          <ArrowUpRight size={14} className={data.change > 0 ? 'text-emerald-500' : 'text-crimson-500'} />
        ) : (
          <ArrowDownRight size={14} className={data.change > 0 ? 'text-emerald-500' : 'text-crimson-500'} />
        )}
        <span className={`text-xs ${data.change > 0 ? 'text-emerald-500' : 'text-crimson-500'}`}>
          {data.change > 0 ? '+' : ''}{data.change}%
        </span>
      </div>
    </div>
  );

  const renderAgentCard = (agent: any) => {
    const Icon = agent.icon;
    return (
      <div 
        key={agent.id}
        className="p-4 rounded-xl border border-opacity-30 bg-[#121829]"
        style={{ borderColor: agent.color + '30' }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: agent.color + '20' }}
          >
            <Icon size={24} color={agent.color} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-white text-sm">{agent.name}</h3>
              <div 
                className="px-2 py-1 rounded-full text-xs flex items-center gap-1"
                style={{ backgroundColor: agent.color + '20' }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: agent.color }}
                />
                <span style={{ color: agent.color }}>{agent.status}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">{agent.role}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {agent.responsibilities.slice(0, 2).map((resp: string, i: number) => (
            <span 
              key={i}
              className="px-2 py-1 rounded-full text-xs"
              style={{ backgroundColor: agent.color + '10', color: agent.color }}
            >
              {resp}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          {Object.entries(agent.metrics).map(([key, value]: [string, any]) => (
            <div key={key} className="text-center">
              <div className="text-sm font-semibold text-white">{value}</div>
              <div className="text-xs text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
            style={{ width: `${agent.efficiency}%`, backgroundColor: agent.color }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">{agent.efficiency}% Efficiency</div>
      </div>
    );
  };

  const renderInsightCard = (insight: any) => {
    const colors: any = {
      warning: THEME.luxuryGold,
      opportunity: THEME.emeraldGreen,
      efficiency: THEME.sapphireBlue,
      alert: THEME.crimson,
      prediction: THEME.royalPurple,
      positive: THEME.emeraldGreen,
    };
    const color = colors[insight.type] || THEME.textMuted;
    
    return (
      <div 
        key={insight.id}
        className="p-4 rounded-xl bg-[#121829] border-l-4"
        style={{ borderLeftColor: color }}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: color + '20' }}
            >
              {insight.type === 'warning' && <AlertTriangle size={18} color={color} />}
              {insight.type === 'opportunity' && <Sparkles size={18} color={color} />}
              {insight.type === 'efficiency' && <Zap size={18} color={color} />}
              {insight.type === 'alert' && <Shield size={18} color={color} />}
              {insight.type === 'prediction' && <Brain size={18} color={color} />}
              {insight.type === 'positive' && <CheckCircle size={18} color={color} />}
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{insight.title}</h4>
              <span className="text-xs text-gray-400">{insight.timestamp}</span>
            </div>
          </div>
          <div 
            className="px-2 py-1 rounded-full text-xs"
            style={{ backgroundColor: color + '20', color }}
          >
            {insight.impact}
          </div>
        </div>
        <p className="text-sm text-gray-300 mb-2">{insight.message}</p>
        <div 
          className="p-2 rounded-lg text-xs"
          style={{ backgroundColor: color + '10' }}
        >
          <span style={{ color }}>Recommended: {insight.action}</span>
        </div>
      </div>
    );
  };

  const renderActivityItem = (activity: any) => {
    const Icon = activity.icon;
    return (
      <div key={activity.id} className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: THEME.luxuryGold + '20' }}
        >
          <Icon size={16} color={THEME.luxuryGold} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-300">{activity.message}</p>
          <span className="text-xs text-gray-500">{activity.time}</span>
        </div>
      </div>
    );
  };

  const renderSystemHealth = (system: any) => {
    const statusColor = system.status === 'healthy' ? THEME.emeraldGreen : THEME.crimson;
    const Icon = system.icon;
    
    return (
      <div 
        key={system.name}
        className="p-4 rounded-xl bg-[#121829]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: statusColor + '20' }}
          >
            <Icon size={20} color={statusColor} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white text-sm">{system.name}</h4>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <div className="text-sm font-semibold" style={{ color: THEME.emeraldGreen }}>{system.active}</div>
            <div className="text-xs text-gray-400">Active</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold" style={{ color: THEME.crimson }}>{system.offline}</div>
            <div className="text-xs text-gray-400">Offline</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold" style={{ color: statusColor }}>{system.health}%</div>
            <div className="text-xs text-gray-400">Health</div>
          </div>
        </div>
        
        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
            style={{ width: `${system.health}%`, backgroundColor: statusColor }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-gray-800 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-gray-800"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: THEME.luxuryGold + '20' }}
          >
            <Gem size={24} color={THEME.luxuryGold} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white lg:text-xl">Fashion & Luxury AI Command Center</h1>
            <p className="text-xs text-gray-400">Autonomous Luxury Retail Operations</p>
          </div>
        </div>
        <button className="p-2 rounded-lg bg-gray-800">
          <Settings size={20} />
        </button>
      </header>

      <div className="flex">
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#0A0F1E] border-r border-gray-800 p-4">
              <div className="flex flex-col gap-1">
                {NAVIGATION_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedNav(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      selectedNav === item.id 
                        ? 'bg-opacity-20 border-l-2' 
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                    style={selectedNav === item.id ? { 
                      backgroundColor: THEME.luxuryGold + '20', 
                      borderLeftColor: THEME.luxuryGold,
                      color: THEME.luxuryGold 
                    } : {}}
                  >
                    <item.icon size={18} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:block w-56 bg-[#0A0F1E] border-r border-gray-800 p-4">
          <div className="flex flex-col gap-1">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedNav(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  selectedNav === item.id 
                    ? 'bg-opacity-20 border-l-2' 
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
                style={selectedNav === item.id ? { 
                  backgroundColor: THEME.luxuryGold + '20', 
                  borderLeftColor: THEME.luxuryGold,
                  color: THEME.luxuryGold 
                } : {}}
              >
                <item.icon size={18} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* Executive KPI Bar */}
          <section className="mb-8">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {Object.keys(EXECUTIVE_KPIS).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedKPI(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedKPI === key 
                      ? 'border-2' 
                      : 'bg-gray-800 text-gray-400'
                  }`}
                  style={selectedKPI === key ? { 
                    backgroundColor: THEME.luxuryGold + '20', 
                    borderColor: THEME.luxuryGold,
                    color: THEME.luxuryGold 
                  } : {}}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {Object.entries(EXECUTIVE_KPIS[selectedKPI as keyof typeof EXECUTIVE_KPIS]).map(([key, data]) =>
                renderKPICard(key.replace(/([A-Z])/g, ' $1').trim(), data, THEME.luxuryGold)
              )}
            </div>
          </section>

          {/* AI Fashion Agents */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-1">AI Fashion Agents</h2>
            <p className="text-sm text-gray-400 mb-4">Autonomous agents managing luxury fashion operations</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {AI_FASHION_AGENTS.map((agent) => renderAgentCard(agent))}
            </div>
          </section>

          {/* CEO Command Center */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-1">CEO Command Center</h2>
            <p className="text-sm text-gray-400 mb-4">Executive overview of luxury fashion operations</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Global Revenue', value: '$4.8B', icon: DollarSign, color: THEME.luxuryGold, change: '+18.7%', trend: 'up' },
                { label: 'Active Boutiques', value: '234', icon: Store, color: THEME.royalPurple, change: '+12.3%', trend: 'up' },
                { label: 'Online Visitors', value: '89K', icon: Users, color: THEME.emeraldGreen, change: '+24.5%', trend: 'up' },
                { label: 'VIP Customers', value: '89K', icon: Crown, color: THEME.platinumSilver, change: '+22.5%', trend: 'up' },
                { label: 'AI Revenue Impact', value: '$1.2B', icon: Brain, color: THEME.roseGold, change: '+67.8%', trend: 'up' },
                { label: 'Luxury Sales', value: '$3.2B', icon: ShoppingBag, color: THEME.sapphireBlue, change: '+15.2%', trend: 'up' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.label}
                    className="p-4 rounded-xl bg-[#121829]"
                  >
                    <div 
                      className="p-2 rounded-lg w-fit mb-2"
                      style={{ backgroundColor: item.color + '20' }}
                    >
                      <Icon size={24} color={item.color} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                    <div className="text-xs text-gray-400 mb-2">{item.label}</div>
                    <div className="flex items-center gap-1">
                      {item.trend === 'up' ? (
                        <ArrowUpRight size={14} className="text-emerald-500" />
                      ) : (
                        <ArrowDownRight size={14} className="text-crimson-500" />
                      )}
                      <span className="text-xs text-emerald-500">{item.change}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AI Insights */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-1">AI Insights</h2>
            <p className="text-sm text-gray-400 mb-4">Intelligent recommendations from AI agents</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AI_INSIGHTS.map((insight) => renderInsightCard(insight))}
            </div>
          </section>

          {/* Live Activity Feed */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-1">Live Activity Feed</h2>
            <p className="text-sm text-gray-400 mb-4">Real-time luxury retail operations</p>
            <div className="p-4 rounded-xl bg-[#121829]">
              {ACTIVITY_FEED.map((activity) => renderActivityItem(activity))}
            </div>
          </section>

          {/* System Health */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-1">System Health</h2>
            <p className="text-sm text-gray-400 mb-4">Infrastructure and service monitoring</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {SYSTEM_HEALTH.map((system) => renderSystemHealth(system))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
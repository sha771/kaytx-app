import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Megaphone, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Calendar, Settings as SettingsIcon, BarChart3, FileText, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Timer, ClipboardList, FileCheck, Calculator, Truck, HomeIcon, Percent, Eye, MousePointerClick, Globe, Mail, Phone, Users, SearchIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function PropertyMarketingPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('campaigns');
  const [autoPost, setAutoPost] = React.useState(true);

  const stats = [
    {label:'Campaigns',value:'20',icon: Megaphone,color:'#34C759'},
    {label:'Leads',value:'500',icon: MousePointerClick,color:'#007AFF'},
    {label:'Views',value:'125K',icon: Eye,color:'#FF9500'},
    {label:'Conv Rate',value:'4.2%',icon: Percent,color:'#33691E'}
  ];

  const campaigns = [
    {name:'Harbor View Launch',property:'Harbor View Tower',platforms:['Zillow','Realtor.com','Facebook'],budget:'$15,000',spent:'$8,500',leads:85,views:45000,status:'active',startDate:'2026-01-15',endDate:'2026-03-15'},
    {name:'Tech Campus SEO',property:'Tech Campus Phase II',platforms:['Google','LinkedIn','Website'],budget:'$12,000',spent:'$9,200',leads:62,views:32000,status:'active',startDate:'2026-01-01',endDate:'2026-02-28'},
    {name:'Industrial Promo',property:'Industrial Distribution',platforms:['LoopNet','CREXi'],budget:'$8,000',spent:'$4,500',leads:38,views:18000,status:'active',startDate:'2026-02-01',endDate:'2026-04-01'},
    {name:'Urban Lofts Teaser',property:'Urban Lofts',platforms:['Instagram','Facebook','Email'],budget:'$5,000',spent:'$1,200',leads:22,views:8500,status:'scheduled',startDate:'2026-03-01',endDate:'2026-05-01'}
  ];

  const listings = [
    {property:'Harbor View Tower',type:'Mixed-Use',views:45000,leads:85,inquiries:156,daysOnMarket:28,status:'active',price:'$850K - $2.2M'},
    {property:'Tech Campus Phase II',type:'Office',views:32000,leads:62,inquiries:98,daysOnMarket:45,status:'active',price:'$1.5M - $5M'},
    {property:'Industrial Distribution',type:'Industrial',views:18000,leads:38,inquiries:67,daysOnMarket:15,status:'active',price:'$8.5M'},
    {property:'Oakwood Retail',type:'Retail',views:12000,leads:28,inquiries:42,daysOnMarket:62,status:'pending',price:'$2.8M'}
  ];

  const leadSources = [
    {source:'Zillow',leads:145,conversion:5.2,quality:'high',cost:'$42/lead'},
    {source:'Realtor.com',leads:98,conversion:4.8,quality:'high',cost:'$38/lead'},
    {source:'Google Ads',leads:87,conversion:3.9,quality:'medium',cost:'$65/lead'},
    {source:'Facebook',leads:76,conversion:3.2,quality:'medium',cost:'$28/lead'},
    {source:'Direct Website',leads:54,conversion:6.1,quality:'high',cost:'$12/lead'},
    {source:'Referrals',leads:40,conversion:8.5,quality:'high',cost:'$0/lead'}
  ];

  const responsibilities = [
    'Property marketing strategy & execution',
    'Digital campaign management & optimization',
    'Listing management & distribution',
    'Lead generation & qualification',
    'Brand management & positioning',
    'Market positioning & competitive analysis',
    'Analytics & performance reporting'
  ];

  const capabilities = [
    'Property Marketing', 'Digital Campaigns', 'Listing Management', 'Lead Generation',
    'Brand Management', 'Market Positioning', 'SEO/SEM', 'Social Media',
    'Content Creation', 'Analytics', 'Email Marketing', 'Virtual Tours'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Launched 20 marketing campaigns this month',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Generated 500 qualified leads across portfolio',icon: MousePointerClick,color:'#007AFF'},
    {time:'9 min ago',text:'Increased listing views by 35% through SEO',icon: TrendingUp,color:'#FF9500'},
    {time:'15 min ago',text:'Created 12 virtual property tours',icon: Eye,color:'#33691E'},
    {time:'22 min ago',text:'Sent 2,500 targeted email campaigns',icon: Mail,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/marketing/campaigns',description:'Campaign management',method:'GET'},
    {endpoint:'/marketing/listings',description:'Listing distribution',method:'GET'},
    {endpoint:'/marketing/leads',description:'Lead generation',method:'GET'},
    {endpoint:'/marketing/analytics',description:'Performance analytics',method:'GET'},
    {endpoint:'/marketing/content',description:'Content creation',method:'POST'}
  ];

  const renderCampaigns = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Campaigns</Text>
        {campaigns.map((campaign, index) => (
          <TouchableOpacity key={index} style={styles.campaignCard}>
            <View style={styles.campaignHeader}>
              <View style={styles.campaignInfo}>
                <Text style={[styles.campaignName, { color: theme.colors.text }]}>{campaign.name}</Text>
                <Text style={[styles.campaignProperty, { color: theme.colors.textSecondary }]}>{campaign.property}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: campaign.status === 'active' ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.statusText, { color: campaign.status === 'active' ? '#34C759' : '#FF9500' }]}>{campaign.status}</Text>
              </View>
            </View>
            <View style={styles.platformRow}>
              {campaign.platforms.map((p,i)=>(<View key={i} style={[styles.platformBadge, { backgroundColor: '#007AFF15' }]}><Text style={[styles.platformText, { color: '#007AFF' }]}>{p}</Text></View>))}
            </View>
            <View style={styles.campaignMetrics}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{campaign.budget}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Budget</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{campaign.leads}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Leads</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: '#34C759' }]}>{campaign.views.toLocaleString()}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Views</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{campaign.endDate}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Ends</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderListings = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Listing Performance</Text>
        {listings.map((listing, index) => (
          <View key={index} style={styles.listingCard}>
            <View style={styles.listingHeader}>
              <View style={styles.listingInfo}>
                <Text style={[styles.listingProperty, { color: theme.colors.text }]}>{listing.property}</Text>
                <Text style={[styles.listingType, { color: theme.colors.textSecondary }]}>{listing.type} • {listing.price}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: listing.status === 'active' ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.statusText, { color: listing.status === 'active' ? '#34C759' : '#FF9500' }]}>{listing.status}</Text>
              </View>
            </View>
            <View style={styles.listingMetrics}>
              <View style={styles.listingMetric}><Eye size={14} color="#007AFF" /><Text style={[styles.listingMetricText, { color: theme.colors.text }]}>{listing.views.toLocaleString()}</Text></View>
              <View style={styles.listingMetric}><MousePointerClick size={14} color="#34C759" /><Text style={[styles.listingMetricText, { color: theme.colors.text }]}>{listing.leads}</Text></View>
              <View style={styles.listingMetric}><Mail size={14} color="#FF9500" /><Text style={[styles.listingMetricText, { color: theme.colors.text }]}>{listing.inquiries}</Text></View>
              <View style={styles.listingMetric}><Calendar size={14} color="#33691E" /><Text style={[styles.listingMetricText, { color: theme.colors.text }]}>{listing.daysOnMarket} days</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderLeads = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Lead Source Analysis</Text>
        {leadSources.map((source, index) => (
          <View key={index} style={styles.leadCard}>
            <View style={styles.leadHeader}>
              <Text style={[styles.leadSource, { color: theme.colors.text }]}>{source.source}</Text>
              <View style={[styles.qualityBadge, { backgroundColor: source.quality === 'high' ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.qualityText, { color: source.quality === 'high' ? '#34C759' : '#FF9500' }]}>{source.quality}</Text>
              </View>
            </View>
            <View style={styles.leadMetrics}>
              <View style={styles.leadMetric}><Text style={[styles.leadValue, { color: theme.colors.text }]}>{source.leads}</Text><Text style={[styles.leadLabel, { color: theme.colors.textSecondary }]}>Leads</Text></View>
              <View style={styles.leadMetric}><Text style={[styles.leadValue, { color: '#34C759' }]}>{source.conversion}%</Text><Text style={[styles.leadLabel, { color: theme.colors.textSecondary }]}>Conv</Text></View>
              <View style={styles.leadMetric}><Text style={[styles.leadValue, { color: '#33691E' }]}>{source.cost}</Text><Text style={[styles.leadLabel, { color: theme.colors.textSecondary }]}>Cost</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderSettings = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Automation Settings</Text>
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Post</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically post to listing sites</Text></View><Switch value={autoPost} onValueChange={setAutoPost} trackColor={{true:'#33691E'}} /></View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Calendar size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Schedule</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Megaphone size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Property Marketing</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Property Marketing & Lead Generation</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['campaigns','listings','leads','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'campaigns' && renderCampaigns()}
      {activeTab === 'listings' && renderListings()}
      {activeTab === 'leads' && renderLeads()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#33691E" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#33691E18' }]}><Text style={[styles.tagText, { color: '#33691E' }]}>{cap}</Text></View>))}</View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {a2aEndpoints.map((ep, i) => (
          <View key={i} style={styles.endpointRow}>
            <View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View>
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {recentActivity.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}
      </View>

      <SubAgentLinks subAgents={[
        { id: 'listing-creator', label: 'AI Listing Creator' },
        { id: 'virtual-tour-builder', label: 'AI Virtual Tour Builder' },
        { id: 'lead-qualifier', label: 'AI Lead Qualifier' },
      ]} />

      <AgentFeatures agentId="property-marketing" agentName="AI Property Marketing" />
      <View style={{height:40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},
  heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},
  heroTitle:{fontSize:26,fontWeight:'bold'},
  heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},
  badgesRow:{flexDirection:'row',gap:10,marginTop:16},
  badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},
  badgeText:{fontSize:12,fontWeight:'600'},
  statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},
  statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},
  statValue:{fontSize:18,fontWeight:'bold',marginTop:8},
  statLabel:{fontSize:11,marginTop:4},
  tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},
  tab:{flex:1,alignItems:'center',paddingVertical:10},
  tabText:{fontSize:13,fontWeight:'600'},
  section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},
  sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},
  description:{fontSize:14,lineHeight:22},
  tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},
  tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},
  tagText:{fontSize:12,fontWeight:'600'},
  responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},
  responsibilityText:{fontSize:14,flex:1,lineHeight:20},
  campaignCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  campaignHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  campaignInfo:{flex:1},
  campaignName:{fontSize:15,fontWeight:'600'},
  campaignProperty:{fontSize:12,color:'#666',marginTop:2},
  statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  statusText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  platformRow:{flexDirection:'row',flexWrap:'wrap',gap:6,marginBottom:12},
  platformBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:8},
  platformText:{fontSize:11,fontWeight:'600'},
  campaignMetrics:{flexDirection:'row',justifyContent:'space-between'},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:14,fontWeight:'bold'},
  metricLabel:{fontSize:10,marginTop:2},
  listingCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  listingHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  listingInfo:{flex:1},
  listingProperty:{fontSize:15,fontWeight:'600'},
  listingType:{fontSize:12,color:'#666',marginTop:2},
  listingMetrics:{flexDirection:'row',justifyContent:'space-between'},
  listingMetric:{flexDirection:'row',alignItems:'center',gap:6},
  listingMetricText:{fontSize:13,fontWeight:'600'},
  leadCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  leadHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  leadSource:{fontSize:15,fontWeight:'600'},
  qualityBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  qualityText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  leadMetrics:{flexDirection:'row',justifyContent:'space-between'},
  leadMetric:{alignItems:'center'},
  leadValue:{fontSize:14,fontWeight:'600'},
  leadLabel:{fontSize:11,color:'#666'},
  settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},
  settingLabel:{fontSize:14,fontWeight:'600'},
  settingDesc:{fontSize:12,marginTop:2},
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#33691E12'},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#33691E'},
  endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},
  methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},
  methodText:{fontSize:11,fontWeight:'700'},
  endpointText:{fontSize:13,fontFamily:'monospace',flex:1},
  activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},
  activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},
  activityContent:{flex:1},
  activityText:{fontSize:14,fontWeight:'500'},
  activityTime:{fontSize:12,marginTop:2}
});

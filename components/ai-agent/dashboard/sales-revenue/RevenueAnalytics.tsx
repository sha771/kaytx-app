import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { BarChart3, PieChart, TrendingUp, Globe, Building2, ShoppingCart, MapPin } from 'lucide-react-native';

// Mock analytics data
const revenueByProduct = [
  { product: 'Enterprise Plan', revenue: 8400000, percentage: 39 },
  { product: 'Team Plan', revenue: 6200000, percentage: 29 },
  { product: 'Starter Plan', revenue: 4200000, percentage: 19 },
  { product: 'Add-ons', revenue: 2800000, percentage: 13 }
];

const revenueByRegion = [
  { region: 'North America', revenue: 9500000, percentage: 44 },
  { region: 'Europe', revenue: 6400000, percentage: 30 },
  { region: 'Asia Pacific', revenue: 3800000, percentage: 18 },
  { region: 'Latin America', revenue: 1900000, percentage: 8 }
];

const revenueByIndustry = [
  { industry: 'Technology', revenue: 8600000, percentage: 40 },
  { industry: 'Finance', revenue: 4300000, percentage: 20 },
  { industry: 'Healthcare', revenue: 3200000, percentage: 15 },
  { industry: 'Retail', revenue: 2200000, percentage: 10 },
  { industry: 'Other', revenue: 3300000, percentage: 15 }
];

const revenueByChannel = [
  { channel: 'Direct Sales', revenue: 10800000, percentage: 50 },
  { channel: 'Partner Channel', revenue: 5400000, percentage: 25 },
  { channel: 'Self-Service', revenue: 3200000, percentage: 15 },
  { channel: 'Marketplace', revenue: 2200000, percentage: 10 }
];

const geographicRevenue = [
  { country: 'United States', revenue: 9500000, percentage: 44, flag: '🇺🇸' },
  { country: 'United Kingdom', revenue: 3200000, percentage: 15, flag: '🇬🇧' },
  { country: 'Germany', revenue: 2400000, percentage: 11, flag: '🇩🇪' },
  { country: 'France', revenue: 1800000, percentage: 8, flag: '🇫🇷' },
  { country: 'Canada', revenue: 1600000, percentage: 7, flag: '🇨🇦' },
  { country: 'Australia', revenue: 1400000, percentage: 6, flag: '🇦🇺' },
  { country: 'Japan', revenue: 1100000, percentage: 5, flag: '🇯🇵' },
  { country: 'Singapore', revenue: 600000, percentage: 4, flag: '🇸🇬' }
];

export default function RevenueAnalytics() {
  const { theme } = useTheme();

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const AnalyticsCard = ({ title, icon: Icon, data, color }: any) => (
    <View style={[styles.analyticsCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Icon size={16} color={color} />
        </View>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
          {title}
        </Text>
      </View>
      
      <View style={styles.dataList}>
        {data.map((item: any, index: number) => (
          <View key={index} style={styles.dataItem}>
            <View style={styles.dataInfo}>
              <Text style={[styles.dataName, { color: theme.colors.text }]}>
                {item.product || item.region || item.industry || item.channel}
              </Text>
              <Text style={[styles.dataRevenue, { color: theme.colors.text }]}>
                {formatCurrency(item.revenue)}
              </Text>
            </View>
            <View style={styles.dataBarContainer}>
              <View style={[styles.dataBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View 
                  style={[
                    styles.dataBarFill, 
                    { 
                      backgroundColor: color,
                      width: `${item.percentage}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.dataPercentage, { color: theme.colors.textSecondary }]}>
                {item.percentage}%
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <BarChart3 size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Revenue Analytics
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.analyticsRow}>
          <AnalyticsCard 
            title="Revenue by Product" 
            icon={ShoppingCart} 
            data={revenueByProduct} 
            color="#3B82F6"
          />
          <AnalyticsCard 
            title="Revenue by Region" 
            icon={Globe} 
            data={revenueByRegion} 
            color="#10B981"
          />
          <AnalyticsCard 
            title="Revenue by Industry" 
            icon={Building2} 
            data={revenueByIndustry} 
            color="#8B5CF6"
          />
          <AnalyticsCard 
            title="Revenue by Channel" 
            icon={TrendingUp} 
            data={revenueByChannel} 
            color="#F59E0B"
          />
        </View>
      </ScrollView>

      {/* Geographic Revenue Map */}
      <View style={styles.geographicSection}>
        <View style={styles.geographicHeader}>
          <MapPin size={18} color={theme.colors.primary} />
          <Text style={[styles.geographicTitle, { color: theme.colors.text }]}>
            Geographic Revenue
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.geographicGrid}>
            {geographicRevenue.map((country, index) => (
              <View key={country.country} style={[styles.countryCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <View style={styles.countryFlagContainer}>
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                </View>
                <Text style={[styles.countryName, { color: theme.colors.text }]}>
                  {country.country}
                </Text>
                <Text style={[styles.countryRevenue, { color: '#10B981' }]}>
                  {formatCurrency(country.revenue)}
                </Text>
                <View style={styles.countryBarContainer}>
                  <View style={[styles.countryBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View 
                      style={[
                        styles.countryBarFill, 
                        { 
                          backgroundColor: country.percentage >= 30 ? '#10B981' : 
                                       country.percentage >= 15 ? '#3B82F6' : '#F59E0B',
                          width: `${country.percentage}%`
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.countryPercentage, { color: theme.colors.textSecondary }]}>
                    {country.percentage}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  analyticsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  analyticsCard: {
    borderRadius: 12,
    padding: 12,
    minWidth: 260,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  dataList: {
    gap: 8,
  },
  dataItem: {
    gap: 6,
  },
  dataInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataName: {
    fontSize: 11,
    fontWeight: '500',
  },
  dataRevenue: {
    fontSize: 11,
    fontWeight: '600',
  },
  dataBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dataBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  dataBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  dataPercentage: {
    fontSize: 10,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'right',
  },
  geographicSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  geographicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  geographicTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  geographicGrid: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 8,
  },
  countryCard: {
    borderRadius: 12,
    padding: 12,
    minWidth: 160,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  countryFlagContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  countryFlag: {
    fontSize: 24,
  },
  countryName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  countryRevenue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  countryBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countryBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  countryBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  countryPercentage: {
    fontSize: 10,
    fontWeight: '600',
    minWidth: 30,
  }
});
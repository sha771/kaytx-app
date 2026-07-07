'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const THEME = {
  luxuryGold: '#D4AF37',
  platinumSilver: '#E5E4E2',
  emeraldGreen: '#10B981',
  royalPurple: '#8B5CF6',
  roseGold: '#B76E79',
  crimson: '#DC143C',
  sapphireBlue: '#0F4C75',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  grid: '#1E293B',
};

// Revenue Trend Data
const revenueData = [
  { month: 'Jan', revenue: 380, online: 160, boutique: 220 },
  { month: 'Feb', revenue: 420, online: 180, boutique: 240 },
  { month: 'Mar', revenue: 390, online: 170, boutique: 220 },
  { month: 'Apr', revenue: 450, online: 200, boutique: 250 },
  { month: 'May', revenue: 480, online: 220, boutique: 260 },
  { month: 'Jun', revenue: 520, online: 240, boutique: 280 },
  { month: 'Jul', revenue: 490, online: 230, boutique: 260 },
  { month: 'Aug', revenue: 510, online: 235, boutique: 275 },
  { month: 'Sep', revenue: 540, online: 250, boutique: 290 },
  { month: 'Oct', revenue: 580, online: 270, boutique: 310 },
  { month: 'Nov', revenue: 620, online: 290, boutique: 330 },
  { month: 'Dec', revenue: 680, online: 320, boutique: 360 },
];

// Collection Performance Data
const collectionData = [
  { name: 'Handbags', value: 35, color: THEME.luxuryGold },
  { name: 'Footwear', value: 25, color: THEME.royalPurple },
  { name: 'Apparel', value: 20, color: THEME.roseGold },
  { name: 'Accessories', value: 12, color: THEME.emeraldGreen },
  { name: 'Jewelry', value: 8, color: THEME.sapphireBlue },
];

// Regional Performance Data
const regionalData = [
  { region: 'Europe', revenue: 1800, boutiques: 89, growth: 12 },
  { region: 'Americas', revenue: 1600, boutiques: 78, growth: 15 },
  { region: 'Asia-Pacific', revenue: 1200, boutiques: 45, growth: 22 },
  { region: 'Middle East', revenue: 200, boutiques: 22, growth: 18 },
];

// Boutique Performance Data
const boutiqueData = [
  { name: 'Paris', revenue: 234, traffic: 15234, conversion: 8.5 },
  { name: 'New York', revenue: 245, traffic: 18456, conversion: 9.2 },
  { name: 'Tokyo', revenue: 198, traffic: 12847, conversion: 7.8 },
  { name: 'Milan', revenue: 189, traffic: 11234, conversion: 8.1 },
  { name: 'London', revenue: 167, traffic: 10567, conversion: 7.5 },
];

// AI Performance Metrics
const aiPerformanceData = [
  { month: 'Jan', accuracy: 88, efficiency: 85, adoption: 70 },
  { month: 'Feb', accuracy: 89, efficiency: 87, adoption: 75 },
  { month: 'Mar', accuracy: 90, efficiency: 88, adoption: 80 },
  { month: 'Apr', accuracy: 91, efficiency: 90, adoption: 82 },
  { month: 'May', accuracy: 92, efficiency: 91, adoption: 85 },
  { month: 'Jun', accuracy: 93, efficiency: 92, adoption: 88 },
];

// Inventory Turnover Data
const inventoryData = [
  { category: 'Handbags', turnover: 4.5, stockout: 2, overstock: 8 },
  { category: 'Footwear', turnover: 3.8, stockout: 5, overstock: 12 },
  { category: 'Apparel', turnover: 4.2, stockout: 3, overstock: 10 },
  { category: 'Accessories', turnover: 5.1, stockout: 1, overstock: 6 },
  { category: 'Jewelry', turnover: 2.9, stockout: 4, overstock: 15 },
];

// Customer Segmentation Data
const customerData = [
  { segment: 'VIP', count: 89000, revenue: 890000, ltv: 45000 },
  { segment: 'Premium', count: 234000, revenue: 567000, ltv: 24000 },
  { segment: 'Standard', count: 890000, revenue: 1230000, ltv: 12000 },
  { segment: 'New', count: 456000, revenue: 234000, ltv: 8000 },
];

// Marketing ROI Data
const marketingData = [
  { channel: 'Social Media', spend: 45000, revenue: 234000, roi: 420 },
  { channel: 'Influencers', spend: 67000, revenue: 456000, roi: 580 },
  { channel: 'Email', spend: 23000, revenue: 89000, roi: 287 },
  { channel: 'Paid Search', spend: 56000, revenue: 234000, roi: 318 },
  { channel: 'Display', spend: 34000, revenue: 123000, roi: 262 },
];

export function RevenueTrendChart() {
  return (
    <div className="p-4 rounded-xl bg-[#121829]">
      <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />
          <XAxis 
            dataKey="month" 
            stroke={THEME.textMuted}
            fontSize={12}
          />
          <YAxis 
            stroke={THEME.textMuted}
            fontSize={12}
            tickFormatter={(value) => `$${value}M`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0A0F1E', 
              border: '1px solid #1E293B',
              borderRadius: '8px'
            }}
            itemStyle={{ color: THEME.text }}
            labelStyle={{ color: THEME.textMuted }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke={THEME.luxuryGold} 
            fill={THEME.luxuryGold} 
            fillOpacity={0.3}
            name="Total Revenue"
          />
          <Area 
            type="monotone" 
            dataKey="online" 
            stroke={THEME.royalPurple} 
            fill={THEME.royalPurple} 
            fillOpacity={0.3}
            name="Online Sales"
          />
          <Area 
            type="monotone" 
            dataKey="boutique" 
            stroke={THEME.emeraldGreen} 
            fill={THEME.emeraldGreen} 
            fillOpacity={0.3}
            name="Boutique Sales"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CollectionPerformanceChart() {
  return (
    <div className="p-4 rounded-xl bg-[#121829]">
      <h3 className="text-lg font-semibold text-white mb-4">Collection Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={collectionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {collectionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0A0F1E', 
              border: '1px solid #1E293B',
              borderRadius: '8px'
            }}
            itemStyle={{ color: THEME.text }}
            labelStyle={{ color: THEME.textMuted }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RegionalPerformanceChart() {
  return (
    <div className="p-4 rounded-xl bg-[#121829]">
      <h3 className="text-lg font-semibold text-white mb-4">Regional Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={regionalData}>
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />
          <XAxis 
            dataKey="region" 
            stroke={THEME.textMuted}
            fontSize={12}
          />
          <YAxis 
            stroke={THEME.textMuted}
            fontSize={12}
            tickFormatter={(value) => `$${value}M`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0A0F1E', 
              border: '1px solid #1E293B',
              borderRadius: '8px'
            }}
            itemStyle={{ color: THEME.text }}
            labelStyle={{ color: THEME.textMuted }}
          />
          <Legend />
          <Bar dataKey="revenue" fill={THEME.luxuryGold} name="Revenue" />
          <Bar dataKey="boutiques" fill={THEME.royalPurple} name="Boutiques" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BoutiquePerformanceChart() {
  return (
    <div className="p-4 rounded-xl bg-[#121829]">
      <h3 className="text-lg font-semibold text-white mb-4">Boutique Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={boutiqueData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />
          <XAxis 
            type="number"
            stroke={THEME.textMuted}
            fontSize={12}
          />
          <YAxis 
            dataKey="name" 
            type="category"
            stroke={THEME.textMuted}
            fontSize={12}
            width={60}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0A0F1E', 
              border: '1px solid #1E293B',
              borderRadius: '8px'
            }}
            itemStyle={{ color: THEME.text }}
            labelStyle={{ color: THEME.textMuted }}
          />
          <Legend />
          <Bar dataKey="revenue" fill={THEME.luxuryGold} name="Revenue ($M)" />
          <Bar dataKey="traffic" fill={THEME.emeraldGreen} name="Daily Traffic" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AIPerformanceChart() {
  return (
    <div className="p-4 rounded-xl bg-[#121829]">
      <h3 className="text-lg font-semibold text-white mb-4">AI Performance Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={aiPerformanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />
          <XAxis 
            dataKey="month" 
            stroke={THEME.textMuted}
            fontSize={12}
          />
          <YAxis 
            stroke={THEME.textMuted}
            fontSize={12}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0A0F1E', 
              border: '1px solid #1E293B',
              borderRadius: '8px'
            }}
            itemStyle={{ color: THEME.text }}
            labelStyle={{ color: THEME.textMuted }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="accuracy" 
            stroke={THEME.emeraldGreen} 
            strokeWidth={2}
            name="Accuracy %"
          />
          <Line 
            type="monotone" 
            dataKey="efficiency" 
            stroke={THEME.royalPurple} 
            strokeWidth={2}
            name="Efficiency %"
          />
          <Line 
            type="monotone" 
            dataKey="adoption" 
            stroke={THEME.luxuryGold} 
            strokeWidth={2}
            name="Adoption %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function InventoryChart() {
  return (
    <div className="p-4 rounded-xl bg-[#121829]">
      <h3 className="text-lg font-semibold text-white mb-4">Inventory Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={inventoryData}>
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />
          <XAxis 
            dataKey="category" 
            stroke={THEME.textMuted}
            fontSize={12}
          />
          <YAxis 
            stroke={THEME.textMuted}
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0A0F1E', 
              border: '1px solid #1E293B',
              borderRadius: '8px'
            }}
            itemStyle={{ color: THEME.text }}
            labelStyle={{ color: THEME.textMuted }}
          />
          <Legend />
          <Bar dataKey="turnover" fill={THEME.emeraldGreen} name="Turnover Rate" />
          <Bar dataKey="stockout" fill={THEME.crimson} name="Stockout %" />
          <Bar dataKey="overstock" fill={THEME.luxuryGold} name="Overstock %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CustomerSegmentationChart() {
  return (
    <div className="p-4 rounded-xl bg-[#121829]">
      <h3 className="text-lg font-semibold text-white mb-4">Customer Segmentation</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={customerData}>
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />
          <XAxis 
            dataKey="segment" 
            stroke={THEME.textMuted}
            fontSize={12}
          />
          <YAxis 
            stroke={THEME.textMuted}
            fontSize={12}
            tickFormatter={(value) => (value / 1000).toFixed(0) + 'K'}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0A0F1E', 
              border: '1px solid #1E293B',
              borderRadius: '8px'
            }}
            itemStyle={{ color: THEME.text }}
            labelStyle={{ color: THEME.textMuted }}
          />
          <Legend />
          <Bar dataKey="count" fill={THEME.royalPurple} name="Customers" />
          <Bar dataKey="revenue" fill={THEME.luxuryGold} name="Revenue ($K)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MarketingROIChart() {
  return (
    <div className="p-4 rounded-xl bg-[#121829]">
      <h3 className="text-lg font-semibold text-white mb-4">Marketing ROI by Channel</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={marketingData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />
          <XAxis 
            type="number"
            stroke={THEME.textMuted}
            fontSize={12}
          />
          <YAxis 
            dataKey="channel" 
            type="category"
            stroke={THEME.textMuted}
            fontSize={12}
            width={100}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0A0F1E', 
              border: '1px solid #1E293B',
              borderRadius: '8px'
            }}
            itemStyle={{ color: THEME.text }}
            labelStyle={{ color: THEME.textMuted }}
          />
          <Legend />
          <Bar dataKey="spend" fill={THEME.crimson} name="Spend ($K)" />
          <Bar dataKey="revenue" fill={THEME.emeraldGreen} name="Revenue ($K)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
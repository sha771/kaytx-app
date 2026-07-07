'use client';

import { motion } from 'framer-motion';
import { Calendar, Zap, Server, TrendingUp, Clock } from 'lucide-react-native';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const liveEvents = [
  { name: 'Summer Championship', status: 'live', viewers: '2.5M', participants: '128K', revenue: '$1.2M' },
  { name: 'Battle Pass Season 5', status: 'active', viewers: '850K', participants: '5.2M', revenue: '$8.5M' },
  { name: 'Ranked Season Finale', status: 'upcoming', viewers: '-', participants: '3.1M', revenue: '$2.1M' },
];

const eventPerformanceData = [
  { event: 'Event A', engagement: 85, revenue: 120 },
  { event: 'Event B', engagement: 92, revenue: 145 },
  { event: 'Event C', engagement: 78, revenue: 98 },
  { event: 'Event D', engagement: 88, revenue: 132 },
  { event: 'Event E', engagement: 95, revenue: 168 },
];

const serverMetrics = [
  { region: 'NA-East', status: 'healthy', load: '72%', latency: '12ms' },
  { region: 'NA-West', status: 'healthy', load: '68%', latency: '15ms' },
  { region: 'EU-West', status: 'healthy', load: '75%', latency: '18ms' },
  { region: 'Asia-Pacific', status: 'healthy', load: '82%', latency: '25ms' },
];

export default function LiveOperationsCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Live Operations Center</h1>
        <p className="text-gray-400">Real-time event management and seasonal operations</p>
      </div>

      {/* Live Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {liveEvents.map((event, index) => (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/5 backdrop-blur-xl border ${
              event.status === 'live' ? 'border-red-500/50' : 
              event.status === 'active' ? 'border-green-500/50' : 
              'border-white/10'
            } rounded-xl p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">{event.name}</h3>
              <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs ${
                event.status === 'live' ? 'bg-red-500/20 text-red-400' :
                event.status === 'active' ? 'bg-green-500/20 text-green-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  event.status === 'live' ? 'bg-red-400 animate-pulse' :
                  event.status === 'active' ? 'bg-green-400' :
                  'bg-yellow-400'
                }`} />
                {event.status}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Viewers</span>
                <span className="text-white font-semibold">{event.viewers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Participants</span>
                <span className="text-white font-semibold">{event.participants}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Revenue</span>
                <span className="text-green-400 font-semibold">{event.revenue}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Event Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Event Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={eventPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="event" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(3, 5, 10, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="engagement" stroke="#06b6d4" name="Engagement %" />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue ($K)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Server Infrastructure</h3>
          </div>
          <div className="space-y-3">
            {serverMetrics.map((server, index) => (
              <motion.div
                key={server.region}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between bg-white/5 rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${server.status === 'healthy' ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-sm text-white">{server.region}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">Load: {server.load}</span>
                  <span className="text-cyan-400">{server.latency}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Operations Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-orange-400" />
            <p className="text-xs text-gray-500">Active Events</p>
          </div>
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-xs text-green-400 mt-1">+3 this week</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <p className="text-xs text-gray-500">Engagement Lift</p>
          </div>
          <p className="text-2xl font-bold text-white">+35%</p>
          <p className="text-xs text-green-400 mt-1">vs baseline</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <p className="text-xs text-gray-500">Avg Event Duration</p>
          </div>
          <p className="text-2xl font-bold text-white">14d</p>
          <p className="text-xs text-gray-400 mt-1">Season length</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <p className="text-xs text-gray-500">Event Revenue</p>
          </div>
          <p className="text-2xl font-bold text-white">$11.8M</p>
          <p className="text-xs text-green-400 mt-1">+22% MoM</p>
        </div>
      </div>
    </div>
  );
}

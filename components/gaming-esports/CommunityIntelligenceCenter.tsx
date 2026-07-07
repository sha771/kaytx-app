'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Users, Heart, TrendingUp, Share2, Award } from 'lucide-react-native';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const communityMetrics = {
  discordMembers: '8.5M',
  socialEngagement: '125M',
  communityGrowth: '+2.1M',
  creatorActivity: '45K',
  sentimentScore: '87%'
};

const sentimentData = [
  { date: 'Jun 19', positive: 82, neutral: 12, negative: 6 },
  { date: 'Jun 20', positive: 84, neutral: 11, negative: 5 },
  { date: 'Jun 21', positive: 83, neutral: 12, negative: 5 },
  { date: 'Jun 22', positive: 85, neutral: 10, negative: 5 },
  { date: 'Jun 23', positive: 86, neutral: 9, negative: 5 },
  { date: 'Jun 24', positive: 87, neutral: 8, negative: 5 },
  { date: 'Jun 25', positive: 88, neutral: 7, negative: 5 },
];

const topCommunities = [
  { name: 'Competitive Gaming', members: '2.1M', activity: 'High', growth: '+18%' },
  { name: 'Content Creators', members: '1.8M', activity: 'Very High', growth: '+25%' },
  { name: 'Casual Players', members: '2.5M', activity: 'Medium', growth: '+12%' },
  { name: 'Esports Fans', members: '1.2M', activity: 'High', growth: '+22%' },
];

const influencerNetwork = [
  { name: 'StreamerPro', followers: '2.5M', engagement: '8.5%', revenue: '$125K' },
  { name: 'GamerQueen', followers: '1.8M', engagement: '12.3%', revenue: '$98K' },
  { name: 'ProPlayerX', followers: '1.2M', engagement: '15.7%', revenue: '$85K' },
  { name: 'ContentMaster', followers: '950K', engagement: '9.2%', revenue: '$72K' },
];

export default function CommunityIntelligenceCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Community Intelligence Center</h1>
        <p className="text-gray-400">Real-time community health, sentiment, and engagement analytics</p>
      </div>

      {/* Community Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <p className="text-xs text-gray-500">Discord Members</p>
          </div>
          <p className="text-2xl font-bold text-white">{communityMetrics.discordMembers}</p>
          <p className="text-xs text-green-400 mt-1">+18.5% YoY</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <p className="text-xs text-gray-500">Social Engagement</p>
          </div>
          <p className="text-2xl font-bold text-white">{communityMetrics.socialEngagement}</p>
          <p className="text-xs text-green-400 mt-1">+22.3% YoY</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-green-400" />
            <p className="text-xs text-gray-500">Community Growth</p>
          </div>
          <p className="text-2xl font-bold text-white">{communityMetrics.communityGrowth}</p>
          <p className="text-xs text-green-400 mt-1">+32.1% YoY</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <p className="text-xs text-gray-500">Creator Activity</p>
          </div>
          <p className="text-2xl font-bold text-white">{communityMetrics.creatorActivity}</p>
          <p className="text-xs text-green-400 mt-1">+15.7% YoY</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <p className="text-xs text-gray-500">Sentiment Score</p>
          </div>
          <p className="text-2xl font-bold text-white">{communityMetrics.sentimentScore}</p>
          <p className="text-xs text-green-400 mt-1">+5.2% YoY</p>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-pink-400" />
          <h3 className="text-lg font-bold text-white">Sentiment Analysis</h3>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sentimentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(3, 5, 10, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="positive" stroke="#22c55e" name="Positive %" />
            <Line type="monotone" dataKey="neutral" stroke="#9ca3af" name="Neutral %" />
            <Line type="monotone" dataKey="negative" stroke="#ef4444" name="Negative %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Communities & Influencers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Top Communities</h3>
          </div>
          <div className="space-y-3">
            {topCommunities.map((community, index) => (
              <motion.div
                key={community.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between bg-white/5 rounded-lg p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{community.name}</p>
                  <p className="text-xs text-gray-400">{community.members} members</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    community.activity === 'Very High' ? 'bg-green-500/20 text-green-400' :
                    community.activity === 'High' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {community.activity}
                  </span>
                  <span className="text-xs text-green-400">{community.growth}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">Influencer Network</h3>
          </div>
          <div className="space-y-3">
            {influencerNetwork.map((influencer, index) => (
              <motion.div
                key={influencer.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between bg-white/5 rounded-lg p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{influencer.name}</p>
                  <p className="text-xs text-gray-400">{influencer.followers} followers</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-cyan-400">{influencer.engagement}</span>
                  <span className="text-green-400">{influencer.revenue}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-pink-400" />
          <h3 className="text-lg font-bold text-white">Community Intelligence Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <p className="text-sm font-semibold text-white">Sentiment improved 15%</p>
              <p className="text-xs text-gray-400">Following latest event launch</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-cyan-400 mt-1" />
            <div>
              <p className="text-sm font-semibold text-white">Creator engagement up 22%</p>
              <p className="text-xs text-gray-400">New partnership program active</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Share2 className="w-5 h-5 text-purple-400 mt-1" />
            <div>
              <p className="text-sm font-semibold text-white">Social reach expanded 32%</p>
              <p className="text-xs text-gray-400">Viral content campaign success</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

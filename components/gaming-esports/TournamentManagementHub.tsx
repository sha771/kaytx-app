'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, DollarSign, Clock, CheckCircle } from 'lucide-react-native';

const tournaments = [
  { 
    name: 'World Championship 2026', 
    status: 'in-progress', 
    registrations: 512, 
    matches: 245, 
    prize: '$5M',
    startDate: 'Jun 15',
    endDate: 'Jul 15'
  },
  { 
    name: 'Summer Regional Series', 
    status: 'registration', 
    registrations: 328, 
    matches: 0, 
    prize: '$750K',
    startDate: 'Aug 1',
    endDate: 'Aug 30'
  },
  { 
    name: 'Minor Circuit Q3', 
    status: 'upcoming', 
    registrations: 156, 
    matches: 0, 
    prize: '$250K',
    startDate: 'Sep 10',
    endDate: 'Sep 25'
  },
];

const matchSchedule = [
  { time: '14:00', match: 'Team Alpha vs Team Beta', round: 'Quarterfinals', status: 'scheduled' },
  { time: '16:00', match: 'Team Gamma vs Team Delta', round: 'Quarterfinals', status: 'scheduled' },
  { time: '18:00', match: 'Team Epsilon vs Team Zeta', round: 'Quarterfinals', status: 'live' },
  { time: '20:00', match: 'Winner Match 1 vs Winner Match 2', round: 'Semifinals', status: 'pending' },
];

const refereeOperations = [
  { name: 'John Smith', assigned: 12, completed: 10, status: 'active' },
  { name: 'Sarah Johnson', assigned: 10, completed: 9, status: 'active' },
  { name: 'Mike Davis', assigned: 8, completed: 8, status: 'available' },
];

export default function TournamentManagementHub() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tournament Management Hub</h1>
        <p className="text-gray-400">Comprehensive tournament operations and scheduling</p>
      </div>

      {/* Tournament Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tournaments.map((tournament, index) => (
          <motion.div
            key={tournament.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/5 backdrop-blur-xl border ${
              tournament.status === 'in-progress' ? 'border-green-500/50' : 
              tournament.status === 'registration' ? 'border-cyan-500/50' : 
              'border-white/10'
            } rounded-xl p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">{tournament.name}</h3>
              <div className={`px-2 py-1 rounded-full text-xs ${
                tournament.status === 'in-progress' ? 'bg-green-500/20 text-green-400' :
                tournament.status === 'registration' ? 'bg-cyan-500/20 text-cyan-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {tournament.status}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Registrations</span>
                <span className="text-white">{tournament.registrations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Matches</span>
                <span className="text-white">{tournament.matches}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Prize Pool</span>
                <span className="text-green-400">{tournament.prize}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-gray-400">{tournament.startDate}</span>
                <span className="text-gray-400">{tournament.endDate}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Match Schedule */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Match Schedule</h3>
        </div>
        <div className="space-y-3">
          {matchSchedule.map((match, index) => (
            <motion.div
              key={match.time}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between bg-white/5 rounded-lg p-4 ${
                match.status === 'live' ? 'border-l-4 border-red-500' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-cyan-400 font-mono">{match.time}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{match.match}</p>
                  <p className="text-xs text-gray-400">{match.round}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${
                match.status === 'live' ? 'bg-red-500/20 text-red-400' :
                match.status === 'scheduled' ? 'bg-green-500/20 text-green-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {match.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Referee Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Referee Operations</h3>
          </div>
          <div className="space-y-3">
            {refereeOperations.map((referee, index) => (
              <motion.div
                key={referee.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between bg-white/5 rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${referee.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                  <span className="text-sm text-white">{referee.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">{referee.assigned} assigned</span>
                  <span className="text-green-400">{referee.completed} completed</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">Prize Distribution</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-yellow-400">1st</span>
                <span className="text-sm text-white">50%</span>
              </div>
              <span className="text-sm text-green-400">$2.5M</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-300">2nd</span>
                <span className="text-sm text-white">25%</span>
              </div>
              <span className="text-sm text-green-400">$1.25M</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-orange-400">3rd</span>
                <span className="text-sm text-white">15%</span>
              </div>
              <span className="text-sm text-green-400">$750K</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-500">4-8th</span>
                <span className="text-sm text-white">10%</span>
              </div>
              <span className="text-sm text-green-400">$500K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <p className="text-xs text-gray-500">Total Registrations</p>
          </div>
          <p className="text-2xl font-bold text-white">996</p>
          <p className="text-xs text-green-400 mt-1">+18% vs last season</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <p className="text-xs text-gray-500">Matches Scheduled</p>
          </div>
          <p className="text-2xl font-bold text-white">1,245</p>
          <p className="text-xs text-green-400 mt-1">245 completed</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <p className="text-xs text-gray-500">Total Prize Pool</p>
          </div>
          <p className="text-2xl font-bold text-white">$6M</p>
          <p className="text-xs text-green-400 mt-1">$2.5M distributed</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-xs text-gray-500">Completion Rate</p>
          </div>
          <p className="text-2xl font-bold text-white">94%</p>
          <p className="text-xs text-green-400 mt-1">+2.3% improvement</p>
        </div>
      </div>
    </div>
  );
}

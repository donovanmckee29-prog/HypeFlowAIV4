import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { arenaAPI } from '../services/api';

export default function ArenaPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [userRank, setUserRank] = useState(0);
  const [userXP, setUserXP] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArenaData();
  }, []);

  const loadArenaData = async () => {
    try {
      setLoading(true);
      const [leaderboardResponse, challengesResponse] = await Promise.all([
        arenaAPI.getLeaderboard(),
        arenaAPI.getChallenges()
      ]);
      
      setLeaderboard(leaderboardResponse.data);
      setChallenges(challengesResponse.data);
      setUserRank(leaderboardResponse.data.findIndex(user => user.isCurrentUser) + 1);
      setUserXP(leaderboardResponse.data.find(user => user.isCurrentUser)?.xp || 0);
    } catch (err) {
      setError('Failed to load arena data. Please try again.');
      console.error('Arena data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitAction = async (action) => {
    try {
      await arenaAPI.submitAction(action);
      loadArenaData(); // Reload to update XP
    } catch (err) {
      setError('Failed to submit action. Please try again.');
      console.error('Submit action error:', err);
    }
  };

  if (loading) {
    return (
      <div className="arena-root min-h-screen container mx-auto px-6 py-12">
        <div className="glass-card text-center">
          <div className="skeleton h-8 w-64 mx-auto mb-4"></div>
          <div className="skeleton h-4 w-96 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="arena-root min-h-screen container mx-auto px-6 py-12">
        <div className="error-state">
          <h2 className="text-2xl font-bold mb-4">Failed to Load Arena Data</h2>
          <p className="mb-4">{error}</p>
          <button onClick={loadArenaData} className="btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="arena-root min-h-screen container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          ⚔️ Collector Arena
        </h1>

        {/* User Stats */}
        <motion.div 
          className="glass-card neon-purple mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Your Arena Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">#{userRank}</div>
              <div className="text-sm text-gray-400">Current Rank</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">{userXP}</div>
              <div className="text-sm text-gray-400">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">
                {challenges.filter(c => c.completed).length}
              </div>
              <div className="text-sm text-gray-400">Challenges Completed</div>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div 
          className="glass-card neon-cyan mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Leaderboard</h2>
          <div className="space-y-4">
            {leaderboard.slice(0, 10).map((user, index) => (
              <div 
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  user.isCurrentUser ? 'bg-cyan-500/20 border border-cyan-400' : 'bg-gray-800/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-cyan-400">#{index + 1}</div>
                  <div className="text-2xl">{user.avatar}</div>
                  <div>
                    <div className="font-bold text-white">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.title}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-400">{user.xp} XP</div>
                  <div className="text-sm text-gray-400">{user.level} Level</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Challenges */}
        <motion.div 
          className="glass-card neon-orange"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Active Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <div 
                key={index}
                className={`glass-card p-6 ${
                  challenge.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{challenge.icon}</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    challenge.completed 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {challenge.completed ? 'COMPLETED' : 'ACTIVE'}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{challenge.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-cyan-400">
                    Reward: {challenge.xpReward} XP
                  </div>
                  <div className="text-sm text-gray-400">
                    {challenge.difficulty}
                  </div>
                </div>
                {!challenge.completed && (
                  <button 
                    onClick={() => submitAction({ challengeId: challenge.id, action: 'start' })}
                    className="btn w-full"
                  >
                    Start Challenge
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone, Brain, Search, Database } from 'lucide-react-native';
import { createAgentBrainContext } from '@/lib/agents-brain/agent-integration';
import { api } from '@/lib/trpc';

export default function AgentPage() {
  const [brainInitialized, setBrainInitialized] = useState(false);
  const [brainStats, setBrainStats] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [queryResults, setQueryResults] = useState<any>(null);
  const [isQuerying, setIsQuerying] = useState(false);

  // Initialize agent brain on mount
  useEffect(() => {
    initializeAgentBrain();
  }, []);

  const initializeAgentBrain = async () => {
    try {
      const brainContext = createAgentBrainContext('marketing-brand', 'marketing');
      await brainContext.initialize();
      const stats = await brainContext.getStatistics();
      if (stats.success) {
        setBrainStats(stats.statistics);
        setBrainInitialized(true);
      }
    } catch (error) {
      console.error('Failed to initialize agent brain:', error);
    }
  };

  const handleQuery = async () => {
    if (!query.trim()) return;
    setIsQuerying(true);
    try {
      const brainContext = createAgentBrainContext('marketing-brand', 'marketing');
      const result = await brainContext.query(query);
      setQueryResults(result);
    } catch (error) {
      console.error('Query failed:', error);
    } finally {
      setIsQuerying(false);
    }
  };

  const agent = {
    id: 'marketing-brand',
    name: 'marketing-brand',
    title: 'marketing-brand',
    description: 'The marketing-brand AI provides specialized services and automation within its department. Uses Agents Brain for efficient knowledge retrieval.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Brain-Powered Knowledge"],
    icon: Megaphone,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$54k/year',
    aiCost: '$1k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'marketing-brand',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1288,
      responseTime: '0.4s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  return (
    <div>
      <AgentPageWrapper agent={agent} />
      
      {/* Agent Brain Integration Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold">Agent Brain</h2>
        </div>
        
        {brainInitialized ? (
          <div className="space-y-4">
            {/* Brain Statistics */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-purple-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Wiki Pages</div>
                <div className="text-2xl font-bold">{brainStats?.totalWikiPages || 0}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Sources</div>
                <div className="text-2xl font-bold">{brainStats?.totalSources || 0}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Token Savings</div>
                <div className="text-2xl font-bold">{((brainStats?.tokenSavings || 0) / 1000).toFixed(1)}k</div>
              </div>
            </div>

            {/* Brain Query */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Query Agent Brain
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                  placeholder="Search marketing knowledge..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleQuery}
                  disabled={isQuerying}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  {isQuerying ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Query Results */}
            {queryResults && queryResults.success && (
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Found {queryResults.pages.length} pages • Saved ~{queryResults.tokenSavings.toLocaleString()} tokens
                </div>
                {queryResults.pages.map((page: any, index: number) => (
                  <div key={page.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{page.frontmatter.title}</h3>
                      <span className="text-sm text-gray-500">
                        Relevance: {(queryResults.relevanceScores[index] * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{page.frontmatter.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Database className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Initializing agent brain...</p>
          </div>
        )}
      </div>
    </div>
  );
}

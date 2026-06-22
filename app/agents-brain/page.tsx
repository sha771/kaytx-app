import React, { useState, useEffect } from 'react';
import { Brain, Database, Search, FileText, BarChart3, Settings, RefreshCw, Download, Upload, Trash2, Users } from 'lucide-react-native';
import { api } from '@/lib/trpc';

export default function AgentsBrainPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'query' | 'pages' | 'settings'>('overview');
  const [query, setQuery] = useState('');
  const [queryResults, setQueryResults] = useState<any>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [isIngesting, setIsIngesting] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'shared' | 'agent'>('shared');

  // Fetch brain statistics
  const { data: stats, refetch: refetchStats } = api.agentsBrain.getStatistics.useQuery(
    { agentId: selectedAgentId },
    { enabled: true }
  );
  const { data: health } = api.agentsBrain.getHealthStatus.useQuery(
    { agentId: selectedAgentId },
    { enabled: true }
  );
  const { data: pages } = api.agentsBrain.getAllPages.useQuery(
    { agentId: selectedAgentId },
    { enabled: true }
  );
  const { data: manifest } = api.agentsBrain.getManifest.useQuery(
    { agentId: selectedAgentId },
    { enabled: true }
  );
  const { data: agentBrains } = api.agentsBrain.listAgentBrains.useQuery();

  // Initialize brain
  const initializeMutation = api.agentsBrain.initialize.useMutation({
    onSuccess: () => {
      refetchStats();
    },
  });

  // Ingest sources
  const ingestMutation = api.agentsBrain.ingest.useMutation({
    onSuccess: () => {
      setIsIngesting(false);
      refetchStats();
    },
  });

  // Query brain
  const queryMutation = api.agentsBrain.query.useMutation({
    onSuccess: (data) => {
      setQueryResults(data);
      setIsQuerying(false);
    },
  });

  // Reset brain
  const resetMutation = api.agentsBrain.reset.useMutation({
    onSuccess: () => {
      refetchStats();
    },
  });

  const handleInitialize = async () => {
    await initializeMutation.mutateAsync({ agentId: selectedAgentId });
  };

  const handleIngest = async () => {
    setIsIngesting(true);
    await ingestMutation.mutateAsync({ agentId: selectedAgentId });
  };

  const handleQuery = async () => {
    if (!query.trim()) return;
    setIsQuerying(true);
    await queryMutation.mutateAsync({ query, limit: 10, agentId: selectedAgentId });
  };

  const handleReset = async () => {
    const brainName = selectedAgentId ? `brain for agent ${selectedAgentId}` : 'shared brain';
    if (confirm(`Are you sure you want to reset the ${brainName}? This will delete all data.`)) {
      await resetMutation.mutateAsync({ agentId: selectedAgentId });
    }
  };

  const handleViewModeChange = (mode: 'shared' | 'agent') => {
    setViewMode(mode);
    if (mode === 'shared') {
      setSelectedAgentId(undefined);
    }
  };

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgentId(agentId);
    setViewMode('agent');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">Agents Brain</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleViewModeChange('shared')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'shared'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Shared Brain
              </button>
              <button
                onClick={() => handleViewModeChange('agent')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  viewMode === 'agent'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Users className="w-4 h-4" />
                Agent Brains
              </button>
            </div>
          </div>
          <p className="text-gray-600">
            Structured knowledge base for AI agents and employees. Scan raw data once, query structured brain forever.
          </p>
        </div>

        {/* Agent Selection */}
        {viewMode === 'agent' && (
          <div className="mb-6 bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Agent Brain
            </label>
            <div className="flex gap-3">
              <select
                value={selectedAgentId || ''}
                onChange={(e) => handleAgentSelect(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select an agent...</option>
                {agentBrains?.agentIds?.map((agentId: string) => (
                  <option key={agentId} value={agentId}>
                    Agent: {agentId}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Or enter new agent ID..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
                    handleAgentSelect((e.target as HTMLInputElement).value);
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {selectedAgentId && (
              <p className="mt-2 text-sm text-indigo-600">
                Viewing brain for agent: {selectedAgentId}
              </p>
            )}
          </div>
        )}

        {/* Health Status */}
        {health && (
          <div className={`mb-6 p-4 rounded-lg border ${
            health.status === 'healthy' ? 'bg-green-50 border-green-200' :
            health.status === 'degraded' ? 'bg-yellow-50 border-yellow-200' :
            'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                health.status === 'healthy' ? 'bg-green-500' :
                health.status === 'degraded' ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
              <span className="font-medium capitalize">{health.status}</span>
            </div>
            {health.issues.length > 0 && (
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                {health.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'query', label: 'Query', icon: Search },
            { id: 'pages', label: 'Pages', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Brain Type Indicator */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">
                  {viewMode === 'shared' 
                    ? 'Viewing: Shared Brain (all agents)' 
                    : `Viewing: Agent Brain for ${selectedAgentId || 'unknown agent'}`}
                </span>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                title="Total Sources"
                value={stats?.totalSources || 0}
                icon={Database}
                color="blue"
              />
              <StatCard
                title="Wiki Pages"
                value={stats?.totalWikiPages || 0}
                icon={FileText}
                color="green"
              />
              <StatCard
                title="Concepts"
                value={stats?.totalConcepts || 0}
                icon={Brain}
                color="purple"
              />
              <StatCard
                title="Token Savings"
                value={`${((stats?.tokenSavings || 0) / 1000).toFixed(1)}k`}
                icon={BarChart3}
                color="orange"
              />
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Brain Actions</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleInitialize}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Initialize Brain
                </button>
                <button
                  onClick={handleIngest}
                  disabled={isIngesting}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Database className="w-4 h-4" />
                  {isIngesting ? 'Ingesting...' : 'Ingest Sources'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Reset Brain
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Brain Information</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">
                    {manifest?.lastUpdated ? new Date(manifest.lastUpdated).toLocaleString() : 'Never'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Ingest:</span>
                  <span className="font-medium">
                    {stats?.lastIngestTime ? new Date(stats.lastIngestTime).toLocaleString() : 'Never'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-medium">{manifest?.version || 'N/A'}</span>
                </div>
                {selectedAgentId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agent ID:</span>
                    <span className="font-medium">{selectedAgentId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Query Tab */}
        {activeTab === 'query' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Query Brain</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                  placeholder="Search the brain for information..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleQuery}
                  disabled={isQuerying}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Search className="w-4 h-4" />
                  {isQuerying ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {queryResults && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Results</h2>
                  <div className="text-sm text-gray-600">
                    Found {queryResults.pages.length} pages • Saved ~{queryResults.estimatedTokenSavings.toLocaleString()} tokens
                  </div>
                </div>
                <div className="space-y-4">
                  {queryResults.pages.map((page: any, index: number) => (
                    <div key={page.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{page.frontmatter.title}</h3>
                        <span className="text-sm text-gray-500">
                          Relevance: {(queryResults.relevanceScores[index] * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{page.frontmatter.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {page.frontmatter.tags.map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Wiki Pages ({pages?.length || 0})</h2>
            </div>
            <div className="space-y-3">
              {pages?.map((page: any) => (
                <div key={page.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{page.frontmatter.title}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{page.frontmatter.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {page.frontmatter.categories.map((cat: string) => (
                      <span key={cat} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Export/Import</h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Brain
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  Import Brain
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Danger Zone</h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Reset Brain
              </button>
              <p className="mt-2 text-sm text-gray-600">
                This will permanently delete all brain data. This action cannot be undone.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-5 h-5" />
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}

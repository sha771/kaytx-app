import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Upload, 
  Brain, 
  Network, 
  TrendingUp,
  Clock,
  Tag,
  BookOpen,
  Trash2,
  RefreshCw,
  MoreVertical
} from 'lucide-react-native';
import { api } from '@/utils/api';
import { SkillMDFileUpload } from '@/components/skill-md/SkillMDFileUpload';

export default function SkillMDPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<string | undefined>();
  const [showUpload, setShowUpload] = useState(false);

  const { data: skillFiles, isLoading } = api.skillMD.searchSkillFiles.useQuery({
    query: searchQuery,
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    agentId: selectedAgent,
    sortBy: 'created',
    sortOrder: 'desc',
  });

  const { data: stats } = api.skillMD.getSkillFileStats.useQuery(
    { agentId: selectedAgent },
    { enabled: !selectedAgent }
  );

  const { data: agents } = api.aiAgents.getAllAgents.useQuery();

  const deleteMutation = api.skillMD.deleteSkillFile.useMutation();

  const handleDelete = async (skillFileId: string) => {
    if (confirm('Are you sure you want to delete this skill file?')) {
      await deleteMutation.mutateAsync({ skillFileId });
    }
  };

  const categories = [
    { id: 'all', name: 'All Files' },
    { id: 'document', name: 'Documents' },
    { id: 'policy', name: 'Policies' },
    { id: 'procedure', name: 'Procedures' },
    { id: 'training', name: 'Training' },
    { id: 'reference', name: 'Reference' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Skill.md Knowledge Base
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload documents to create AI agent knowledge with automatic markdown conversion and semantic search
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Files</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalFiles}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Processing</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.processingStatus.processing || 0}
                  </p>
                </div>
                <RefreshCw className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Size</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(stats.totalSize / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Avg Relevance</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(stats.avgRelevanceScore * 100).toFixed(0)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Agent Filter */}
            {agents && agents.agents.length > 0 && (
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedAgent || ''}
                  onChange={(e) => setSelectedAgent(e.target.value || undefined)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Agents</option>
                  {agents.agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload className="w-5 h-5" />
              Upload Files
            </button>
          </div>
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Upload Documents
                </h2>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
              <SkillMDFileUpload
                agentId={selectedAgent}
                onUploadComplete={() => setShowUpload(false)}
              />
            </div>
          </div>
        )}

        {/* File List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              Loading files...
            </div>
          ) : skillFiles && skillFiles.files.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {skillFiles.files.map(file => (
                <div key={file.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {file.originalFileName}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(file.processingStatus)}`}>
                          {file.processingStatus}
                        </span>
                      </div>
                      
                      {file.summary && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {file.summary}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(file.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {(file.originalFileSize / 1024).toFixed(1)} KB
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {(parseFloat(file.relevanceScore) * 100).toFixed(0)}% relevance
                        </span>
                        <span className="flex items-center gap-1">
                          <Network className="w-3 h-3" />
                          {file.relatedFileIds.length} related
                        </span>
                      </div>

                      {file.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <Tag className="w-3 h-3 text-gray-400" />
                          <div className="flex flex-wrap gap-1">
                            {file.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                            {file.tags.length > 3 && (
                              <span className="text-xs text-gray-500">+{file.tags.length - 3}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No skill files found. Upload documents to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

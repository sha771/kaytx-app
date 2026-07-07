import React, { useState } from 'react';
import { Search, Sparkles, FileText, ExternalLink, TrendingUp } from 'lucide-react-native';
import { api } from '@/utils/api';

interface SkillMDSemanticSearchProps {
  agentId?: string;
  onResultClick?: (skillFileId: string) => void;
  className?: string;
}

export function SkillMDSemanticSearch({ agentId, onResultClick, className = '' }: SkillMDSemanticSearchProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { data: searchResults, refetch } = api.skillMD.semanticSearchSkillFiles.useQuery(
    { query, agentId, limit: 5 },
    { enabled: false }
  );

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    await refetch();
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search knowledge base using natural language..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          disabled={!query.trim() || isSearching}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      {hasSearched && searchResults && (
        <div className="mt-4 space-y-3">
          {searchResults.files.length > 0 ? (
            <>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Found {searchResults.files.length} relevant documents
              </div>
              {searchResults.files.map((file, index) => (
                <div
                  key={file.id}
                  onClick={() => onResultClick?.(file.id)}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {file.originalFileName}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                      <TrendingUp className="w-3 h-3" />
                      {(searchResults.similarities[index]! * 100).toFixed(0)}% match
                    </div>
                  </div>
                  
                  {file.summary && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {file.summary}
                    </p>
                  )}

                  {file.extractedKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {file.extractedKeywords.slice(0, 4).map(keyword => (
                        <span
                          key={keyword}
                          className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No relevant documents found. Try a different search query.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

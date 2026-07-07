import React, { useState, useMemo } from 'react';
import {
  GitBranch,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Filter,
  Search,
} from 'lucide-react-native';
import type {
  SkillEntry,
  SkillRelation,
  SkillCategory,
} from '../../lib/skill-brain/types';

interface SkillGraphViewProps {
  skills: SkillEntry[];
  relationships: SkillRelation[];
  onSkillClick?: (skillId: string) => void;
  height?: number;
}

const categoryColors: Record<string, string> = {
  technical: '#3B82F6',
  domain: '#10B981',
  process: '#8B5CF6',
  soft_skill: '#EC4899',
  management: '#F97316',
  communication: '#14B8A6',
  tool: '#6366F1',
  framework: '#06B6D4',
  language: '#EAB308',
  platform: '#EF4444',
  business: '#059669',
  compliance: '#6B7280',
  tribal: '#7C3AED',
};

interface GraphNode extends SkillEntry {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface GraphEdge {
  source: string;
  target: string;
  type: string;
  strength: number;
}

export function SkillGraphView({
  skills,
  relationships,
  onSkillClick,
  height = 500,
}: SkillGraphViewProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [zoom, setZoom] = useState(1);

  const filteredSkills = useMemo(() => {
    return skills.filter(s => {
      const matchesSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skills, searchQuery, selectedCategory]);

  const filteredRelationships = useMemo(() => {
    const skillIds = new Set(filteredSkills.map(s => s.id));
    return relationships.filter(
      r => skillIds.has(r.sourceSkillId) && skillIds.has(r.targetSkillId)
    );
  }, [filteredSkills, relationships]);

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.2, 3));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.2, 0.3));
  const handleReset = () => setZoom(1);

  const uniqueCategories = useMemo(
    () => ['all', ...new Set(skills.map(s => s.category))],
    [skills]
  );

  if (skills.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
        <GitBranch className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Skill Graph Data
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Skills and relationships will appear here once they are extracted from content sources.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
            />
          </div>
          <div className="flex items-center gap-1">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>{filteredSkills.length} skills</span>
          <span>{filteredRelationships.length} relationships</span>
          <span>Zoom: {Math.round(zoom * 100)}%</span>
          {selectedSkill && (
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Selected: {skills.find(s => s.id === selectedSkill)?.name}
            </span>
          )}
        </div>
      </div>

      {/* Graph Canvas */}
      <div
        className="relative overflow-hidden"
        style={{ height }}
      >
        {filteredSkills.length > 50 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Too many skills ({filteredSkills.length}) to render in graph view.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Use filters or search to narrow down.
              </p>
            </div>
          </div>
        ) : filteredSkills.length > 0 ? (
          <svg
            width="100%"
            height="100%"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            {/* Edges */}
            {filteredRelationships.map((rel, i) => {
              const source = skills.find(s => s.id === rel.sourceSkillId);
              const target = skills.find(s => s.id === rel.targetSkillId);
              if (!source || !target) return null;

              return (
                <line
                  key={`edge-${i}`}
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke={selectedSkill && (rel.sourceSkillId === selectedSkill || rel.targetSkillId === selectedSkill)
                    ? '#3B82F6' : '#D1D5DB'}
                  strokeWidth={selectedSkill &&
                    (rel.sourceSkillId === selectedSkill || rel.targetSkillId === selectedSkill)
                    ? 2 : 1}
                  opacity={selectedSkill &&
                    (rel.sourceSkillId === selectedSkill || rel.targetSkillId === selectedSkill)
                    ? 1 : 0.3}
                  className="transition-all"
                />
              );
            })}

            {/* Nodes - Simple grid layout */}
            {filteredSkills.map((skill, i) => {
              const cols = Math.ceil(Math.sqrt(filteredSkills.length));
              const row = Math.floor(i / cols);
              const col = i % cols;
              const cellW = 100 / cols;
              const cellH = 100 / Math.ceil(filteredSkills.length / cols);
              const x = col * cellW + cellW / 2;
              const y = row * cellH + cellH / 2;
              const color = categoryColors[skill.category] || '#6B7280';
              const isSelected = selectedSkill === skill.id;
              const radius = isSelected ? 12 : 8;

              return (
                <g
                  key={skill.id}
                  onClick={() => {
                    setSelectedSkill(isSelected ? null : skill.id);
                    onSkillClick?.(skill.id);
                  }}
                  className="cursor-pointer"
                  transform={`translate(${x}%, ${y}%)`}
                >
                  <circle
                    r={radius}
                    fill={color}
                    opacity={isSelected ? 1 : 0.8}
                    stroke={isSelected ? '#fff' : 'none'}
                    strokeWidth={isSelected ? 2 : 0}
                    className="transition-all"
                  />
                  <text
                    textAnchor="middle"
                    dy={radius + 12}
                    fontSize="8"
                    fill={isSelected ? '#111827' : '#6B7280'}
                    className="select-none"
                  >
                    {skill.name.length > 15 ? skill.name.slice(0, 14) + '…' : skill.name}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            No skills match the current filters.
          </div>
        )}
      </div>
    </div>
  );
}

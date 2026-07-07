import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const agents = [
  // CORE ARCHITECTURE INTELLIGENCE (12 agents)
  { id: 'architecture-intelligence-hub', uid: 'ktx-arch-001', title: 'AI Architecture Intelligence Hub - Enterprise', route: '/ai-agent/architecture-design/ai-architecture-intelligence-hub', color: '#8B5CF6', level: 'c_level', efficiency: '95%' },
  { id: 'architecture-strategic-director', uid: 'ktx-arch-002', title: 'AI Strategic Architecture Director', route: '/ai-agent/architecture-design/ai-architecture-strategic-director', color: '#8B5CF6', level: 'vp_director', efficiency: '94%' },
  { id: 'architecture-design-operations', uid: 'ktx-arch-003', title: 'AI Design Operations Manager', route: '/ai-agent/architecture-design/ai-architecture-design-operations', color: '#8B5CF6', level: 'vp_director', efficiency: '93%' },
  { id: 'architecture-technology-innovation', uid: 'ktx-arch-004', title: 'AI Architecture Technology Innovation Lead', route: '/ai-agent/architecture-design/ai-architecture-technology-innovation', color: '#8B5CF6', level: 'vp_director', efficiency: '93%' },
  { id: 'architecture-project-portfolio', uid: 'ktx-arch-005', title: 'AI Project Portfolio Manager', route: '/ai-agent/architecture-design/ai-architecture-project-portfolio', color: '#8B5CF6', level: 'vp_director', efficiency: '92%' },
  { id: 'architecture-quality-assurance', uid: 'ktx-arch-006', title: 'AI Architecture Quality Assurance Director', route: '/ai-agent/architecture-design/ai-architecture-quality-assurance', color: '#8B5CF6', level: 'vp_director', efficiency: '92%' },
  { id: 'architecture-sustainability-lead', uid: 'ktx-arch-007', title: 'AI Sustainability and Green Design Lead', route: '/ai-agent/architecture-design/ai-architecture-sustainability-lead', color: '#8B5CF6', level: 'vp_director', efficiency: '94%' },
  { id: 'architecture-client-relations', uid: 'ktx-arch-008', title: 'AI Client Relations Director', route: '/ai-agent/architecture-design/ai-architecture-client-relations', color: '#8B5CF6', level: 'vp_director', efficiency: '91%' },
  { id: 'architecture-business-development', uid: 'ktx-arch-009', title: 'AI Architecture Business Development', route: '/ai-agent/architecture-design/ai-architecture-business-development', color: '#8B5CF6', level: 'vp_director', efficiency: '90%' },
  { id: 'architecture-talent-management', uid: 'ktx-arch-010', title: 'AI Architecture Talent Manager', route: '/ai-agent/architecture-design/ai-architecture-talent-management', color: '#8B5CF6', level: 'manager', efficiency: '89%' },
  { id: 'architecture-knowledge-management', uid: 'ktx-arch-011', title: 'AI Architecture Knowledge Manager', route: '/ai-agent/architecture-design/ai-architecture-knowledge-management', color: '#8B5CF6', level: 'manager', efficiency: '90%' },
  { id: 'architecture-ai-innovation', uid: 'ktx-arch-012', title: 'AI Architecture Innovation Lab', route: '/ai-agent/architecture-design/ai-architecture-ai-innovation', color: '#8B5CF6', level: 'vp_director', efficiency: '95%' },

  // WEB DESIGN SPECIALIZATION (12 agents)
  { id: 'architecture-web-ux-design-01', uid: 'ktx-arch-web-01', title: 'AI Web UX Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-web-ux-design-01', color: '#06B6D4', level: 'manager', efficiency: '91%' },
  { id: 'architecture-web-ui-design-02', uid: 'ktx-arch-web-02', title: 'AI Web UI Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-web-ui-design-02', color: '#06B6D4', level: 'manager', efficiency: '90%' },
  { id: 'architecture-web-frontend-dev-03', uid: 'ktx-arch-web-03', title: 'AI Frontend Developer', route: '/ai-agent/architecture-design/sub-agents/architecture-web-frontend-dev-03', color: '#06B6D4', level: 'manager', efficiency: '92%' },
  { id: 'architecture-web-fullstack-dev-04', uid: 'ktx-arch-web-04', title: 'AI Full Stack Developer', route: '/ai-agent/architecture-design/sub-agents/architecture-web-fullstack-dev-04', color: '#06B6D4', level: 'manager', efficiency: '93%' },
  { id: 'architecture-web-conversion-05', uid: 'ktx-arch-web-05', title: 'AI Conversion Rate Optimizer', route: '/ai-agent/architecture-design/sub-agents/architecture-web-conversion-05', color: '#06B6D4', level: 'manager', efficiency: '91%' },
  { id: 'architecture-web-accessibility-06', uid: 'ktx-arch-web-06', title: 'AI Web Accessibility Specialist', route: '/ai-agent/architecture-design/sub-agents/architecture-web-accessibility-06', color: '#06B6D4', level: 'manager', efficiency: '89%' },
  { id: 'architecture-web-performance-07', uid: 'ktx-arch-web-07', title: 'AI Web Performance Optimizer', route: '/ai-agent/architecture-design/sub-agents/architecture-web-performance-07', color: '#06B6D4', level: 'manager', efficiency: '92%' },
  { id: 'architecture-web-content-08', uid: 'ktx-arch-web-08', title: 'AI Web Content Strategist', route: '/ai-agent/architecture-design/sub-agents/architecture-web-content-08', color: '#06B6D4', level: 'manager', efficiency: '90%' },
  { id: 'architecture-web-analytics-09', uid: 'ktx-arch-web-09', title: 'AI Web Analytics Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-web-analytics-09', color: '#06B6D4', level: 'manager', efficiency: '91%' },
  { id: 'architecture-web-seo-10', uid: 'ktx-arch-web-10', title: 'AI SEO Specialist', route: '/ai-agent/architecture-design/sub-agents/architecture-web-seo-10', color: '#06B6D4', level: 'manager', efficiency: '90%' },
  { id: 'architecture-web-responsive-11', uid: 'ktx-arch-web-11', title: 'AI Responsive Design Specialist', route: '/ai-agent/architecture-design/sub-agents/architecture-web-responsive-11', color: '#06B6D4', level: 'manager', efficiency: '89%' },
  { id: 'architecture-web-animation-12', uid: 'ktx-arch-web-12', title: 'AI Web Animation Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-web-animation-12', color: '#06B6D4', level: 'manager', efficiency: '88%' },

  // ARCHITECTURAL DESIGN SPECIALIZATION (15 agents)
  { id: 'architecture-design-concept-01', uid: 'ktx-arch-ad-01', title: 'AI Concept Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-design-concept-01', color: '#10B981', level: 'manager', efficiency: '92%' },
  { id: 'architecture-design-schematic-02', uid: 'ktx-arch-ad-02', title: 'AI Schematic Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-design-schematic-02', color: '#10B981', level: 'manager', efficiency: '91%' },
  { id: 'architecture-design-development-03', uid: 'ktx-arch-ad-03', title: 'AI Design Development Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-design-development-03', color: '#10B981', level: 'manager', efficiency: '93%' },
  { id: 'architecture-design-technical-04', uid: 'ktx-arch-ad-04', title: 'AI Technical Architect', route: '/ai-agent/architecture-design/sub-agents/architecture-design-technical-04', color: '#10B981', level: 'manager', efficiency: '92%' },
  { id: 'architecture-design-3d-modeling-05', uid: 'ktx-arch-ad-05', title: 'AI 3D Modeling Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-design-3d-modeling-05', color: '#10B981', level: 'manager', efficiency: '94%' },
  { id: 'architecture-design-rendering-06', uid: 'ktx-arch-ad-06', title: 'AI Rendering Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-design-rendering-06', color: '#10B981', level: 'manager', efficiency: '93%' },
  { id: 'architecture-design-documentation-07', uid: 'ktx-arch-ad-07', title: 'AI Construction Document Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-design-documentation-07', color: '#10B981', level: 'manager', efficiency: '92%' },
  { id: 'architecture-design-specifications-08', uid: 'ktx-arch-ad-08', title: 'AI Specification Writer', route: '/ai-agent/architecture-design/sub-agents/architecture-design-specifications-08', color: '#10B981', level: 'manager', efficiency: '91%' },
  { id: 'architecture-drafting-manager-09', uid: 'ktx-arch-ad-09', title: 'AI Drafting Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-drafting-manager-09', color: '#10B981', level: 'manager', efficiency: '90%' },
  { id: 'architecture-bim-manager-10', uid: 'ktx-arch-ad-10', title: 'AI BIM Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-manager-10', color: '#10B981', level: 'manager', efficiency: '93%' },
  { id: 'architecture-revit-specialist-11', uid: 'ktx-arch-ad-11', title: 'AI Revit Specialist', route: '/ai-agent/architecture-design/sub-agents/architecture-revit-specialist-11', color: '#10B981', level: 'manager', efficiency: '92%' },
  { id: 'architecture-construction-docs-12', uid: 'ktx-arch-ad-12', title: 'AI Construction Documentation Specialist', route: '/ai-agent/architecture-design/sub-agents/architecture-construction-docs-12', color: '#10B981', level: 'manager', efficiency: '91%' },
  { id: 'architecture-permitting-specialist-13', uid: 'ktx-arch-ad-13', title: 'AI Permitting Specialist', route: '/ai-agent/architecture-design/sub-agents/architecture-permitting-specialist-13', color: '#10B981', level: 'manager', efficiency: '89%' },
  { id: 'architecture-code-compliance-14', uid: 'ktx-arch-ad-14', title: 'AI Code Compliance Specialist', route: '/ai-agent/architecture-design/sub-agents/architecture-code-compliance-14', color: '#10B981', level: 'manager', efficiency: '90%' },
  { id: 'architecture-historic-preservation-15', uid: 'ktx-arch-ad-15', title: 'AI Historic Preservation Specialist', route: '/ai-agent/architecture-design/sub-agents/architecture-historic-preservation-15', color: '#10B981', level: 'manager', efficiency: '88%' },

  // INTERIOR DESIGN SPECIALIZATION (12 agents)
  { id: 'architecture-interior-principal-01', uid: 'ktx-arch-id-01', title: 'AI Principal Interior Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-interior-principal-01', color: '#F59E0B', level: 'manager', efficiency: '93%' },
  { id: 'architecture-interior-senior-02', uid: 'ktx-arch-id-02', title: 'AI Senior Interior Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-interior-senior-02', color: '#F59E0B', level: 'manager', efficiency: '92%' },
  { id: 'architecture-interior-manager-03', uid: 'ktx-arch-id-03', title: 'AI Interior Design Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-interior-manager-03', color: '#F59E0B', level: 'manager', efficiency: '91%' },
  { id: 'architecture-space-planner-04', uid: 'ktx-arch-id-04', title: 'AI Space Planner', route: '/ai-agent/architecture-design/sub-agents/architecture-space-planner-04', color: '#F59E0B', level: 'manager', efficiency: '90%' },
  { id: 'architecture-color-consultant-05', uid: 'ktx-arch-id-05', title: 'AI Color Consultant', route: '/ai-agent/architecture-design/sub-agents/architecture-color-consultant-05', color: '#F59E0B', level: 'manager', efficiency: '89%' },
  { id: 'architecture-material-selector-06', uid: 'ktx-arch-id-06', title: 'AI Material Selector', route: '/ai-agent/architecture-design/sub-agents/architecture-material-selector-06', color: '#F59E0B', level: 'manager', efficiency: '90%' },
  { id: 'architecture-furniture-designer-07', uid: 'ktx-arch-id-07', title: 'AI Furniture Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-furniture-designer-07', color: '#F59E0B', level: 'manager', efficiency: '91%' },
  { id: 'architecture-textile-designer-08', uid: 'ktx-arch-id-08', title: 'AI Textile Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-textile-designer-08', color: '#F59E0B', level: 'manager', efficiency: '89%' },
  { id: 'architecture-accessory-designer-09', uid: 'ktx-arch-id-09', title: 'AI Accessory Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-accessory-designer-09', color: '#F59E0B', level: 'manager', efficiency: '88%' },
  { id: 'architecture-lighting-designer-10', uid: 'ktx-arch-id-10', title: 'AI Interior Lighting Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-lighting-designer-10', color: '#F59E0B', level: 'manager', efficiency: '90%' },
  { id: 'architecture-kitchen-designer-11', uid: 'ktx-arch-id-11', title: 'AI Kitchen Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-kitchen-designer-11', color: '#F59E0B', level: 'manager', efficiency: '91%' },
  { id: 'architecture-bathroom-designer-12', uid: 'ktx-arch-id-12', title: 'AI Bathroom Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-bathroom-designer-12', color: '#F59E0B', level: 'manager', efficiency: '90%' },

  // URBAN DESIGN SPECIALIZATION (12 agents)
  { id: 'architecture-urban-principal-01', uid: 'ktx-arch-ud-01', title: 'AI Principal Urban Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-urban-principal-01', color: '#EC4899', level: 'manager', efficiency: '93%' },
  { id: 'architecture-urban-senior-02', uid: 'ktx-arch-ud-02', title: 'AI Senior Urban Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-urban-senior-02', color: '#EC4899', level: 'manager', efficiency: '92%' },
  { id: 'architecture-city-planner-03', uid: 'ktx-arch-ud-03', title: 'AI City Planner', route: '/ai-agent/architecture-design/sub-agents/architecture-city-planner-03', color: '#EC4899', level: 'manager', efficiency: '91%' },
  { id: 'architecture-master-planner-04', uid: 'ktx-arch-ud-04', title: 'AI Master Planner', route: '/ai-agent/architecture-design/sub-agents/architecture-master-planner-04', color: '#EC4899', level: 'manager', efficiency: '92%' },
  { id: 'architecture-infrastructure-planner-05', uid: 'ktx-arch-ud-05', title: 'AI Infrastructure Planner', route: '/ai-agent/architecture-design/sub-agents/architecture-infrastructure-planner-05', color: '#EC4899', level: 'manager', efficiency: '90%' },
  { id: 'architecture-transportation-planner-06', uid: 'ktx-arch-ud-06', title: 'AI Transportation Planner', route: '/ai-agent/architecture-design/sub-agents/architecture-transportation-planner-06', color: '#EC4899', level: 'manager', efficiency: '91%' },
  { id: 'architecture-public-space-designer-07', uid: 'ktx-arch-ud-07', title: 'AI Public Space Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-public-space-designer-07', color: '#EC4899', level: 'manager', efficiency: '90%' },
  { id: 'architecture-streetscape-designer-08', uid: 'ktx-arch-ud-08', title: 'AI Streetscape Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-streetscape-designer-08', color: '#EC4899', level: 'manager', efficiency: '89%' },
  { id: 'architecture-community-planner-09', uid: 'ktx-arch-ud-09', title: 'AI Community Planner', route: '/ai-agent/architecture-design/sub-agents/architecture-community-planner-09', color: '#EC4899', level: 'manager', efficiency: '90%' },
  { id: 'architecture-housing-planner-10', uid: 'ktx-arch-ud-10', title: 'AI Housing Planner', route: '/ai-agent/architecture-design/sub-agents/architecture-housing-planner-10', color: '#EC4899', level: 'manager', efficiency: '91%' },
  { id: 'architecture-economic-developer-11', uid: 'ktx-arch-ud-11', title: 'AI Economic Development Planner', route: '/ai-agent/architecture-design/sub-agents/architecture-economic-developer-11', color: '#EC4899', level: 'manager', efficiency: '89%' },
  { id: 'architecture-environmental-planner-12', uid: 'ktx-arch-ud-12', title: 'AI Environmental Planner', route: '/ai-agent/architecture-design/sub-agents/architecture-environmental-planner-12', color: '#EC4899', level: 'manager', efficiency: '88%' },

  // LANDSCAPE ARCHITECTURE SPECIALIZATION (12 agents)
  { id: 'architecture-landscape-principal-01', uid: 'ktx-arch-la-01', title: 'AI Principal Landscape Architect', route: '/ai-agent/architecture-design/sub-agents/architecture-landscape-principal-01', color: '#22C55E', level: 'manager', efficiency: '93%' },
  { id: 'architecture-landscape-senior-02', uid: 'ktx-arch-la-02', title: 'AI Senior Landscape Architect', route: '/ai-agent/architecture-design/sub-agents/architecture-landscape-senior-02', color: '#22C55E', level: 'manager', efficiency: '92%' },
  { id: 'architecture-site-planner-03', uid: 'ktx-arch-la-03', title: 'AI Site Planner', route: '/ai-agent/architecture-design/sub-agents/architecture-site-planner-03', color: '#22C55E', level: 'manager', efficiency: '91%' },
  { id: 'architecture-planting-designer-04', uid: 'ktx-arch-la-04', title: 'AI Planting Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-planting-designer-04', color: '#22C55E', level: 'manager', efficiency: '90%' },
  { id: 'architecture-hardscape-designer-05', uid: 'ktx-arch-la-05', title: 'AI Hardscape Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-hardscape-designer-05', color: '#22C55E', level: 'manager', efficiency: '91%' },
  { id: 'architecture-irrigation-designer-06', uid: 'ktx-arch-la-06', title: 'AI Irrigation Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-irrigation-designer-06', color: '#22C55E', level: 'manager', efficiency: '90%' },
  { id: 'architecture-lighting-designer-la-07', uid: 'ktx-arch-la-07', title: 'AI Landscape Lighting Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-lighting-designer-la-07', color: '#22C55E', level: 'manager', efficiency: '89%' },
  { id: 'architecture-parks-designer-08', uid: 'ktx-arch-la-08', title: 'AI Parks Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-parks-designer-08', color: '#22C55E', level: 'manager', efficiency: '91%' },
  { id: 'architecture-recreation-designer-09', uid: 'ktx-arch-la-09', title: 'AI Recreation Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-recreation-designer-09', color: '#22C55E', level: 'manager', efficiency: '90%' },
  { id: 'architecture-ecological-designer-10', uid: 'ktx-arch-la-10', title: 'AI Ecological Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-ecological-designer-10', color: '#22C55E', level: 'manager', efficiency: '92%' },
  { id: 'architecture-green-infrastructure-11', uid: 'ktx-arch-la-11', title: 'AI Green Infrastructure Designer', route: '/ai-agent/architecture-design/sub-agents/architecture-green-infrastructure-11', color: '#22C55E', level: 'manager', efficiency: '93%' },
  { id: 'architecture-sustainability-specialist-12', uid: 'ktx-arch-la-12', title: 'AI Sustainable Design Specialist', route: '/ai-agent/architecture-design/sub-agents/architecture-sustainability-specialist-12', color: '#22C55E', level: 'manager', efficiency: '91%' },

  // PROJECT MANAGEMENT SPECIALIZATION (12 agents)
  { id: 'architecture-project-director-01', uid: 'ktx-arch-pm-01', title: 'AI Project Director', route: '/ai-agent/architecture-design/sub-agents/architecture-project-director-01', color: '#6366F1', level: 'manager', efficiency: '94%' },
  { id: 'architecture-senior-project-manager-02', uid: 'ktx-arch-pm-02', title: 'AI Senior Project Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-senior-project-manager-02', color: '#6366F1', level: 'manager', efficiency: '93%' },
  { id: 'architecture-project-manager-03', uid: 'ktx-arch-pm-03', title: 'AI Project Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-project-manager-03', color: '#6366F1', level: 'manager', efficiency: '92%' },
  { id: 'architecture-assistant-project-manager-04', uid: 'ktx-arch-pm-04', title: 'AI Assistant Project Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-assistant-project-manager-04', color: '#6366F1', level: 'manager', efficiency: '91%' },
  { id: 'architecture-scheduler-05', uid: 'ktx-arch-pm-05', title: 'AI Project Scheduler', route: '/ai-agent/architecture-design/sub-agents/architecture-scheduler-05', color: '#6366F1', level: 'manager', efficiency: '90%' },
  { id: 'architecture-cost-estimator-06', uid: 'ktx-arch-pm-06', title: 'AI Cost Estimator', route: '/ai-agent/architecture-design/sub-agents/architecture-cost-estimator-06', color: '#6366F1', level: 'manager', efficiency: '92%' },
  { id: 'architecture-quality-manager-07', uid: 'ktx-arch-pm-07', title: 'AI Quality Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-quality-manager-07', color: '#6366F1', level: 'manager', efficiency: '91%' },
  { id: 'architecture-safety-coordinator-08', uid: 'ktx-arch-pm-08', title: 'AI Safety Coordinator', route: '/ai-agent/architecture-design/sub-agents/architecture-safety-coordinator-08', color: '#6366F1', level: 'manager', efficiency: '90%' },
  { id: 'architecture-contract-manager-09', uid: 'ktx-arch-pm-09', title: 'AI Contract Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-contract-manager-09', color: '#6366F1', level: 'manager', efficiency: '89%' },
  { id: 'architecture-risk-manager-10', uid: 'ktx-arch-pm-10', title: 'AI Risk Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-risk-manager-10', color: '#6366F1', level: 'manager', efficiency: '90%' },
  { id: 'architecture-communication-manager-11', uid: 'ktx-arch-pm-11', title: 'AI Communication Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-communication-manager-11', color: '#6366F1', level: 'manager', efficiency: '88%' },
  { id: 'architecture-document-controller-12', uid: 'ktx-arch-pm-12', title: 'AI Document Controller', route: '/ai-agent/architecture-design/sub-agents/architecture-document-controller-12', color: '#6366F1', level: 'manager', efficiency: '89%' },

  // BIM SPECIALIZATION (13 agents)
  { id: 'architecture-bim-director-01', uid: 'ktx-arch-bim-01', title: 'AI BIM Director', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-director-01', color: '#EF4444', level: 'manager', efficiency: '94%' },
  { id: 'architecture-bim-manager-02', uid: 'ktx-arch-bim-02', title: 'AI BIM Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-manager-02', color: '#EF4444', level: 'manager', efficiency: '93%' },
  { id: 'architecture-bim-coordinator-03', uid: 'ktx-arch-bim-03', title: 'AI BIM Coordinator', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-coordinator-03', color: '#EF4444', level: 'manager', efficiency: '92%' },
  { id: 'architecture-bim-architect-04', uid: 'ktx-arch-bim-04', title: 'AI BIM Architect', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-architect-04', color: '#EF4444', level: 'manager', efficiency: '91%' },
  { id: 'architecture-bim-modeler-05', uid: 'ktx-arch-bim-05', title: 'AI BIM Modeler', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-modeler-05', color: '#EF4444', level: 'manager', efficiency: '90%' },
  { id: 'architecture-bim-analyst-06', uid: 'ktx-arch-bim-06', title: 'AI BIM Analyst', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-analyst-06', color: '#EF4444', level: 'manager', efficiency: '91%' },
  { id: 'architecture-bim-integrator-07', uid: 'ktx-arch-bim-07', title: 'AI BIM Integrator', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-integrator-07', color: '#EF4444', level: 'manager', efficiency: '90%' },
  { id: 'architecture-bim-data-manager-08', uid: 'ktx-arch-bim-08', title: 'AI BIM Data Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-data-manager-08', color: '#EF4444', level: 'manager', efficiency: '89%' },
  { id: 'architecture-bim-standards-manager-09', uid: 'ktx-arch-bim-09', title: 'AI BIM Standards Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-standards-manager-09', color: '#EF4444', level: 'manager', efficiency: '90%' },
  { id: 'architecture-bim-trainer-10', uid: 'ktx-arch-bim-10', title: 'AI BIM Trainer', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-trainer-10', color: '#EF4444', level: 'manager', efficiency: '88%' },
  { id: 'architecture-bim-support-11', uid: 'ktx-arch-bim-11', title: 'AI BIM Support Specialist', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-support-11', color: '#EF4444', level: 'manager', efficiency: '89%' },
  { id: 'architecture-bim-facility-manager-12', uid: 'ktx-arch-bim-12', title: 'AI BIM Facility Manager', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-facility-manager-12', color: '#EF4444', level: 'manager', efficiency: '91%' },
  { id: 'architecture-bim-technology-lead-13', uid: 'ktx-arch-bim-13', title: 'AI BIM Technology Lead', route: '/ai-agent/architecture-design/sub-agents/architecture-bim-technology-lead-13', color: '#EF4444', level: 'manager', efficiency: '93%' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="construction-infrastructure"
      agents={agents}
    />
  );
}

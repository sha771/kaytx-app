const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'app', 'ai-agent');
const educationDir = path.join(baseDir, 'education');
const educationSubDir = path.join(educationDir, 'sub-agents');

// Create directories
if (!fs.existsSync(educationDir)) {
  fs.mkdirSync(educationDir, { recursive: true });
}
if (!fs.existsSync(educationSubDir)) {
  fs.mkdirSync(educationSubDir, { recursive: true });
}

// Icons from lucide-react-native
const icons = [
  'BookOpen', 'GraduationCap', 'Users', 'Monitor', 'Headphones',
  'Video', 'ChartBarBig', 'Target', 'Zap', 'Award',
  'Star', 'Medal', 'Brain', 'Lightbulb', 'MessageSquare',
  'Calendar', 'Clock', 'FileText', 'CheckCircle', 'XCircle',
  'Database', 'Server', 'Cloud', 'Lock', 'Key',
  'Eye', 'Search', 'Filter', 'Sort', 'Sliders',
  'Maximize', 'Minimize', 'Play', 'Pause', 'SkipForward',
  'SkipBack', 'RefreshCw', 'Download', 'Upload', 'Share2'
];

// Education - 12 Main Agents
const mainAgents = [
  {
    id: 'chief-education-officer',
    name: 'AI Chief Education Officer',
    title: 'AI Chief Education Officer',
    description: 'The AI Chief Education Officer oversees all educational strategy, curriculum development, faculty management, and institutional effectiveness for the education organization.',
    capabilities: ['Strategic Planning', 'Curriculum Development', 'Faculty Management', 'Accreditation Compliance', 'Budget Management', 'Technology Integration', 'Student Success', 'Innovation Leadership'],
    icon: 'GraduationCap',
    color: '#1976D2',
    type: 'employee',
    humanCost: '$195k/year',
    aiCost: '$5k/year',
    efficiency: '39x efficiency improvement',
    level: 'executive',
    reportsTo: 'ceo'
  },
  {
    id: 'academic-dean',
    name: 'AI Academic Dean',
    title: 'AI Academic Dean',
    description: 'The AI Academic Dean manages academic programs, faculty affairs, curriculum standards, and educational quality assurance across multiple departments.',
    capabilities: ['Academic Program Management', 'Faculty Affairs', 'Curriculum Standards', 'Quality Assurance', 'Program Accreditation', 'Student Academic Support', 'Research Oversight', 'Department Coordination'],
    icon: 'BookOpen',
    color: '#388E3C',
    type: 'employee',
    humanCost: '$165k/year',
    aiCost: '$4k/year',
    efficiency: '41x efficiency improvement',
    level: 'dean',
    reportsTo: 'chief-education-officer'
  },
  {
    id: 'instructional-designer',
    name: 'AI Instructional Designer',
    title: 'AI Instructional Designer',
    description: 'The AI Instructional Designer creates engaging learning experiences, develops curriculum materials, and applies pedagogical best practices to educational content.',
    capabilities: ['Learning Experience Design', 'Curriculum Development', 'Pedagogical Strategy', 'Content Creation', 'Assessment Design', 'Learning Analytics', 'Accessibility Compliance', 'Multimedia Integration'],
    icon: 'Lightbulb',
    color: '#F57C00',
    type: 'employee',
    humanCost: '$95k/year',
    aiCost: '$2k/year',
    efficiency: '48x efficiency improvement',
    level: 'designer',
    reportsTo: 'academic-dean'
  },
  {
    id: 'learning-management-specialist',
    name: 'AI Learning Management Specialist',
    title: 'AI Learning Management Specialist',
    description: 'The AI Learning Management Specialist manages LMS platforms, oversees course delivery, and ensures optimal learning technology infrastructure.',
    capabilities: ['LMS Administration', 'Course Management', 'User Support', 'System Integration', 'Data Analytics', 'Technical Troubleshooting', 'Platform Optimization', 'Training Delivery'],
    icon: 'Monitor',
    color: '#7B1FA2',
    type: 'employee',
    humanCost: '$85k/year',
    aiCost: '$2k/year',
    efficiency: '43x efficiency improvement',
    level: 'specialist',
    reportsTo: 'chief-education-officer'
  },
  {
    id: 'student-success-coordinator',
    name: 'AI Student Success Coordinator',
    title: 'AI Student Success Coordinator',
    description: 'The AI Student Success Coordinator monitors student progress, provides intervention support, and implements retention strategies to improve learner outcomes.',
    capabilities: ['Student Progress Monitoring', 'Early Intervention', 'Retention Strategies', 'Academic Advising', 'Support Services Coordination', 'Data Analysis', 'Communication Management', 'Success Metrics Tracking'],
    icon: 'Users',
    color: '#0288D1',
    type: 'employee',
    humanCost: '$75k/year',
    aiCost: '$2k/year',
    efficiency: '38x efficiency improvement',
    level: 'coordinator',
    reportsTo: 'academic-dean'
  },
  {
    id: 'assessment-specialist',
    name: 'AI Assessment Specialist',
    title: 'AI Assessment Specialist',
    description: 'The AI Assessment Specialist designs and implements evaluation systems, creates assessment instruments, and analyzes learning outcome data.',
    capabilities: ['Assessment Design', 'Evaluation Systems', 'Learning Outcomes Analysis', 'Test Development', 'Rubric Creation', 'Data Analytics', 'Reporting', 'Quality Assurance'],
    icon: 'CheckCircle',
    color: '#388E3C',
    type: 'employee',
    humanCost: '$85k/year',
    aiCost: '$2k/year',
    efficiency: '43x efficiency improvement',
    level: 'specialist',
    reportsTo: 'academic-dean'
  },
  {
    id: 'educational-technologist',
    name: 'AI Educational Technologist',
    title: 'AI Educational Technologist',
    description: 'The AI Educational Technologist integrates technology into learning environments, trains faculty on edtech tools, and evaluates emerging educational technologies.',
    capabilities: ['EdTech Integration', 'Faculty Training', 'Technology Evaluation', 'System Implementation', 'Technical Support', 'Innovation Research', 'Digital Literacy', 'Platform Management'],
    icon: 'Zap',
    color: '#E91E63',
    type: 'employee',
    humanCost: '$90k/year',
    aiCost: '$2k/year',
    efficiency: '45x efficiency improvement',
    level: 'technologist',
    reportsTo: 'chief-education-officer'
  },
  {
    id: 'curriculum-director',
    name: 'AI Curriculum Director',
    title: 'AI Curriculum Director',
    description: 'The AI Curriculum Director oversees curriculum development across all programs, ensures alignment with standards, and manages curriculum revision processes.',
    capabilities: ['Curriculum Development', 'Standards Alignment', 'Program Coordination', 'Content Review', 'Implementation Planning', 'Stakeholder Collaboration', 'Quality Control', 'Innovation Management'],
    icon: 'FileText',
    color: '#1976D2',
    type: 'employee',
    humanCost: '$115k/year',
    aiCost: '$3k/year',
    efficiency: '38x efficiency improvement',
    level: 'director',
    reportsTo: 'academic-dean'
  },
  {
    id: 'faculty-development-manager',
    name: 'AI Faculty Development Manager',
    title: 'AI Faculty Development Manager',
    description: 'The AI Faculty Development Manager designs professional development programs, supports faculty growth, and implements teaching excellence initiatives.',
    capabilities: ['Professional Development', 'Faculty Support', 'Teaching Excellence', 'Program Design', 'Mentorship Coordination', 'Evaluation Systems', 'Resource Management', 'Best Practices Implementation'],
    icon: 'Award',
    color: '#FF9800',
    type: 'employee',
    humanCost: '$95k/year',
    aiCost: '$2k/year',
    efficiency: '48x efficiency improvement',
    level: 'manager',
    reportsTo: 'academic-dean'
  },
  {
    id: 'research-educator',
    name: 'AI Research Educator',
    title: 'AI Research Educator',
    description: 'The AI Research Educator facilitates educational research, supports evidence-based teaching practices, and promotes scholarly activity among faculty.',
    capabilities: ['Research Facilitation', 'Evidence-Based Practice', 'Scholarly Support', 'Data Analysis', 'Publication Support', 'Grant Assistance', 'Collaboration Building', 'Methodology Guidance'],
    icon: 'Brain',
    color: '#673AB7',
    type: 'employee',
    humanCost: '$105k/year',
    aiCost: '$3k/year',
    efficiency: '35x efficiency improvement',
    level: 'educator',
    reportsTo: 'academic-dean'
  },
  {
    id: 'online-learning-director',
    name: 'AI Online Learning Director',
    title: 'AI Online Learning Director',
    description: 'The AI Online Learning Director manages digital learning programs, oversees online course delivery, and ensures quality in virtual education environments.',
    capabilities: ['Online Program Management', 'Digital Course Delivery', 'Virtual Learning Quality', 'Platform Oversight', 'Student Support', 'Faculty Support', 'Technology Integration', 'Accessibility Compliance'],
    icon: 'Video',
    color: '#00BCD4',
    type: 'employee',
    humanCost: '$125k/year',
    aiCost: '$3k/year',
    efficiency: '42x efficiency improvement',
    level: 'director',
    reportsTo: 'chief-education-officer'
  },
  {
    id: 'student-affairs-director',
    name: 'AI Student Affairs Director',
    title: 'AI Student Affairs Director',
    description: 'The AI Student Affairs Director oversees student services, manages extracurricular programs, and supports holistic student development outside the classroom.',
    capabilities: ['Student Services Management', 'Extracurricular Programs', 'Student Development', 'Crisis Intervention', 'Community Building', 'Policy Enforcement', 'Resource Coordination', 'Wellness Support'],
    icon: 'Star',
    color: '#E91E63',
    type: 'employee',
    humanCost: '$110k/year',
    aiCost: '$3k/year',
    efficiency: '37x efficiency improvement',
    level: 'director',
    reportsTo: 'chief-education-officer'
  }
];

// Education - 36 Sub-Agents
const subAgents = [
  { id: 'course-content-creator', name: 'AI Course Content Creator', description: 'Creates educational content and learning materials for courses.' },
  { id: 'quiz-generator', name: 'AI Quiz Generator', description: 'Automatically generates quizzes and assessments from course content.' },
  { id: 'grading-assistant', name: 'AI Grading Assistant', description: 'Assists with automated grading and feedback generation.' },
  { id: 'plagiarism-detector', name: 'AI Plagiarism Detector', description: 'Detects plagiarism in student submissions and assignments.' },
  { id: 'attendance-tracker', name: 'AI Attendance Tracker', description: 'Tracks and manages student attendance records.' },
  { id: 'gradebook-manager', name: 'AI Gradebook Manager', description: 'Manages gradebooks and calculates student grades.' },
  { id: 'learning-analytics', name: 'AI Learning Analytics', description: 'Analyzes learning patterns and student performance data.' },
  { id: 'personalized-tutor', name: 'AI Personalized Tutor', description: 'Provides personalized tutoring and learning support.' },
  { id: 'study-guide-generator', name: 'AI Study Guide Generator', description: 'Generates study guides and summary materials.' },
  { id: 'discussion-moderator', name: 'AI Discussion Moderator', description: 'Moderates online discussion forums and class discussions.' },
  { id: 'assignment-planner', name: 'AI Assignment Planner', description: 'Helps plan and schedule assignments and deadlines.' },
  { id: 'resource-recommender', name: 'AI Resource Recommender', description: 'Recommends learning resources based on student needs.' },
  { id: 'accessibility-auditor', name: 'AI Accessibility Auditor', description: 'Ensures educational content meets accessibility standards.' },
  { id: 'caption-generator', name: 'AI Caption Generator', description: 'Generates captions for video lectures and content.' },
  { id: 'translation-service', name: 'AI Translation Service', description: 'Translates educational content into multiple languages.' },
  { id: 'virtual-lab-assistant', name: 'AI Virtual Lab Assistant', description: 'Assists with virtual laboratory simulations and exercises.' },
  { id: 'simulation-creator', name: 'AI Simulation Creator', description: 'Creates educational simulations and interactive scenarios.' },
  { id: 'adaptive-learning-engine', name: 'AI Adaptive Learning Engine', description: 'Adjusts learning paths based on student performance.' },
  { id: 'knowledge-assessment', name: 'AI Knowledge Assessment', description: 'Assesses student knowledge gaps and learning needs.' },
  { id: 'peer-matching', name: 'AI Peer Matching', description: 'Matches students for peer learning and collaboration.' },
  { id: 'project-evaluator', name: 'AI Project Evaluator', description: 'Evaluates student projects and provides detailed feedback.' },
  { id: 'portfolio-manager', name: 'AI Portfolio Manager', description: 'Manages student portfolios and achievement tracking.' },
  { id: 'certification-manager', name: 'AI Certification Manager', description: 'Manages certifications and credentialing processes.' },
  { id: 'compliance-monitor', name: 'AI Compliance Monitor', description: 'Monitors compliance with educational regulations and standards.' },
  { id: 'data-privacy-officer', name: 'AI Data Privacy Officer', description: 'Ensures student data privacy and protection compliance.' },
  { id: 'enrollment-assistant', name: 'AI Enrollment Assistant', description: 'Assists with student enrollment and registration processes.' },
  { id: 'financial-aid-bot', name: 'AI Financial Aid Bot', description: 'Helps students navigate financial aid options.' },
  { id: 'career-counselor', name: 'AI Career Counselor', description: 'Provides career guidance and counseling services.' },
  { id: 'alumni-coordinator', name: 'AI Alumni Coordinator', description: 'Manages alumni relations and networking opportunities.' },
  { id: 'event-planner', name: 'AI Event Planner', description: 'Plans and coordinates educational events and activities.' },
  { id: 'library-assistant', name: 'AI Library Assistant', description: 'Assists with library resource management and discovery.' },
  { id: 'research-assistant', name: 'AI Research Assistant', description: 'Assists with educational research and literature reviews.' },
  { id: 'survey-analyst', name: 'AI Survey Analyst', description: 'Analyzes course evaluations and student surveys.' },
  { id: 'communication-bot', name: 'AI Communication Bot', description: 'Manages student communications and notifications.' },
  { id: 'scheduling-assistant', name: 'AI Scheduling Assistant', description: 'Assists with class scheduling and room assignments.' },
  { id: 'help-desk', name: 'AI Help Desk', description: 'Provides technical support for students and faculty.' }
];

function generateAgentFile(agent, isSubAgent = false) {
  const icon = isSubAgent ? icons[Math.floor(Math.random() * icons.length)] : agent.icon;
  
  let content = `import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ${icon} } from 'lucide-react-native';

export default function ${agent.name.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  const agent = {
    id: '${agent.id}',
    name: '${agent.name}',
    title: '${agent.title || agent.name}',
    description: '${agent.description}',
    capabilities: ${JSON.stringify(agent.capabilities || ['Task Automation', 'Data Processing', 'Workflow Management'])},
    icon: ${icon},
    color: '${agent.color}',
    type: '${agent.type || 'agent'}' as const,
    humanCost: '${agent.humanCost || '$50k/year'}',
    aiCost: '${agent.aiCost || '$1k/year'}',
    efficiency: '${agent.efficiency || '50x efficiency improvement'}',
    replacesRole: '${agent.id}'`;

  if (agent.level) {
    content += `,
    hierarchy: {
      department: 'Education',
      level: '${agent.level}',
      reportsTo: '${agent.reportsTo || 'chief-education-officer'}'`;
    if (agent.manages) {
      content += `,
      manages: ${JSON.stringify(agent.manages)}`;
    }
    content += `
    }`;
  } else {
    content += `,
    hierarchy: {
      department: 'Education'`;
    if (agent.reportsTo) {
      content += `,
      reportsTo: '${agent.reportsTo}'`;
    }
    content += `
    }`;
  }

  content += `,
    infrastructure: {
      status: 'online',
      health: ${95 + Math.floor(Math.random() * 5)},
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: '${agent.level === 'executive' || agent.level === 'dean' ? 'enterprise' : 'standard'}',
    },
    roiMetrics: {
      savingsPerMonth: '$${Math.floor(Math.random() * 10) + 1},${Math.floor(Math.random() * 900) + 100}',
      tasksAutomatedDaily: ${Math.floor(Math.random() * 500) + 500},
      responseTime: '${(Math.random() * 2 + 0.5).toFixed(1)}s',
      accuracyRate: '${(Math.random() * 3 + 96).toFixed(1)}%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
`;

  return content;
}

// Generate main agents
mainAgents.forEach((agent, index) => {
  const fileName = `${agent.id}.tsx`;
  const filePath = path.join(educationDir, fileName);
  fs.writeFileSync(filePath, generateAgentFile(agent));
  console.log(`Created: ${fileName}`);
});

// Generate sub-agents
subAgents.forEach((agent, index) => {
  const fileName = `${agent.id}.tsx`;
  const filePath = path.join(educationSubDir, fileName);
  fs.writeFileSync(filePath, generateAgentFile(agent, true));
  console.log(`Created: sub-agents/${fileName}`);
});

console.log('\nEducation department created successfully!');
console.log(`- ${mainAgents.length} main agents`);
console.log(`- ${subAgents.length} sub-agents`);

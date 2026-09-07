export interface CircularLayoutNode {
  id: string;
  label: string;
  type: 'root' | 'department' | 'agent' | 'employee' | 'sub_agent';
  position: { x: number; y: number };
  children?: CircularLayoutNode[];
  color?: string;
  metadata?: Record<string, unknown>;
}

export interface CircularKnowledgeGraphLayout {
  root: CircularLayoutNode;
  departmentNodes: CircularLayoutNode[];
  agentNodes: CircularLayoutNode[];
  subAgentNodes: CircularLayoutNode[];
}

export function buildCircularKnowledgeGraphLayout(
  nodes: CircularLayoutNode[],
  viewport: { width: number; height: number }
): CircularKnowledgeGraphLayout {
  const root = nodes.find((node) => node.type === 'root') ?? nodes[0];
  if (!root) {
    return { root: { id: 'empty', label: 'Empty', type: 'root', position: { x: 0, y: 0 } }, departmentNodes: [], agentNodes: [], subAgentNodes: [] };
  }

  const center = { x: viewport.width / 2, y: viewport.height / 2 };
  root.position = { x: center.x, y: center.y };

  const departmentNodes: CircularLayoutNode[] = [];
  const agentNodes: CircularLayoutNode[] = [];
  const subAgentNodes: CircularLayoutNode[] = [];

  const children = root.children ?? [];
  const departmentCount = Math.max(children.length, 1);
  const radius = Math.min(viewport.width, viewport.height) * 0.24;
  const startAngle = -Math.PI / 2;

  children.forEach((department, index) => {
    const angle = startAngle + (index / departmentCount) * Math.PI * 2;
    const x = center.x + Math.cos(angle) * radius;
    const y = center.y + Math.sin(angle) * radius;

    const positionedDepartment = {
      ...department,
      position: { x, y },
    };

    departmentNodes.push(positionedDepartment);

    const departmentChildren = department.children ?? [];
    departmentChildren.forEach((agent, agentIndex) => {
      const agentAngle = angle + (agentIndex - (departmentChildren.length - 1) / 2) * 0.18;
      const agentRadius = radius + 110;
      const agentX = center.x + Math.cos(agentAngle) * agentRadius;
      const agentY = center.y + Math.sin(agentAngle) * agentRadius;

      const positionedAgent = {
        ...agent,
        position: { x: agentX, y: agentY },
      };
      agentNodes.push(positionedAgent);

      const subAgents = agent.children ?? [];
      subAgents.forEach((subAgent, subIndex) => {
        const subAngle = agentAngle + (subIndex - (subAgents.length - 1) / 2) * 0.06;
        const subRadius = agentRadius + 70;
        const subX = center.x + Math.cos(subAngle) * subRadius;
        const subY = center.y + Math.sin(subAngle) * subRadius;
        subAgentNodes.push({
          ...subAgent,
          position: { x: subX, y: subY },
        });
      });
    });
  });

  return { root, departmentNodes, agentNodes, subAgentNodes };
}

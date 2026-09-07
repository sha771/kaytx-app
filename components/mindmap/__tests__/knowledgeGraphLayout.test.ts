import { buildCircularKnowledgeGraphLayout } from '../knowledgeGraphLayout';

describe('buildCircularKnowledgeGraphLayout', () => {
  it('places the root node at the center and distributes departments around the ring', () => {
    const nodes = [
      { id: 'root', label: 'Root', type: 'root' as const, position: { x: 0, y: 0 } },
      { id: 'dept-1', label: 'Finance', type: 'department' as const, position: { x: 0, y: 0 } },
      { id: 'dept-2', label: 'Ops', type: 'department' as const, position: { x: 0, y: 0 } },
      { id: 'dept-3', label: 'Tech', type: 'department' as const, position: { x: 0, y: 0 } },
    ];

    const layout = buildCircularKnowledgeGraphLayout(nodes, { width: 900, height: 600 });

    expect(layout.root.position.x).toBeCloseTo(450);
    expect(layout.root.position.y).toBeCloseTo(300);
    expect(layout.departmentNodes).toHaveLength(3);
    expect(layout.departmentNodes[0].position.x).toBeGreaterThan(layout.root.position.x);
  });
});

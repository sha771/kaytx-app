import { z } from "zod";
import { permissionProcedure } from "../../../create-context";
import { Permission } from "../../../../lib/rbac";

export default permissionProcedure(Permission.TEAM_MEMBERS_READ)
  .input(z.object({ 
    department: z.string().optional(),
    status: z.enum(['active', 'inactive', 'all']).optional()
  }))
  .query(({ input }) => {
    console.log('[Team] Fetching members', input);
    
    const members = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        role: 'Senior Developer',
        department: 'engineering',
        status: 'active',
        avatar: 'SJ',
        joinDate: '2022-03-15',
        projects: 8,
        performance: 95
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        role: 'Marketing Manager',
        department: 'marketing',
        status: 'active',
        avatar: 'MC',
        joinDate: '2021-11-20',
        projects: 12,
        performance: 92
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@company.com',
        role: 'UX Designer',
        department: 'design',
        status: 'active',
        avatar: 'ER',
        joinDate: '2023-01-10',
        projects: 6,
        performance: 88
      }
    ];

    let filtered = members;
    
    if (input.department) {
      filtered = filtered.filter(m => m.department === input.department);
    }
    
    if (input.status && input.status !== 'all') {
      filtered = filtered.filter(m => m.status === input.status);
    }

    return {
      members: filtered,
      total: filtered.length,
      departments: ['engineering', 'marketing', 'design', 'sales', 'hr'],
      stats: {
        totalMembers: members.length,
        activeMembers: members.filter(m => m.status === 'active').length,
        avgPerformance: members.reduce((sum, m) => sum + m.performance, 0) / members.length
      }
    };
  });

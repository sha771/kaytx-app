/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 *
 * Skill Brain API Routes
 * Exposes skill.md data to the dashboard and frontend components.
 * Every route returns data extracted from the skill.md files generated
 * by the ingestion hooks in document-processor and ingestion services.
 */

import { Hono } from 'hono';
import { z } from 'zod';
import { skillBrainService } from '../../services/skill-brain-service';
import type { RouteContext } from './route-types';

const skillBrainRouter = new Hono<{ Variables: RouteContext['env']['Variables'] }>();

type AppContext = RouteContext;

/**
 * GET /api/skill-brain/stats
 * Returns overall Skill Brain statistics
 */
skillBrainRouter.get('/stats', async (c: AppContext) => {
  try {
    const stats = skillBrainService.getStatistics();
    return c.json({ success: true, stats });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to get Skill Brain stats' }, 500);
  }
});

/**
 * GET /api/skill-brain/skills
 * Returns all skills across the system
 */
skillBrainRouter.get('/skills', async (c: AppContext) => {
  try {
    const category = c.req.query('category');
    const competency = c.req.query('competency');
    const search = c.req.query('search');

    let skills = skillBrainService.getAllSkills();

    if (category) {
      skills = skills.filter(s => s.category === category);
    }
    if (competency) {
      skills = skills.filter(s => s.competencyLevel === competency);
    }
    if (search) {
      skills = skills.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      );
    }

    return c.json({ success: true, skills, total: skills.length });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to get skills' }, 500);
  }
});

/**
 * GET /api/skill-brain/skills/at-risk
 * Returns all at-risk skills (expert-level, undocumented/unverified)
 */
skillBrainRouter.get('/skills/at-risk', async (c: AppContext) => {
  try {
    const skills = skillBrainService.getAtRiskSkills();
    return c.json({ success: true, skills, total: skills.length });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to get at-risk skills' }, 500);
  }
});

/**
 * GET /api/skill-brain/skills/transfer-ready
 * Returns all transfer-ready skills
 */
skillBrainRouter.get('/skills/transfer-ready', async (c: AppContext) => {
  try {
    const skills = skillBrainService.getTransferReadySkills();
    return c.json({ success: true, skills, total: skills.length });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to get transfer-ready skills' }, 500);
  }
});

/**
 * GET /api/skill-brain/skills/:id
 * Returns a specific skill by ID
 */
skillBrainRouter.get('/skills/:id', async (c: AppContext) => {
  try {
    const id = c.req.param('id');
    const allSkills = skillBrainService.getAllSkills();
    const skill = allSkills.find(s => s.id === id);
    if (!skill) {
      return c.json({ success: false, error: 'Skill not found' }, 404);
    }
    return c.json({ success: true, skill });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to get skill' }, 500);
  }
});

/**
 * GET /api/skill-brain/people/:email
 * Returns skill profile for a person
 */
skillBrainRouter.get('/people/:email', async (c: AppContext) => {
  try {
    const email = c.req.param('email');
    const skills = skillBrainService.getPersonSkills(email);
    const stats = skillBrainService.getStatistics();
    return c.json({
      success: true,
      email,
      totalSkills: skills.length,
      skills,
      departmentCoverage: Object.entries(stats.peopleByDepartment),
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to get person profile' }, 500);
  }
});

/**
 * GET /api/skill-brain/departments/:name/coverage
 * Returns department skill coverage
 */
skillBrainRouter.get('/departments/:name/coverage', async (c: AppContext) => {
  try {
    const name = c.req.param('name');
    const coverage = skillBrainService.getDepartmentCoverage(name);
    return c.json({ success: true, coverage });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to get department coverage' }, 500);
  }
});

/**
 * POST /api/skill-brain/transfer-plan
 * Creates a skill transfer plan for a departing employee
 */
skillBrainRouter.post('/transfer-plan', async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const schema = z.object({
      personId: z.string().min(1),
      personName: z.string().min(1),
      targetPersonId: z.string().optional(),
      targetPersonName: z.string().optional(),
    });

    const { personId, personName, targetPersonId, targetPersonName } = schema.parse(body);
    const plan = skillBrainService.createTransferPlan(personId, personName, targetPersonId, targetPersonName);

    return c.json({ success: true, plan });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ success: false, error: error.issues }, 400);
    }
    return c.json({ success: false, error: 'Failed to create transfer plan' }, 500);
  }
});

/**
 * GET /api/skill-brain/health
 * Returns Skill Brain system health
 */
skillBrainRouter.get('/health', async (c: AppContext) => {
  try {
    const health = skillBrainService.getHealth();
    return c.json({ success: true, ...health });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to get health' }, 500);
  }
});

/**
 * GET /api/skill-brain/export
 * Exports all Skill Brain data
 */
skillBrainRouter.get('/export', async (c: AppContext) => {
  try {
    const data = await skillBrainService.export();
    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to export' }, 500);
  }
});

export default skillBrainRouter;

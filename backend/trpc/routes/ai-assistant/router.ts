import { createTRPCRouter } from '../../create-context';
import { chatProcedure } from './chat/route';
import { tasksRouter } from './tasks';
import { meetingsRouter } from './meetings';
import { memoriesRouter } from './memories';

export const aiAssistantRouter = createTRPCRouter({
    chat: chatProcedure,
    tasks: tasksRouter,
    meetings: meetingsRouter,
    memories: memoriesRouter,
});

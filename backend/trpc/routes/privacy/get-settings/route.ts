import { protectedProcedure } from '../../../create-context';
import { getDefaultPrivacySettings } from '../../../../lib/privacy';

export default protectedProcedure.query(({ ctx }) => {
  console.log('[Privacy] Fetching privacy settings for user:', ctx.user.id);
  
  const settings = getDefaultPrivacySettings(ctx.user.id);
  
  return {
    success: true,
    settings,
  };
});

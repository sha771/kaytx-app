import { createTRPCReact } from "@trpc/react-query";
import { httpLink } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";
import { secureStorage } from '@/utils/security';

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }

  throw new Error(
    "No base url found, please set EXPO_PUBLIC_RORK_API_BASE_URL"
  );
};

export const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      async headers() {
        const [token, csrfToken, sessionId] = await Promise.all([
          secureStorage.getItem('@auth_token'),
          secureStorage.getItem('@csrf_token'),
          secureStorage.getItem('@session_id'),
        ]);

        return {
          authorization: token ? `Bearer ${token}` : '',
          'x-csrf-token': csrfToken ?? '',
          'x-session-id': sessionId ?? '',
        };
      },
    }),
  ],
});

import fc from 'fast-check';

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'test-jwt-secret';
}
if (!process.env.JWT_REFRESH_SECRET) {
  process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret';
}

const numRunsEnv = process.env.FC_NUM_RUNS ? Number(process.env.FC_NUM_RUNS) : undefined;
const seedEnv = process.env.FC_SEED ? Number(process.env.FC_SEED) : undefined;

const numRuns = Number.isFinite(numRunsEnv) && (numRunsEnv as number) > 0 ? (numRunsEnv as number) : 100;
const seed = Number.isFinite(seedEnv) ? (seedEnv as number) : undefined;

beforeAll(() => {
  fc.configureGlobal({
    numRuns,
    ...(typeof seed === 'number' ? { seed } : {}),
    verbose: 2,
  });
});

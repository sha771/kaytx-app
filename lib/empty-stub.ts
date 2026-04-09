// Empty stub for Node.js modules not available in web environments
export default {};
export const exec = () => ({ stdout: '', stderr: '' });
export const execSync = () => Buffer.from('');
export const spawn = () => ({ on: () => {}, stdout: { on: () => {} }, stderr: { on: () => {} } });

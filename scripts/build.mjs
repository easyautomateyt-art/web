/**
 * Production build pipeline:
 *   1. _vitebuild  -> client bundle into dist/
 *   2. _ssrbuild   -> server bundle (entry-server) into dist-server/
 *   3. prerender   -> static HTML per route + sitemap.xml into dist/
 *
 * ROLLUP_SKIP_NODEJS_NATIVE keeps rollup on its JS implementation, which is
 * required in this environment.
 */
import { spawnSync } from 'node:child_process';

process.env.ROLLUP_SKIP_NODEJS_NATIVE = 'true';

const steps = ['_vitebuild', '_ssrbuild', 'prerender'];

for (const step of steps) {
  console.log(`\n▶ npm run ${step}`);
  const res = spawnSync('npm', ['run', step], {
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
  if (res.status !== 0) {
    console.error(`\n✖ build step "${step}" failed (exit ${res.status}).`);
    process.exit(res.status ?? 1);
  }
}

console.log('\n✓ build complete.');

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import AppShell from './AppShell';

export { ALL_PATHS, ROUTES, LANGS, SITE_URL } from './i18n/routes';

/**
 * Render a single route to an HTML string + collected <head> tags.
 * Used by scripts/prerender.mjs to generate static HTML per route.
 */
export function render(location: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={location}>
          <AppShell />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
  return { html, helmet: helmetContext.helmet };
}

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/client/overview/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <OverviewAnalyticsView />;
}
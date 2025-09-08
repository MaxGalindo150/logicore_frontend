import { CONFIG } from 'src/config-global';

import { OverviewOperatorView } from 'src/sections/operator/overview/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Panel de Operador - ${CONFIG.site.name}` };

export default function Page() {
  return <OverviewOperatorView />;
}
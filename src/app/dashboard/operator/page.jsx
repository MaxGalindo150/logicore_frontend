import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Panel de Operador - ${CONFIG.site.name}` };

export default function OperatorDashboardPage() {
  return <BlankView title="Panel de Operador - LogiCore" />;
}
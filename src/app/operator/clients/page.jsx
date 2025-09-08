import { CONFIG } from 'src/config-global';

import { ClientListView } from 'src/sections/operator/clients/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Clientes - ${CONFIG.site.name}` };

export default function Page() {
  return <ClientListView />;
}
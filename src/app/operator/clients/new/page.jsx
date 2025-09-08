import { CONFIG } from 'src/config-global';

import { ClientCreateView } from 'src/sections/operator/clients/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Crear Cliente - ${CONFIG.site.name}` };

export default function Page() {
  return <ClientCreateView />;
}
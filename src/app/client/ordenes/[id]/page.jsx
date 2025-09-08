import { CONFIG } from 'src/config-global';

import { OrderDetailsView } from 'src/sections/client/order/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Orden - ${CONFIG.site.name}` };

export default function Page({ params }) {
  const { id } = params;

  return <OrderDetailsView id={id} />;
}
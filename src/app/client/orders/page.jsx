import { CONFIG } from 'src/config-global';

import { OrderListView } from 'src/sections/client/order/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Órdenes - ${CONFIG.site.name}` };

export default function Page() {
  return <OrderListView />;
}
import { CONFIG } from 'src/config-global';

import { OrderListView } from 'src/sections/operator/orders/view/order-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Órdenes - ${CONFIG.site.name}` };

export default function Page() {
  return <OrderListView />;
}
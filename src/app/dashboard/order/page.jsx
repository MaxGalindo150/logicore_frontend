import { CONFIG } from 'src/config-global';
import { _orders } from 'src/_mock';

import { OrderDetailsView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Order details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  // Usar la primera orden como ejemplo para el MVP
  const mockOrder = _orders[0];
  
  return <OrderDetailsView order={mockOrder} />;
}

import { _ordersList } from 'src/_mock';

import { OrderDetailsView } from 'src/sections/operator/orders/view/order-details-view';

// ----------------------------------------------------------------------

export const metadata = { title: 'Detalle de Orden' };

export default async function Page({ params }) {
  const { id } = await params;

  const order = _ordersList.find((order) => order.id === id);

  return <OrderDetailsView order={order} />;
}
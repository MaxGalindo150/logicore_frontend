import { ClientProductsView } from 'src/sections/operator/clients/view/client-products-view';

// ----------------------------------------------------------------------

export const metadata = { title: 'Productos del Cliente' };

export default async function Page({ params }) {
  const { id } = await params;

  return <ClientProductsView id={id} />;
}
import { CONFIG } from 'src/config-global';

import { ProductDetailsView } from 'src/sections/client/product/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Producto - ${CONFIG.site.name}` };

export default function Page({ params }) {
  const { id } = params;

  return <ProductDetailsView id={id} />;
}
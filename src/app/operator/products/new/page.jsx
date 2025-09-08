import { CONFIG } from 'src/config-global';

import { ProductCreateView } from 'src/sections/operator/products/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Crear Producto - ${CONFIG.site.name}` };

export default function Page() {
  return <ProductCreateView />;
}
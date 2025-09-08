import { CONFIG } from 'src/config-global';

import { ProductListView } from 'src/sections/client/product/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Productos - ${CONFIG.site.name}` };

export default function Page() {
  return <ProductListView />;
}
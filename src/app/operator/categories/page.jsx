import { CONFIG } from 'src/config-global';

import { CategoriesView } from 'src/sections/operator/categories/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Categorias - ${CONFIG.site.name}` };

export default function Page() {
  return <CategoriesView />;
}
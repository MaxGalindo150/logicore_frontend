import { CONFIG } from 'src/config-global';

import { ProductEditView } from 'src/sections/operator/products/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Editar Producto - ${CONFIG.site.name}` };

export default function Page(props) {
  const { params } = props;

  return <ProductEditView id={params.id} />;
}
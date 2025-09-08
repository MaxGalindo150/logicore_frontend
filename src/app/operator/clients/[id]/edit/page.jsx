import { CONFIG } from 'src/config-global';

import { ClientEditView } from 'src/sections/operator/clients/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Editar Cliente - ${CONFIG.site.name}` };

export default function Page(props) {
  const { params } = props;

  return <ClientEditView id={params.id} />;
}
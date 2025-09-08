import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  analytics: icon('ic-analytics'),
  user: icon('ic-user'),
  client: <Iconify icon="solar:users-group-two-rounded-bold" />,
  product: <Iconify icon="solar:box-bold" />,
};

// ----------------------------------------------------------------------

export const operatorNavData = [
  /**
   * Panel de Operador
   */
  {
    subheader: 'Panel de Operador',
    items: [
      { 
        title: 'Centro de Control', 
        path: paths.dashboard.operator, 
        icon: ICONS.dashboard 
      },
    ],
  },
  
  /**
   * Gestión
   */
  {
    subheader: 'Gestión',
    items: [
      {
        title: 'Clientes',
        path: paths.operator.clients.root,
        icon: ICONS.client,
        children: [
          { title: 'Listado', path: paths.operator.clients.root },
          { title: 'Crear cliente', path: paths.operator.clients.new },
        ],
      },
      {
        title: 'Productos',
        path: paths.operator.products.root,
        icon: ICONS.product,
        children: [
          { title: 'Listado', path: paths.operator.products.root },
          { title: 'Crear producto', path: paths.operator.products.new },
        ],
      },
    ],
  },
];
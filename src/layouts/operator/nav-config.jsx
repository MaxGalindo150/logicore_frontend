import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  analytics: icon('ic-analytics'),
  user: icon('ic-user'),
  order: icon('ic-order'),
  product: icon('ic-product'),
  category: icon('ic-folder'),
};

// ----------------------------------------------------------------------

export const operatorNavData = [
  /**
   * Panel de Operador
   */
  {
    subheader: 'Panel de Control',
    items: [
      { 
        title: 'Centro de Control', 
        path: paths.operator.root, 
        icon: ICONS.dashboard 
      },
      { 
        title: 'Clientes', 
        path: paths.operator.clients.root, 
        icon: ICONS.user 
      },
      { 
        title: 'Productos', 
        path: paths.operator.products.root, 
        icon: ICONS.product 
      },
      {
        title: 'Órdenes',
        path: paths.operator.orders.root,
        icon: ICONS.order
      },
      {
        title: 'Categorías',
        path: paths.operator.categories.root,
        icon: ICONS.category
      },
    ],
  },
];
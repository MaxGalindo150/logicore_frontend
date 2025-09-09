import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  order: icon('ic-order'),
  product: icon('ic-product'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const clientNavData = [
  /**
   * Cliente LogiCore
   */
  {
    subheader: 'Mi Panel',
    items: [
      { title: 'Dashboard', path: paths.client.root, icon: ICONS.analytics },
      {
        title: 'Productos',
        path: paths.client.products.root,
        icon: ICONS.product,
      },
      {
        title: 'Órdenes',
        path: paths.client.orders.root,
        icon: ICONS.order,
      },
    ],
  },
];
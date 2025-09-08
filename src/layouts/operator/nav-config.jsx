import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  analytics: icon('ic-analytics'),
  user: icon('ic-user'),
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
    ],
  },
];
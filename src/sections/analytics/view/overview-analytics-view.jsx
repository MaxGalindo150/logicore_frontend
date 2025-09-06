'use client';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import {
  _analyticTasks,
  _analyticPosts,
  _analyticTraffic,
  _analyticOrderTimeline,
} from 'src/_mock';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Dashboard LogiCore 📦
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Productos"
            percent={5.2}
            total={8420}
            icon={
              <img alt="icon" src={`${CONFIG.site.basePath}/assets/icons/glass/ic-glass-bag.svg`} />
            }
            chart={{
              categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
              series: [7800, 7950, 8100, 8050, 8200, 8350, 8280, 8420],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Ingresos Mes"
            percent={12.5}
            total={450}
            color="success"
            icon={
              <img
                alt="icon"
                src={`${CONFIG.site.basePath}/assets/icons/glass/ic-glass-users.svg`}
              />
            }
            chart={{
              categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
              series: [280, 320, 350, 380, 400, 420, 435, 450],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Salidas Mes"
            percent={8.3}
            total={380}
            color="warning"
            icon={
              <img alt="icon" src={`${CONFIG.site.basePath}/assets/icons/glass/ic-glass-buy.svg`} />
            }
            chart={{
              categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
              series: [250, 290, 310, 340, 360, 370, 375, 380],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Stock Crítico"
            percent={-15.2}
            total={12}
            color="error"
            icon={
              <img
                alt="icon"
                src={`${CONFIG.site.basePath}/assets/icons/glass/ic-glass-message.svg`}
              />
            }
            chart={{
              categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
              series: [25, 22, 18, 15, 14, 13, 12, 12],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Inventario por Categoría"
            subheader="Distribución de productos"
            chart={{
              series: [
                { label: 'Electrónicos', value: 2800 },
                { label: 'Ropa', value: 2200 },
                { label: 'Hogar', value: 1800 },
                { label: 'Deportes', value: 1100 },
                { label: 'Otros', value: 520 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Movimiento de Inventario"
            subheader="Entradas vs Salidas mensuales"
            chart={{
              categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
              series: [
                { name: 'Productos Ingresados', data: [280, 320, 350, 380, 400, 420, 435, 450] },
                { name: 'Productos Despachados', data: [250, 290, 310, 340, 360, 370, 375, 380] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Rotación por Categoría"
            subheader="Productos más y menos activos"
            chart={{
              categories: ['Electrónicos', 'Ropa', 'Hogar', 'Deportes', 'Otros'],
              series: [
                { name: 'Entradas', data: [120, 95, 75, 45, 25] },
                { name: 'Salidas', data: [110, 88, 70, 42, 22] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentSubject
            title="Performance Semanal"
            chart={{
              categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
              series: [
                { name: 'Ingresos', data: [65, 70, 80, 75, 85, 45] },
                { name: 'Salidas', data: [55, 65, 70, 68, 78, 40] },
                { name: 'Stock Crítico', data: [5, 8, 3, 6, 2, 1] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Actividad Reciente" list={_analyticOrderTimeline} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite title="Clientes Principales" list={_analyticTraffic} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTasks title="Productos Stock Crítico" list={_analyticTasks} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}

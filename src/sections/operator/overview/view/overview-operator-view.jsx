'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export function OverviewOperatorView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack spacing={3} sx={{ py: 3 }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Centro de Control - LogiCore
        </Typography>

        <Card sx={{ p: 5, textAlign: 'center', minHeight: 400 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
              Panel de Operador
            </Typography>
            
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
              Bienvenido al sistema de operaciones de LogiCore.
              Desde aquí podrás gestionar todos los aspectos del negocio.
            </Typography>

            <Box
              sx={{
                p: 4,
                bgcolor: 'grey.50',
                borderRadius: 2,
                border: '2px dashed',
                borderColor: 'grey.300'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                🚧 Sistema en Desarrollo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Las funcionalidades del operador están siendo desarrolladas.
                Próximamente tendrás acceso completo a:
              </Typography>
              
              <Stack spacing={1} sx={{ mt: 2, textAlign: 'left', maxWidth: 400, mx: 'auto' }}>
                <Typography variant="body2">📊 Dashboard con métricas operacionales</Typography>
                <Typography variant="body2">👥 Gestión completa de usuarios y clientes</Typography>
                <Typography variant="body2">📦 Control avanzado de inventarios</Typography>
                <Typography variant="body2">🚛 Administración de órdenes y entregas</Typography>
                <Typography variant="body2">📈 Reportes y análisis detallados</Typography>
                <Typography variant="body2">⚙️ Configuración del sistema</Typography>
              </Stack>
            </Box>
          </Box>
        </Card>
      </Stack>
    </Container>
  );
}
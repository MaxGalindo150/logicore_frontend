import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function OrderDetailsItems({
  items = [],
  totalWeight,
  destination,
  // volume,
}) {
  const renderLogisticsInfo = (
    <Stack spacing={1.5} alignItems="flex-end" sx={{ p: 2.5, textAlign: 'right', typography: 'body2' }}>
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Destino</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{destination || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Peso Total</Box>
        <Box sx={{ width: 160, typography: 'subtitle2', color: 'info.main' }}>
          {totalWeight ? `${totalWeight} kg` : '-'}
        </Box>
      </Stack>

      {/* <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Volumen Estimado</Box>
        <Box sx={{ width: 160, typography: 'subtitle2', color: 'warning.main' }}>
          {volume ? `${volume} m³` : '-'}
        </Box>
      </Stack> */}

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Total Items</div>
        <Box sx={{ width: 160 }}>{items.length || 0}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Card>
      <CardHeader
        title="Productos de la Orden"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />

      <Scrollbar>
        {items.map((item) => (
          <Stack
            key={item.id}
            direction="row"
            alignItems="center"
            sx={{
              p: 2,
              minWidth: 640,
              borderBottom: (theme) => `dashed 2px ${theme.vars.palette.background.neutral}`,
            }}
          >
            <Avatar variant="rounded" sx={{ width: 48, height: 48, mr: 2 }}>
              {item.name.charAt(0).toUpperCase()}
            </Avatar>

            <ListItemText
              primary={item.name}
              secondary={`SKU: ${item.sku} | Ubicación: ${item.warehouseLocation}`}
              primaryTypographyProps={{ typography: 'body2' }}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
                mt: 0.5,
              }}
            />

            <Box sx={{ typography: 'body2' }}>x{item.quantity}</Box>

            <Box sx={{ width: 110, textAlign: 'right' }}>
              <Typography variant="subtitle2" sx={{ color: 'info.main' }}>
                {((item.quantity || 0) * 0.5).toFixed(1)} kg
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                peso aprox.
              </Typography>
            </Box>
          </Stack>
        ))}
      </Scrollbar>

      {renderLogisticsInfo}
    </Card>
  );
}
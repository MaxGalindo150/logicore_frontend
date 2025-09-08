import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function OrderDetailsInfo({ customer, delivery, shippingAddress, notes }) {
  const renderCustomer = (
    <>
      <CardHeader 
        title="Información del Cliente"
        action={
          <IconButton size="small">
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack direction="row" sx={{ p: 2.5 }}>
        <Avatar sx={{ width: 48, height: 48, mr: 2 }}>
          {customer?.company?.charAt(0).toUpperCase()}
        </Avatar>

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{customer?.company}</Typography>
          <Box sx={{ color: 'text.secondary' }}>Contacto: {customer?.name}</Box>
          <Box sx={{ color: 'text.secondary' }}>{customer?.email}</Box>
          <Box sx={{ color: 'text.secondary' }}>Tel: {customer?.phoneNumber}</Box>
        </Stack>
      </Stack>
    </>
  );

  const renderDelivery = (
    <>
      <CardHeader title="Información de Envío" />
      <Stack spacing={1.5} sx={{ p: 2.5, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Transportista
          </Box>
          {delivery?.shipBy || 'Por asignar'}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Tipo
          </Box>
          {delivery?.speedy || 'Estándar'}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            No. Seguimiento
          </Box>
          {delivery?.trackingNumber ? (
            <Link underline="always" color="inherit">
              {delivery.trackingNumber}
            </Link>
          ) : (
            <Box sx={{ color: 'text.disabled' }}>Por generar</Box>
          )}
        </Stack>
      </Stack>
    </>
  );

  const renderShipping = (
    <>
      <CardHeader title="Dirección de Entrega" />
      <Stack spacing={1.5} sx={{ p: 2.5, typography: 'body2' }}>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Dirección
          </Box>
          {shippingAddress?.fullAddress}
        </Stack>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Contacto
          </Box>
          {shippingAddress?.contactPerson}
        </Stack>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Teléfono
          </Box>
          {shippingAddress?.phoneNumber}
        </Stack>
      </Stack>
    </>
  );

  const renderNotes = notes && (
    <>
      <CardHeader title="Notas Adicionales" />
      <Stack sx={{ p: 3, typography: 'body2' }}>
        <Box sx={{ 
          p: 2, 
          bgcolor: 'background.neutral', 
          borderRadius: 1,
          fontStyle: 'italic' 
        }}>
          {notes}
        </Box>
      </Stack>
    </>
  );

  return (
    <Stack spacing={3}>
      <Card>{renderCustomer}</Card>
      
      <Card>{renderDelivery}</Card>
      
      <Card>{renderShipping}</Card>
      
      {renderNotes && <Card>{renderNotes}</Card>}

      <Card>
        <CardHeader title="Acciones Rápidas" />
        <Stack spacing={2} sx={{ p: 3 }}>
          <Button 
            variant="outlined" 
            startIcon={<Iconify icon="solar:phone-bold" />}
            fullWidth
          >
            Contactar Cliente
          </Button>
          
          <Button 
            variant="outlined" 
            startIcon={<Iconify icon="solar:map-point-bold" />}
            fullWidth
          >
            Ver en Mapa
          </Button>
          
          <Button 
            variant="contained" 
            startIcon={<Iconify icon="solar:truck-bold" />}
            fullWidth
          >
            Asignar Transportista
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}
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

export function OrderDetailsInfo({ customer, delivery, payment, shippingAddress }) {
  // const renderCustomer = (
  //   <>
  //     <CardHeader title="Información del Cliente" />
  //     <Stack direction="row" sx={{ p: 3 }}>
  //       <Avatar
  //         alt={customer?.name}
  //         src={customer?.avatarUrl}
  //         sx={{ width: 48, height: 48, mr: 2 }}
  //       />

  //       <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
  //         <Typography variant="subtitle2">{customer?.name}</Typography>
  //         <Box sx={{ color: 'text.secondary' }}>{customer?.email}</Box>
  //         <Box sx={{ color: 'text.secondary' }}>Tel: {shippingAddress?.phoneNumber}</Box>
  //       </Stack>
  //     </Stack>
  //   </>
  // );

  const renderDelivery = (
    <>
      <CardHeader title="Información de Envío" />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Transportista
          </Box>
          LogiCore Express
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Tipo
          </Box>
          Envío Estándar
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            No. Seguimiento
          </Box>
          <Link underline="always" color="inherit">
            LC{delivery?.trackingNumber || '2024001234'}
          </Link>
        </Stack>
      </Stack>
    </>
  );

  const renderShipping = (
    <>
      <CardHeader title="Dirección de Entrega" />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Dirección
          </Box>
          {shippingAddress?.fullAddress}
        </Stack>
      </Stack>
    </>
  );

  const renderPayment = (
    <>
      <CardHeader title="Método de Pago" />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Tarjeta
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {payment?.cardNumber}
            <Iconify icon="logos:mastercard" width={24} />
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Estado
          </Box>
          <Box sx={{ color: 'success.main', fontWeight: 'medium' }}>Pagado</Box>
        </Stack>
      </Stack>
    </>
  );

  return (
    <Card>
      {/* {renderCustomer}

      <Divider sx={{ borderStyle: 'dashed' }} /> */}

      {renderDelivery}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderShipping}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderPayment}
    </Card>
  );
}

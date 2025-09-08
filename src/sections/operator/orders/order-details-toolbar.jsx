import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

import { RouterLink } from 'src/routes/components';

import { fDateTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function OrderDetailsToolbar({
  status,
  backLink,
  createdAt,
  orderNumber,
  statusOptions,
  onChangeStatus,
}) {
  const statusColor = {
    pendiente: 'warning',
    'en-proceso': 'info',
    'en-transito': 'primary',
    completada: 'success',
    cancelada: 'error',
  };

  const statusLabel = {
    pendiente: 'Pendiente',
    'en-proceso': 'En Proceso',
    'en-transito': 'En Tránsito',
    completada: 'Completada',
    cancelada: 'Cancelada',
  };

  return (
    <>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
        <Stack spacing={1} direction="row" alignItems="flex-start">
          <IconButton component={RouterLink} href={backLink}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography variant="h4"> Orden {orderNumber} </Typography>
              
              <FormControl size="small">
                <Select
                  value={status}
                  onChange={(e) => onChangeStatus(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: `${statusColor[status] || 'default'}.main`,
                    },
                    '& .MuiSelect-select': {
                      backgroundColor: `${statusColor[status] || 'default'}.lighter`,
                      color: `${statusColor[status] || 'default'}.darker`,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      py: 0.75,
                      px: 1.5,
                    },
                  }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {fDateTime(createdAt)}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
          >
            Imprimir
          </Button>

          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:pen-bold" />}
          >
            Editar Orden
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
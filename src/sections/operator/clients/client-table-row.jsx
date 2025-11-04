import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

export function ClientTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onViewProducts, onViewOrders }) {
  const confirm = useBoolean();

  const statusColor = {
    activo: 'success',
    inactivo: 'error',
    suspendido: 'warning',
  };

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', fontFamily: 'monospace', fontWeight: 600 }}>
          {row.clientId}
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.company}>{row.company.charAt(0).toUpperCase()}</Avatar>

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onViewProducts} sx={{ cursor: 'pointer', fontWeight: 600 }}>
                {row.company}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.city}, {row.state}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack spacing={0.5}>
            <Typography variant="body2">
              {row.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {row.email}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.phoneNumber}</TableCell>

        <TableCell>
          <Stack spacing={0.5}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {row.productsStored}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {row.mainProductType}
            </Typography>
          </Stack>
        </TableCell>

        {/* <TableCell>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'info.main' }}>
            {row.storageVolume} m³
          </Typography>
        </TableCell> */}

        <TableCell>
          <Label
            variant="soft"
            color={statusColor[row.status] || 'default'}
          >
            {row.status === 'activo' && 'Activo'}
            {row.status === 'inactivo' && 'Inactivo'}
            {row.status === 'suspendido' && 'Suspendido'}
          </Label>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Tooltip title="Ver productos" placement="top" arrow>
              <IconButton
                color="info"
                onClick={onViewProducts}
              >
                <Iconify icon="solar:box-bold" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Ver órdenes" placement="top" arrow>
              <IconButton
                color="primary"
                onClick={onViewOrders}
              >
                <Iconify icon="solar:clipboard-list-bold" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Editar cliente" placement="top" arrow>
              <IconButton
                color="default"
                onClick={onEditRow}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Eliminar cliente" placement="top" arrow>
              <IconButton
                color="error"
                onClick={confirm.onTrue}
              >
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Eliminar Cliente"
        content={`¿Estás seguro de que deseas eliminar el cliente ${row.company}?`}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Eliminar
          </Button>
        }
      />
    </>
  );
}
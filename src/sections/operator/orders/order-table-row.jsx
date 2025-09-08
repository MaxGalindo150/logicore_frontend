import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';

import { useState } from 'react';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow, onViewClientOrders, onUpdateStatus }) {
  const confirm = useBoolean();
  const collapse = useBoolean();
  const statusConfirm = useBoolean();
  const [newStatus, setNewStatus] = useState(null);

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

  const statusOptions = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'en-proceso', label: 'En Proceso' },
    { value: 'en-transito', label: 'En Tránsito' },
    { value: 'completada', label: 'Completada' },
    { value: 'cancelada', label: 'Cancelada' },
  ];

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    if (selectedStatus !== row.status) {
      setNewStatus(selectedStatus);
      statusConfirm.onTrue();
    }
  };

  const handleStatusConfirm = () => {
    if (newStatus && onUpdateStatus) {
      onUpdateStatus(row.id, newStatus);
    }
    setNewStatus(null);
    statusConfirm.onFalse();
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>

      <TableCell>
        <Link color="inherit" onClick={onViewRow} underline="always" sx={{ cursor: 'pointer' }}>
          {row.orderNumber}
        </Link>
      </TableCell>

      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar alt={row.customer.name}>{row.customer.name.charAt(0).toUpperCase()}</Avatar>

          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Link 
              color="inherit" 
              onClick={() => onViewClientOrders?.(row.customer.id)} 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {row.customer.name}
            </Link>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.customer.email}
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <ListItemText
          primary={fDate(row.createdAt)}
          secondary={fTime(row.createdAt)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell align="center"> {row.totalQuantity} </TableCell>

      <TableCell>
        <Box component="span" sx={{ fontWeight: 500 }}>
          {row.destination}
        </Box>
      </TableCell>

      <TableCell align="center">
        <Box component="span" sx={{ fontWeight: 600, color: 'info.main' }}>
          {row.totalWeight} kg
        </Box>
      </TableCell>

      <TableCell>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={row.status}
            onChange={handleStatusChange}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: `${statusColor[row.status] || 'default'}.main`,
              },
              '& .MuiSelect-select': {
                backgroundColor: `${statusColor[row.status] || 'default'}.lighter`,
                color: `${statusColor[row.status] || 'default'}.darker`,
                fontWeight: 600,
                fontSize: '0.875rem',
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
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>

        <Tooltip title="Ver detalle" placement="top" arrow>
          <IconButton color="default" onClick={onViewRow}>
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Paper sx={{ m: 1.5 }}>
            {row.items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                  },
                }}
              >
                <Avatar
                  src={item.coverUrl}
                  variant="rounded"
                  sx={{ width: 48, height: 48, mr: 2 }}
                >
                  {item.name.charAt(0).toUpperCase()}
                </Avatar>

                <ListItemText
                  primary={item.name}
                  secondary={item.sku}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                    mt: 0.5,
                  }}
                />

                <div>x{item.quantity} </div>

                <Box sx={{ width: 110, textAlign: 'right' }}>{fCurrency(item.price)}</Box>
              </Stack>
            ))}
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}
      {renderSecondary}

      <ConfirmDialog
        open={statusConfirm.value}
        onClose={() => {
          setNewStatus(null);
          statusConfirm.onFalse();
        }}
        title="Cambiar Estado de Orden"
        content={
          <>
            ¿Estás seguro de que deseas cambiar el estado de la orden{' '}
            <strong>{row.orderNumber}</strong> a{' '}
            <strong>{statusLabel[newStatus]}</strong>?
          </>
        }
        action={
          <Button variant="contained" color="primary" onClick={handleStatusConfirm}>
            Confirmar
          </Button>
        }
      />
    </>
  );
}
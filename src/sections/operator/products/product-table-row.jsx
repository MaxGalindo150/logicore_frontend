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

export function ProductTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();

  const statusColor = {
    activo: 'success',
    descontinuado: 'warning',
    agotado: 'error',
  };

  const categoryColor = {
    electronicos: 'info',
    alimentos: 'success',
    textiles: 'warning',
    herramientas: 'error',
    cosmeticos: 'secondary',
    autopartes: 'primary',
    muebles: 'default',
    deportes: 'info',
    juguetes: 'secondary',
    libros: 'default',
  };

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap', fontFamily: 'monospace', fontWeight: 600 }}>
          {row.productId}
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.name}>{row.name.charAt(0).toUpperCase()}</Avatar>

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
                {row.name}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                SKU: {row.sku}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {row.clientName}
          </Typography>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={categoryColor[row.category] || 'default'}
          >
            {row.category}
          </Label>
        </TableCell>

        <TableCell>
          <Stack spacing={0.5}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                color: row.currentStock <= row.minStock ? 'error.main' : 'text.primary'
              }}
            >
              {row.currentStock}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {row.unit}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'monospace', 
              fontWeight: 600,
              color: 'info.main'
            }}
          >
            {row.warehouseLocation}
          </Typography>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={statusColor[row.status] || 'default'}
          >
            {row.status === 'activo' && 'Activo'}
            {row.status === 'descontinuado' && 'Descontinuado'}
            {row.status === 'agotado' && 'Agotado'}
          </Label>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Tooltip title="Editar producto" placement="top" arrow>
              <IconButton
                color="default"
                onClick={onEditRow}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Eliminar producto" placement="top" arrow>
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
        title="Eliminar Producto"
        content={`¿Estás seguro de que deseas eliminar el producto ${row.name}?`}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Eliminar
          </Button>
        }
      />
    </>
  );
}
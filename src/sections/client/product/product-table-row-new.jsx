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
import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

export function ProductTableRow({ row, selected, onSelectRow, onDeleteRow, onViewRow }) {
  const confirm = useBoolean();

  const statusColor = {
    'in stock': 'success',
    'low stock': 'warning',
    'out of stock': 'error',
  };

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.name}>{row.name.charAt(0).toUpperCase()}</Avatar>

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onViewRow} sx={{ cursor: 'pointer' }}>
                {row.name}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.category}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {row.description || 'Descripción del producto'}
          </Typography>
        </TableCell>

        <TableCell>
          <Stack spacing={0.5}>
            <Box component="span">{fDate(row.createdAt)}</Box>
            <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
              {fTime(row.createdAt)}
            </Box>
          </Stack>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={statusColor[row.inventoryType] || 'default'}
          >
            {row.inventoryType}
          </Label>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Tooltip title="Ver producto" placement="top" arrow>
              <IconButton
                color="default"
                onClick={onViewRow}
              >
                <Iconify icon="solar:eye-bold" />
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
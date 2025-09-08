import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// Removido SERVICE_TYPE_OPTIONS import

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ClientTableFiltersResult({ filters, onResetFilters, totalResults, ...other }) {
  const handleRemoveSearch = useCallback(() => {
    filters.setState({ search: '' });
  }, [filters]);

  const handleRemoveStatus = useCallback(() => {
    filters.setState({ status: 'all' });
  }, [filters]);

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{totalResults}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          resultados encontrados
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters.state.search && (
          <Block label="Búsqueda:">
            <Chip size="small" label={filters.state.search} onDelete={handleRemoveSearch} />
          </Block>
        )}

        {filters.state.status !== 'all' && (
          <Block label="Estado:">
            <Chip 
              size="small" 
              label={
                filters.state.status === 'activo' ? 'Activo' :
                filters.state.status === 'inactivo' ? 'Inactivo' :
                filters.state.status === 'suspendido' ? 'Suspendido' :
                filters.state.status
              } 
              onDelete={handleRemoveStatus} 
            />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Limpiar filtro
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Block({ label, children, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
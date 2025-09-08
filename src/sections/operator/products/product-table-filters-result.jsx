import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { WAREHOUSE_PRODUCT_CATEGORY_OPTIONS, WAREHOUSE_PRODUCT_STATUS_OPTIONS } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ProductTableFiltersResult({
  filters,
  onResetFilters,
  totalResults,
  sx,
  ...other
}) {
  const shortLabel = (filters.state.search.length > 20) 
    ? `${filters.state.search.substring(0, 20)}...` 
    : filters.state.search;

  const getCategoryLabel = (value) => {
    const category = WAREHOUSE_PRODUCT_CATEGORY_OPTIONS.find(option => option.value === value);
    return category ? category.label : value;
  };

  const getStatusLabel = (value) => {
    const status = WAREHOUSE_PRODUCT_STATUS_OPTIONS.find(option => option.value === value);
    return status ? status.label : value;
  };

  return (
    <Stack spacing={1.5} sx={{ ...sx }} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{totalResults}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          resultados encontrados
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {!!filters.state.search && (
          <Block label="Búsqueda:">
            <Chip
              size="small"
              label={shortLabel}
              onDelete={() => filters.setState({ search: '' })}
            />
          </Block>
        )}

        {filters.state.status !== 'all' && (
          <Block label="Estado:">
            <Chip
              size="small"
              label={getStatusLabel(filters.state.status)}
              onDelete={() => filters.setState({ status: 'all' })}
            />
          </Block>
        )}

        {filters.state.category !== 'all' && (
          <Block label="Categoría:">
            <Chip
              size="small"
              label={getCategoryLabel(filters.state.category)}
              onDelete={() => filters.setState({ category: 'all' })}
            />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-minimalistic-bold" />}
        >
          Limpiar todo
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
      <Box sx={{ typography: 'subtitle2' }}>{label}</Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { WAREHOUSE_PRODUCT_CATEGORY_OPTIONS } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const CATEGORY_OPTIONS = [{ value: 'all', label: 'Todas las categorías' }, ...WAREHOUSE_PRODUCT_CATEGORY_OPTIONS];

export function ProductTableToolbar({ filters, onResetFilters }) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      filters.setState({ search: event.target.value });
    },
    [filters]
  );

  const handleFilterCategory = useCallback(
    (newValue) => {
      filters.setState({ category: newValue });
      popover.onClose();
    },
    [filters, popover]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5 }}
      >
        <Box
          sx={{
            width: { xs: 1, md: 240 },
          }}
        >
          <TextField
            fullWidth
            value={filters.state.search}
            onChange={handleFilterName}
            placeholder="Buscar productos..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <Box
            sx={{
              width: { xs: 1, md: 200 },
            }}
          >
            <TextField
              fullWidth
              select
              label="Categoría"
              value={filters.state.category}
              onChange={(event) => handleFilterCategory(event.target.value)}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: { maxHeight: 240 },
                  },
                },
              }}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Tooltip title="Más filtros">
            <IconButton onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem onClick={onResetFilters}>
            <Iconify icon="solar:restart-bold" />
            Limpiar filtros
          </MenuItem>

          <MenuItem
            onClick={() => {
              // Aquí podrías agregar más funcionalidades como exportar
              popover.onClose();
            }}
          >
            <Iconify icon="solar:export-bold" />
            Exportar
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
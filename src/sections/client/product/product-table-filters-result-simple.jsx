import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { sentenceCase } from 'src/utils/change-case';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function ProductTableFiltersResult({ filters, totalResults, sx }) {
  const handleRemoveSearch = useCallback(() => {
    filters.setState({ search: '' });
  }, [filters]);

  const handleRemoveStock = useCallback(() => {
    filters.setState({ stock: 'all' });
  }, [filters]);

  const handleResetFilters = useCallback(() => {
    filters.setState({
      search: '',
      stock: 'all'
    });
  }, [filters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleResetFilters} sx={sx}>
      <FiltersBlock label="Búsqueda:" isShow={!!filters.state.search}>
        <Chip
          {...chipProps}
          key="search"
          label={filters.state.search}
          onDelete={handleRemoveSearch}
        />
      </FiltersBlock>

      <FiltersBlock label="Stock:" isShow={filters.state.stock !== 'all'}>
        <Chip
          {...chipProps}
          key="stock"
          label={sentenceCase(filters.state.stock)}
          onDelete={handleRemoveStock}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}
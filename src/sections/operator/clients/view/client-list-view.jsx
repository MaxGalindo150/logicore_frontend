'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { varAlpha } from 'src/theme/styles';
import { _clientsList, CLIENT_STATUS_OPTIONS } from 'src/_mock';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { ClientTableRow } from '../client-table-row';
import { ClientTableToolbar } from '../client-table-toolbar';
import { ClientTableFiltersResult } from '../client-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'Todos' }, ...CLIENT_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'clientId', label: 'ID', width: 100 },
  { id: 'company', label: 'Empresa', width: 250 },
  { id: 'name', label: 'Cliente', width: 220 },
  { id: 'phoneNumber', label: 'Teléfono', width: 180 },
  { id: 'productsStored', label: 'Productos', width: 120 },
  { id: 'storageVolume', label: 'Volumen (m³)', width: 150 },
  { id: 'status', label: 'Estado', width: 100 },
  { id: '', width: 130 },
];

// ----------------------------------------------------------------------

export function ClientListView() {
  const table = useTable();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_clientsList);

  const filters = useSetState({ 
    search: '', 
    status: 'all' 
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.search ||
    filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      toast.success('Cliente eliminado correctamente');
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    toast.success('Clientes eliminados correctamente');
    setTableData(deleteRows);
    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.operator.clients.edit(id));
    },
    [router]
  );

  const handleViewProducts = useCallback(
    (id) => {
      router.push(paths.operator.clients.products(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  return (
    <>
      <Box maxWidth="xl" sx={{ p: 3 }}>
        <CustomBreadcrumbs
          heading="Clientes"
          links={[
            { name: 'Panel de Control', href: paths.operator.root },
            { name: 'Clientes', href: paths.operator.clients.root },
            { name: 'Listado' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.operator.clients.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Nuevo Cliente
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={filters.state.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === 'activo' && 'success') ||
                      (tab.value === 'suspendido' && 'warning') ||
                      (tab.value === 'inactivo' && 'error') ||
                      'default'
                    }
                  >
                    {['activo', 'suspendido', 'inactivo'].includes(tab.value)
                      ? tableData.filter((client) => client.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <ClientTableToolbar
            filters={filters}
            onResetFilters={() => {
              filters.setState({
                search: '',
                status: 'all',
              });
            }}
          />

          {canReset && (
            <ClientTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetFilters={() => {
                filters.setState({
                  search: '',
                  status: 'all',
                });
              }}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Eliminar">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <ClientTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onViewProducts={() => handleViewProducts(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </Box>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Eliminar clientes"
        content={
          <>
            ¿Estás seguro de que deseas eliminar{' '}
            <strong> {table.selected.length} </strong> elementos?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Eliminar
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { search, status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (search) {
    inputData = inputData.filter(
      (client) =>
        client.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        client.company.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        client.email.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        client.clientId.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((client) => client.status === status);
  }

  return inputData;
}
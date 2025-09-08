import { z as zod } from 'zod';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { 
  WAREHOUSE_PRODUCT_STATUS_OPTIONS, 
  WAREHOUSE_PRODUCT_CATEGORY_OPTIONS,
  UNIT_OPTIONS,
  _clientsList
} from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const ProductSchema = zod.object({
  name: zod.string().min(1, { message: 'Nombre del producto es requerido!' }),
  description: zod.string().min(1, { message: 'Descripción es requerida!' }),
  category: zod.string().min(1, { message: 'Categoría es requerida!' }),
  sku: zod.string().min(1, { message: 'SKU es requerido!' }),
  clientId: zod.object({
    id: zod.string(),
    label: zod.string(),
    company: zod.string(),
    name: zod.string()
  }).nullable().refine((val) => val !== null, { message: 'Cliente propietario es requerido!' }),
  // Dimensiones
  length: zod.string().min(1, { message: 'Largo es requerido!' }),
  width: zod.string().min(1, { message: 'Ancho es requerido!' }),
  height: zod.string().min(1, { message: 'Alto es requerido!' }),
  weight: zod.string().min(1, { message: 'Peso es requerido!' }),
  unit: zod.string().min(1, { message: 'Unidad de medida es requerida!' }),
  // Stock
  currentStock: zod.string().min(1, { message: 'Stock actual es requerido!' }),
  minStock: zod.string().min(1, { message: 'Stock mínimo es requerido!' }),
  maxStock: zod.string().min(1, { message: 'Stock máximo es requerido!' }),
  warehouseLocation: zod.string().min(1, { message: 'Ubicación en almacén es requerida!' }),
  // Campos opcionales
  status: zod.string(),
});

// ----------------------------------------------------------------------

export function ProductNewEditForm({ currentProduct, prefilledClient = null }) {
  const router = useRouter();

  const clientOptions = useMemo(() => 
    _clientsList.map(client => ({
      id: client.id,
      label: `${client.company} - ${client.name}`,
      company: client.company,
      name: client.name
    })), []
  );

  const defaultValues = useMemo(
    () => ({
      status: currentProduct?.status || 'activo',
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      category: currentProduct?.category || '',
      sku: currentProduct?.sku || '',
      clientId: currentProduct 
        ? clientOptions.find(c => c.id === currentProduct.clientId) || null 
        : prefilledClient || null,
      length: currentProduct?.length ? String(currentProduct.length) : '',
      width: currentProduct?.width ? String(currentProduct.width) : '',
      height: currentProduct?.height ? String(currentProduct.height) : '',
      weight: currentProduct?.weight ? String(currentProduct.weight) : '',
      unit: currentProduct?.unit || '',
      currentStock: currentProduct?.currentStock ? String(currentProduct.currentStock) : '',
      minStock: currentProduct?.minStock ? String(currentProduct.minStock) : '',
      maxStock: currentProduct?.maxStock ? String(currentProduct.maxStock) : '',
      warehouseLocation: currentProduct?.warehouseLocation || '',
    }),
[currentProduct, clientOptions, prefilledClient]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(ProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      reset();
      toast.success(currentProduct ? 'Producto actualizado!' : 'Producto creado exitosamente!');
      router.push(paths.operator.products.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('Error al guardar producto');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
        <Typography variant="h6" sx={{ color: 'text.primary', mb: 3 }}>
          Información Básica
        </Typography>

        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="name" label="Nombre del producto" />
          <Field.Text name="sku" label="SKU / Código de barras" />
          
          <Field.Select name="category" label="Categoría">
            {WAREHOUSE_PRODUCT_CATEGORY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Autocomplete
            name="clientId"
            label="Cliente propietario"
            placeholder="Buscar cliente..."
            options={clientOptions}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
          />

          <Field.Text
            name="description"
            label="Descripción"
            multiline
            rows={3}
            sx={{ gridColumn: '1 / -1' }}
          />
        </Box>

        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

        <Typography variant="h6" sx={{ color: 'text.primary', mb: 3 }}>
          Dimensiones y Peso
        </Typography>

        <Grid container spacing={2}>
          <Grid xs={12} sm={3}>
            <Field.Text name="length" label="Largo (cm)" />
          </Grid>
          <Grid xs={12} sm={3}>
            <Field.Text name="width" label="Ancho (cm)" />
          </Grid>
          <Grid xs={12} sm={3}>
            <Field.Text name="height" label="Alto (cm)" />
          </Grid>
          <Grid xs={12} sm={3}>
            <Field.Text name="weight" label="Peso (g)" />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

        <Typography variant="h6" sx={{ color: 'text.primary', mb: 3 }}>
          Inventario y Almacenamiento
        </Typography>

        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        >
          <Field.Text name="currentStock" label="Stock actual" />
          <Field.Text name="minStock" label="Stock mínimo" />
          <Field.Text name="maxStock" label="Stock máximo" />

          <Field.Select name="unit" label="Unidad de medida">
            {UNIT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Text name="warehouseLocation" label="Ubicación (ej: A1-01-01)" />
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => router.back()}>
              Cancelar
            </Button>

            <LoadingButton 
              type="submit" 
              variant="contained" 
              loading={isSubmitting}
              disabled={currentProduct ? !isDirty : false}
            >
              {!currentProduct ? 'Crear Producto' : 'Guardar Cambios'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Card>
    </Form>
  );
}
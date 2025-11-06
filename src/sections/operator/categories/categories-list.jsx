import React, { useState } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { createCategory, updateCategory, deleteCategory, getCategories } from 'src/api/categories';
import { toast } from 'src/components/snackbar';

// Definir el esquema de validación con zod
const categorySchema = zod.object({
  id: zod.string().optional(),
  name: zod.string().min(1, { message: 'El nombre es requerido!' }),
  description: zod.string().optional(),
});

const formSchema = zod.object({
  items: zod.array(categorySchema),
});

const CategoriesList = ({ defaultValues, onCategoriesUpdate }) => {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = methods;
  const { fields: formFields, append, remove } = useFieldArray({ control, name: 'items' });

  const [changedFields, setChangedFields] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, index: null, item: null });

  const handleRemoveConfirm = (index) => {
    const item = methods.getValues(`items.${index}`);
    setDeleteConfirm({ open: true, index, item });
  };

  const handleRemove = async () => {
    const { index, item } = deleteConfirm;

    if (!item?.id) {
      remove(index);
      setDeleteConfirm({ open: false, index: null, item: null });
      return;
    }

    try {
      await deleteCategory(item.id);
      remove(index);
      toast.success('Categoría eliminada correctamente');

      // Recargar las categorías para actualizar datos
      if (onCategoriesUpdate) {
        await onCategoriesUpdate();
      }
    } catch (error) {
      console.error('Error deleting category:', error);

      // Manejo específico de errores según la API
      if (error.response?.status === 404) {
        toast.error('La categoría no existe');
      } else if (error.response?.status === 400) {
        toast.error('No se puede eliminar la categoría');
      } else if (error.response?.status === 500) {
        // Error 500 suele ser del backend, dar más contexto
        if (error.response?.data?.detail?.includes('constraint') ||
            error.response?.data?.detail?.includes('reference')) {
          toast.error('No se puede eliminar la categoría: está siendo utilizada por productos');
        } else {
          toast.error('Error del servidor al eliminar la categoría. Es posible que esta categoría esté en uso.');
        }
      } else {
        toast.error('Error al eliminar la categoría');
      }
    } finally {
      setDeleteConfirm({ open: false, index: null, item: null });
    }
  };

  const handleChange = (event, index, field) => {
    const value = event.target.value;
    setValue(`items[${index}].${field}`, value);
    setChangedFields((prev) => ({ ...prev, [index]: true }));
  };

  const handleSave = async (index) => {
    const isValid = await trigger(`items.${index}`);
    if (isValid) {
      const item = methods.getValues(`items.${index}`);
      try {
        if (item.id) {
          // Editar categoría existente
          await updateCategory(item.id, item);
          toast.success('Categoría actualizada correctamente');
        } else {
          // Crear nueva categoría
          await createCategory(item);
          toast.success('Categoría creada correctamente');
        }
        setChangedFields((prev) => ({ ...prev, [index]: false }));

        // Recargar las categorías para actualizar datos
        if (onCategoriesUpdate) {
          await onCategoriesUpdate();
        }
      } catch (error) {
        console.error('Error saving category:', error);

        // Manejo específico de errores según la API
        if (error.response?.status === 400) {
          if (error.response?.data?.detail?.includes('already exists')) {
            toast.error('El nombre de la categoría ya existe');
          } else {
            toast.error('Datos inválidos');
          }
        } else if (error.response?.status === 404) {
          toast.error('La categoría no existe');
        } else if (error.response?.status === 500) {
          toast.error('Error del servidor al guardar la categoría');
        } else {
          toast.error('Error al guardar la categoría');
        }
      }
    }
  };

  const handleAdd = () => {
    append({
      name: '',
      description: '',
    });
    setChangedFields((prev) => ({ ...prev, [formFields.length]: true }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormProvider {...methods}>
        <form>
          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            {formFields.map((item, index) => (
              <Stack key={item.id || index} alignItems="flex-end" spacing={1.5}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                  <Field.Text
                    name={`items[${index}].name`}
                    label="Nombre"
                    InputLabelProps={{ shrink: true }}
                    sx={{ maxWidth: { md: 280 } }}
                    onChange={(event) => handleChange(event, index, 'name')}
                    error={!!errors.items?.[index]?.name}
                    helperText={errors.items?.[index]?.name?.message}
                  />

                  <Field.Text
                    name={`items[${index}].description`}
                    label="Descripción"
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) => handleChange(event, index, 'description')}
                    sx={{ flex: 1 }}
                  />
                  {item.id && (
                    <Button color="error" variant="contained" onClick={() => handleRemoveConfirm(index)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </Button>
                  )}
                  {changedFields[index] && (
                    <Button color="primary" variant="contained" onClick={() => handleSave(index)}>
                      Guardar
                    </Button>
                  )}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </form>
      </FormProvider>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="large"
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Agregar
        </Button>
      </Stack>

      {/* Diálogo de confirmación para eliminar */}
      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, index: null, item: null })}
        title="Eliminar Categoría"
        content={`¿Estás seguro de que deseas eliminar la categoría "${deleteConfirm.item?.name || 'Sin nombre'}"?`}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleRemove}
          >
            Eliminar
          </Button>
        }
      />
    </Box>
  );
};

export default CategoriesList;

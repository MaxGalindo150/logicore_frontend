'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

import { getCategories } from 'src/api/categories';
import { LoadingScreen } from 'src/components/loading-screen';

import CategoriesList from '../categories-list';

export function CategoriesView({ title = 'Categories' }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      // API devuelve {success: true, data: [...], total: N}
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={title}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Categories', href: paths.operator.categories.root },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Box sx={{ p: 3 }}>
        <CategoriesList defaultValues={{ items: categories }} onCategoriesUpdate={fetchCategories} />
      </Box>
    </DashboardContent>
  );
}

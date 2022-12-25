import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Captura from './captura';
import CapturaDetail from './captura-detail';
import CapturaUpdate from './captura-update';
import CapturaDeleteDialog from './captura-delete-dialog';

const CapturaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Captura />} />
    <Route path="new" element={<CapturaUpdate />} />
    <Route path=":id">
      <Route index element={<CapturaDetail />} />
      <Route path="edit" element={<CapturaUpdate />} />
      <Route path="delete" element={<CapturaDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CapturaRoutes;

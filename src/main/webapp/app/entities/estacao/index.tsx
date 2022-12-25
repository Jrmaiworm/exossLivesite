import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Estacao from './estacao';
import EstacaoDetail from './estacao-detail';
import EstacaoUpdate from './estacao-update';
import EstacaoDeleteDialog from './estacao-delete-dialog';

const EstacaoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Estacao />} />
    <Route path="new" element={<EstacaoUpdate />} />
    <Route path=":id">
      <Route index element={<EstacaoDetail />} />
      <Route path="edit" element={<EstacaoUpdate />} />
      <Route path="delete" element={<EstacaoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EstacaoRoutes;

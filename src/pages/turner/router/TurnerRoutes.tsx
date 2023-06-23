import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../../../components/auth/ProtectedRoute';
import { Turner } from '../components/layout/Turner';
import { TurnersView } from '../turners/TurnersView';

export const TurnerRoutes = () => {
  return (
    <Routes>
      <Route
        path="turner"
        element={
          <ProtectedRoute>
            <Turner />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<TurnersView />}></Route>
      </Route>
    </Routes>
  );
};

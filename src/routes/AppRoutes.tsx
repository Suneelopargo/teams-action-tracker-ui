import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Dashboard from '../pages/Dashboard/Dashboard';
import ActionItems from '../pages/ActionItems/ActionItems';
import EmailLogs from '../pages/EmailLogs/EmailLogs';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route
          path="action-items"
          element={<ActionItems />}
        />
        <Route
          path="email-logs"
          element={<EmailLogs />}
        />
      </Route>
    </Routes>
  );
}
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Dashboard from './pages/Dashboard/Dashboard';
import Meetings from './pages/Meetings/Meetings';
import ActionItems from './pages/ActionItems/ActionItems';
import EmailLogs from './pages/EmailLogs/EmailLogs';
import UploadTranscript from './pages/Transcripts/UploadTranscript';
import Login from './pages/Login/Login';

import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';

import { useAuth } from './hooks/useAuth';

function App() {

  const {
    isAuthenticated,
    user,
  } = useAuth();

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate
                to={
                  user?.role === 'ADMIN'
                    ? '/'
                    : '/meetings'
                }
                replace
              />
            ) : (
              <Login />
            )
          }
        />

        {/* Protected Application */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          {/* Dashboard - ADMIN ONLY */}

          <Route
            index
            element={
              <RoleRoute roles={['ADMIN']}>
                <Dashboard />
              </RoleRoute>
            }
          />

          {/* Meetings */}

          <Route
            path="meetings"
            element={<Meetings />}
          />

          {/* Action Items */}

          <Route
            path="action-items"
            element={<ActionItems />}
          />

          {/* Upload Transcript - ADMIN */}

          <Route
            path="upload-transcript"
            element={
              <RoleRoute roles={['ADMIN']}>
                <UploadTranscript />
              </RoleRoute>
            }
          />

          {/* Email Logs - ADMIN */}

          <Route
            path="email-logs"
            element={
              <RoleRoute roles={['ADMIN']}>
                <EmailLogs />
              </RoleRoute>
            }
          />

        </Route>

        {/* Catch All */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                isAuthenticated
                  ? (user?.role === 'ADMIN'
                    ? '/'
                    : '/meetings')
                  : '/login'
              }
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
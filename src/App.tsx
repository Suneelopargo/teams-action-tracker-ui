import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Dashboard from './pages/Dashboard/Dashboard';
import ActionItems from './pages/ActionItems/ActionItems';
import EmailLogs
  from './pages/EmailLogs/EmailLogs';
import UploadTranscript
  from './pages/Transcripts/UploadTranscript';
import Meetings
  from './pages/Meetings/Meetings';
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="action-items"
            element={
              <ActionItems />
            }
          />

          <Route
            path="email-logs"
            element={<EmailLogs />}
          />

          <Route
            path="upload-transcript"
            element={<UploadTranscript />}
          />

          <Route
            path="meetings"
            element={<Meetings />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
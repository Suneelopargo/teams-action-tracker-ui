import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

import './MainLayout.css';

export default function MainLayout() {
  return (
    <div className="main-layout">
      
      <div className="main-layout-sidebar">
        <Sidebar />
      </div>

      <div className="main-layout-content">
        
        <div className="main-layout-header">
          <Header />
        </div>

        <div className="main-layout-page">
          <Outlet />
        </div>

      </div>

    </div>
  );
}
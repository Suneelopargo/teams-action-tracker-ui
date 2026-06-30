import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';

import './MainLayout.css';

export default function MainLayout() {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const toggleSidebar = () => {

    setMobileOpen((prev) => !prev);

  };

  const closeSidebar = () => {

    setMobileOpen(false);

  };

  return (

    <div className="main-layout">

      <Sidebar
        mobileOpen={mobileOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />

      <div className="main-layout-content">

        <Header
          toggleSidebar={toggleSidebar}
        />

        <main className="main-layout-page">

          <Outlet />

        </main>

        <Footer />

      </div>

    </div>

  );

}
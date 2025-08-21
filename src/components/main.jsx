import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import LocationForm from './LocationForm/LocationForm';
import PromoSection from './PromoSection';
import DownloadSection from './DownloadSection';
import Footer from './Footer';
import EmergencyButton from './EmergencyButton';
import RideStatus from './RideStatus';
import GooglePlacesMap from './GooglePlacesMap';
import GeminiLeftSidebar from './GeminiLeftSidebar';
import { FaBars } from 'react-icons/fa';

import '../style.css';

function MainApp({ setIsAuthenticated }) {
  const [activeGeminiContent, setActiveGeminiContent] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleGeminiSidebarMenuItemClick = (item) => {
    setActiveGeminiContent(item);
    setIsSidebarOpen(false);
  };

  const showMainLayout = () => {
    return (
      <div className="container-1 curved-container">
        <Hero />
        <LocationForm />
        <PromoSection />
        <DownloadSection />
        <Footer />
        <EmergencyButton />
        <RideStatus />
        <GooglePlacesMap />
      </div>
    );
  };

  return (
    <div className="app-main-layout">
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <div className="content-wrapper">
        <GeminiLeftSidebar
          setIsAuthenticated={setIsAuthenticated}
          activeMenuItem={activeGeminiContent}
          onMenuItemClick={handleGeminiSidebarMenuItemClick}
          className={isSidebarOpen ? 'open' : ''}
        />

        <div className="main-content-area">
          <div className="main-content-header">
            <button className="mobile-menu-toggle" onClick={() => setIsSidebarOpen(true)}>
              <FaBars />
            </button>
            <Header setIsAuthenticated={setIsAuthenticated} />
          </div>
          {showMainLayout()}
        </div>
      </div>
    </div>
  );
}

export default MainApp;

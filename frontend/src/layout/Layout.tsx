import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <Header openSidebar={handleSidebarOpen} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={handleSidebarClose}
      />
      {/* main content */}
    </div>
  );
}

export { Layout };

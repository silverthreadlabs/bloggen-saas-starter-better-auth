import React from 'react';

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="flex max-w-7xl mx-auto w-full min-h-screen bg-canvas">
      {sidebar}
      <main className="flex-1 md:ml-0 p-4 mt-10 md:mt-0 md:p-6 lg:p-8 w-full">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 
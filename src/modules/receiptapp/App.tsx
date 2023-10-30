import React from 'react';
import { Outlet } from 'react-router-dom';

import { LayoutHeader } from './pages/Layout/LayoutHeader';

const App: React.FC = () => {
  return (
    <>
      <LayoutHeader />
      <Outlet />
    </>
  );
};

export default App;

import { createHashRouter } from 'react-router-dom';

import App from './App';
import { Home } from './pages/Home';
import {
  Receipt,
  ReceiptCreate,
  ReceiptDetails,
  ReceiptEdit,
  ReceiptList,
} from './pages/Receipts';
import { Settings } from './pages/Settings/Settings';
import { SettingsList } from './pages/Settings/SettingsList';

import { routes } from '@config/routes';

export const AppRouter = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: `${routes.RECEIPTS}`,
        element: <Receipt />,
        children: [
          { index: true, element: <ReceiptList /> },
          {
            path: `${routes.RECEIPTS}/create`,
            element: <ReceiptCreate />,
          },
          {
            path: `${routes.RECEIPTS}/:id`,
            element: <ReceiptDetails />,
          },
          {
            path: `${routes.RECEIPTS}/:id/edit`,
            element: <ReceiptEdit />,
          },
        ],
      },
      {
        path: `${routes.SETTINGS}`,
        element: <Settings />,
        children: [{ index: true, element: <SettingsList /> }],
      },
    ],
  },
]);

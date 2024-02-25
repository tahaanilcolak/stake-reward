import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers/AppProvider.tsx';
import StakeScreen from './screens/StakeScreen/StakeScreen.tsx';
import RewardScreen from './screens/RewardScreen/RewardScreen.tsx';
import StatisticsScreen from './screens/StatisticsScreen/StatisticsScreen.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '*',
        element: <StakeScreen/>,
      },
      {
        path: '/',
        element: <StakeScreen />,
      },
      {
        path: '/rewards',
        element: <RewardScreen />,
      },
      {
        path: '/statistics',
        element: <StatisticsScreen />,
      }
    ],
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(

  <>
    <AppProviders>
   <RouterProvider router={router} />
   </AppProviders>
  </>,
)


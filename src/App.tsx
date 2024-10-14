import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import BusName from './pages/BusService/BusName';
import BusRoute from './pages/BusService/BusRoute';
import BusFare from './pages/BusService/BusFare';
import BusTiming from './pages/BusService/BusTiming';
import BusType from './pages/BusService/BusType';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Check if the current path requires DefaultLayout
  const requiresDefaultLayout = !pathname.startsWith('/auth/');

  return loading ? (
    <Loader />
  ) : (
    requiresDefaultLayout ? (
      <DefaultLayout>
        <Routes>
          <Route
            index
            element={<Navigate to="/auth/signin" replace />} // Default route to ECommerce or other dashboard page
          />
          <Route path="/busname" element={<BusName />} />
          <Route path="/busroute" element={<BusRoute />} />
          <Route path="/busfare" element={<BusFare />} />
          <Route path="/bustiming" element={<BusTiming />} />
          <Route path="/bustype" element={<BusType />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/ui/alerts" element={<Alerts />} />
          <Route path="/ui/buttons" element={<Buttons />} />
        </Routes>
      </DefaultLayout>
    ) : (
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    )
  );
}

export default App;

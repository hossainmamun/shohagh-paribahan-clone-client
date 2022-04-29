import HomePage from './Component/HomePage/HomePage.js';
import './Style/Main.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './Component/Dashboard/Dashboard.js';
import DashboardHome from './Component/Dashboard/DashboardHome.js';
import BookingList from './Component/Dashboard/BookingList.js';
import BusSchedule from './Component/Dashboard/BusSchedule.js';
import ScheduleList from './Component/Dashboard/ScheduleList.js';
import ScheduleEdit from './Component/RoutingPage/ScheduleEdit.js';
import Location from './Component/RoutingPage/Location.js';
import ContactInformation from './Component/RoutingPage/ContactInformation.js';
import Faq from './Component/RoutingPage/Faq.js';
import ReservationTicket from './Component/RoutingPage/ReservationTicket.js';
import { createContext, useState } from 'react';
import Account from './Component/GoogleAccount/Account.js';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute.js';
import MakeAdmin from './Component/Dashboard/MakeAdmin.js';
import Payment from './Component/RoutingPage/Payment.js';

//  declare context api to select seat
export const selectSeat = createContext();
export const pickedDate = createContext();
export const userContext = createContext();

function App() {
  document.addEventListener('contextmenu', event => event.preventDefault());
  // declare useState hook
  const [seatNumber, setSeatNumber] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [loggedINUser, setLoggedInUser] = useState({});

  // return
  return (
    <userContext.Provider value={[loggedINUser, setLoggedInUser]}>
      <selectSeat.Provider value={[seatNumber, setSeatNumber]}>
        <pickedDate.Provider value={[startDate, setStartDate]}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/schedule-edit/:scheduleId" element={<ScheduleEdit />} />
              <Route path="/location" element={<Location />} />
              <Route path="/contact-information" element={<ContactInformation />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/reservation-ticket/:reserveId" element={
                <PrivateRoute>
                  <ReservationTicket />
                </PrivateRoute>
              }
              />
              <Route path="/login_signup" element={<Account />} />
              <Route path="/payment_information/:payId" element={<Payment />} />

              {/* DASHBOARD ROUTE */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }>
                <Route path="dashboardHome" element={<DashboardHome />} />
                <Route path="bookingList" element={<BookingList />} />
                <Route path="busSchedule" element={<BusSchedule />} />
                <Route path="scheduleList" element={<ScheduleList />} />
                <Route path="makeAdmin" element={<MakeAdmin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </pickedDate.Provider>
      </selectSeat.Provider>
    </userContext.Provider>
  );
}

export default App;

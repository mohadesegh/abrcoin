import React from "react";
import GlobalStyles from "styles/GlobalStyles";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SaaSProductLandingPage from "demos/SaaSProductLandingPage";
import { RequireAuth } from "react-auth-kit";

import News from "components/News";
import Login from "components/Login";
import SignUp from "components/SignUp";
import Panel from "components/panel/Panel";
import Ticket from "components/Ticket";

export default function App() {
  return (
    <>
      <GlobalStyles />
        <Routes>
          {/* <Route
            path="/"
            element={
              <RequireAuth loginPath="/login">
                <SaaSProductLandingPage />
              </RequireAuth>
          }></Route> */}
          <Route path="/" element={<SaaSProductLandingPage />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/ticket" element={<Ticket />}/>
        </Routes>
    </>
  );
}

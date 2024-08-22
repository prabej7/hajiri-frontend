import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/open/Home";
import Register from "./pages/open/Register";
import Login from "./pages/open/Login";
import Dashboard from "./pages/account/Dashboard";
import TablesPage from "./pages/account/TablesPage/TablesPage";

import { Outlet } from "react-router-dom";
import TablePageLayout from "./pages/account/TablesPage/TablePageLayout";
import Table from "./pages/account/TablesPage/Table";
import Alert from "@/components/user/Alert";
import Stats from "./pages/account/stats/Statistics";
import Setting from "./pages/account/Setting";
function DashboardLayout() {
  return (
    <div>
      <Outlet /> {/* This will render child routes */}
    </div>
  );
}

function App() {
  const { ToastContainer } = Alert();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tables" element={<TablePageLayout />}>
            <Route index element={<TablesPage />} />
            <Route path=":tableid" element={<Table />} />
          </Route>
          <Route path="stats" element={<Stats />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

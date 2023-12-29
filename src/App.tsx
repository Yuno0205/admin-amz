import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import UsersPage from "./pages/UsersPage";
import LeaveForm from "./components/core/LeaveRequests";
import Login from "./pages/Login";
import AdminPage from "./pages/Admin";
import CustomLayout from "./components/Layouts/CustomLayout";
import Page403 from "./pages/Error/403";
import Page404 from "./pages/Error/404";
import SalaryPage from "./pages/Salary";
import CompanyTable from "./pages/Company";
import EmployeeOwner from "./pages/EmployeeOwner";
import EmployeeDetail from "./pages/EmployeeDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <CustomLayout>
                <AdminPage />
              </CustomLayout>
            }
          />
          <Route
            path="/employees"
            element={
              <CustomLayout>
                <UsersPage />
              </CustomLayout>
            }
          />
          <Route
            path="/employees/:id"
            element={
              <CustomLayout>
                <EmployeeDetail />
              </CustomLayout>
            }
          />
          <Route
            path="/form"
            element={
              <CustomLayout>
                <LeaveForm />
              </CustomLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/salary"
            element={
              <CustomLayout>
                <SalaryPage />
              </CustomLayout>
            }
          />
          <Route
            path="/company"
            element={
              <CustomLayout>
                <CompanyTable />
              </CustomLayout>
            }
          />
          <Route
            path="/employeeowner"
            element={
              <CustomLayout>
                <EmployeeOwner />
              </CustomLayout>
            }
          />
          <Route
            path="/403"
            element={
              <CustomLayout>
                <Page403 />
              </CustomLayout>
            }
          />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

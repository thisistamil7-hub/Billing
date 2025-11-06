// import React from "react";
// import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import { AuthProvider } from "./context/authSlice";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./pages/login/Login";
// import Dashboard from "./pages/Dashboard/Dashboad";
// import MenuBar from "./pages/MenuBar/MenuBar";
// import Customers from "./pages/Customers/Customers";
// import Products from "./pages/Products/Products";
// import Invoices from "./pages/Invoices/Invoices";
// import InvoiceCreation from "./pages/InvoiceCreation/InvoiceCreation";
// import Reports from "./pages/Reports/Reports";
// import Settings from "./pages/Settings/Settings";

// const Layout = () => (
//   <>
//     <MenuBar />
//     <Outlet /> 
//   </>
// );

// const AppRoutes = () => {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/customers" element={<Customers />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/invoices" element={<Invoices />} />
//             <Route path="/create-invoice" element={<InvoiceCreation />} />
//             <Route path="/reports" element={<Reports />} />
//             <Route path="/settings" element={<Settings />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// };

// export default AppRoutes;



// src/Routes.jsx
// src/Routes.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "./context/authSlice.js"; // ✅ adjust path

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import MenuBar from "./pages/MenuBar/MenuBar";

// Pages
import Login from "./pages/login/Login";
import BillingPlan from "./pages/BillingPlan/BillingPlan";
import Dashboard from "./pages/Dashboard/Dashboad";
import Customers from "./pages/Customers/Customers";
import Products from "./pages/Products/Products";
import Invoices from "./pages/Invoices/Invoices";
import InvoiceCreation from "./pages/InvoiceCreation/InvoiceCreation";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";

// ✅ Layout with shared sidebar/navbar
const Layout = () => (
  <>
    <MenuBar />
    <Outlet />
  </>
);

const AppRoutesContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Load user data from localStorage on app start
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - Authentication */}
        <Route
          path="/sign-in"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        {/* Root redirect */}
        <Route
          path="/"
          element={<Navigate to="/sign-in" replace />}
        />


        <Route
          path="/billing-plan"
          element={
            <ProtectedRoute>
              <BillingPlan />
            </ProtectedRoute>
          }
        />

        {/* Protected routes with shared layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/create-invoice" element={<InvoiceCreation />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutesContent;

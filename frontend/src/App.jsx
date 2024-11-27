import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/LoadingPage";
const Signin = lazy(() => import("./pages/signin"));
const Signup = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PaymentGateway = lazy(()=> import("./pages/paymentGateway"))
const LandingPage = lazy(()=> import("./pages/LandingPage"))
const ForgotPassword = lazy(()=> import("./pages/ForgotPassword"))
const Resetpassword = lazy(()=> import("./pages/ResetPassword"))

function App() {
  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<LoadingPage/>}>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<PaymentGateway />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<Resetpassword />} />
        </Routes>
      </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

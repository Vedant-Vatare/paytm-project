import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";
const Signin = lazy(() => import("./pages/signin"));
const Signup = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PaymentGateway = lazy(()=> import("./pages/paymentGateway"))
const LandingPage = lazy(()=> import("./pages/LandingPage"))
function App() {
  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<div>Loading page....</div>}>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<PaymentGateway />} />
        </Routes>
      </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

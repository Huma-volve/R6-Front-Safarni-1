import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import "./App.css";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Checkout/Payment";
import Success from "./pages/Checkout/Success";
// import { CheckoutProvider } from "./context/CheckoutContext";
function App() {
  return (

    <div className="min-h-screen flex flex-col w-full">

      <Navbar user={{ name: 'Sarah', avatarUrl: 'https://i.pravatar.cc/40' }} />

      <main>
        <Routes>
          <Route path="/" />
          <Route path="/favorite" />
          <Route path="/compare" />
          <Route path="/maps" />
        </Routes>
        {/* <CheckoutProvider> */}
        <Routes>
          <Route path="/checkout" element={<Checkout />}>
            <Route index element={<Payment />} />
            <Route path="success" element={<Success />} />
          </Route>
          {/* other routes */}
        </Routes>
      {/* </CheckoutProvider> */}
      </main>
    </div>
  )
}

export default App

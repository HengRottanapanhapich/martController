import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import PurchaseOrders from "./pages/PurchaseOrders";
import Checkout from "./pages/Checkout";
import Supplier from "./pages/Supplier";
import Users from "./pages/Users";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div id="sidebarFlex">
        <Sidebar />
        <div id="mainColumn">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory/>} />
            <Route path="/checkout" element={<Checkout title="Checkout" />} />
            <Route path="/purchase-orders" element={<PurchaseOrders title="Purchase orders" />} />
            <Route path="/supplier" element={<Supplier/>} />
            <Route path="/users" element={<Users title="Users" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
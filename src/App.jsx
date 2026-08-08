import Dashboard from "./pages/Dashboard";
import Sidebar from "../src/components/Sidebar/Sidebar.jsx";
import Topbar from "./components/Topbar/Topbar.jsx";
import "./App.css";

function App() {
  return (
    <div>
      
      <div id="sidebarFlex">
        <Sidebar></Sidebar>
        <div id="topbarFlex">
          <Topbar></Topbar>
          <Dashboard></Dashboard>
        </div>
      </div>
    </div>
  );
}

export default App;

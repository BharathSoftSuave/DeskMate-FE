import { ToastContainer } from "react-toastify";
import "./App.scss";
import RouterComponent from "./router";
import { useDisableZoom } from "./hooks/useDisableZoom";

function App() {
  useDisableZoom();
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterComponent />
    </>
  );
}

export default App;

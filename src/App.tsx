import { ToastContainer } from "react-toastify";
import "./App.scss";
import RouterComponent from "./router";

function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <RouterComponent />;
    </>
  )
  
}

export default App;

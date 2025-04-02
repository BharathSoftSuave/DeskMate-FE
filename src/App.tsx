import { ToastContainer } from "react-toastify";
import "./App.scss";
import RouterComponent from "./router";
import { useDisableZoom } from "./hooks/useDisableZoom";
import { Provider } from "react-redux";
import store from "./Store";

function App() {
  useDisableZoom();
  return (
    <>
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={3000} />
        <RouterComponent />
      </Provider>
    </>
  );
}

export default App;

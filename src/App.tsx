import { ToastContainer } from "react-toastify";
import "./App.scss";
import RouterComponent from "./router";
import { useDisableZoom } from "./hooks/useDisableZoom";
import { Provider } from "react-redux";
import Store from "./Store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  useDisableZoom();
  return (
    <>
      <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
          <ToastContainer position="top-right" autoClose={3000} />
          <RouterComponent />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

import React from "react";
import { ToastContainer } from "react-toastify";
import AppRouter from "./routing/AppRouter"; // Your routing setup
import { AuthProvider } from "./context/AuthContext"; // Auth context provider
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <AppRouter />
    </AuthProvider>
  );
};

export default App;

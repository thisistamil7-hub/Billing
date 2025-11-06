import React from "react";
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutesContent from "./Routes.jsx"; 
import { Store } from "./Store/Store.js";

function App() {
  return (
    <Provider store={Store}>
      <AuthProvider>
        <AppRoutesContent />
      </AuthProvider>
    </Provider>
  );
}

export default App;

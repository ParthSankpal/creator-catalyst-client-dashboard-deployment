"use client";
import store from "../../store/index";
// import { SessionProvider } from "next-auth/react";s
import { Provider } from "react-redux";

export default function ClientProvider({ children }) {
  return (
    
      <Provider store={store}>{children}</Provider>
   
  );
}


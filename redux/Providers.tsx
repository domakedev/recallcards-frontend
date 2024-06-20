"use client";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";
import { useRef } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

// const Providers = ({ children }: ProvidersProps) => {
//   return <Provider store={makeStore}>{children}</Provider>;
// };

export default function StoreProvider({ children }: ProvidersProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

// export default Providers;

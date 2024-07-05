"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { persistStore } from "redux-persist";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { setUser } from "./userSlice";
persistStore(store);

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const dispatch = store.dispatch;

  console.log("🚀 ~ session:", session);
  useEffect(() => {
    if (session.status === "authenticated") {
      const user = {
        id: Number(session.data.user.id),
        email: session.data.user.email!,
        authenticated: true,
      };
      // setUserNextAuth(user);
      dispatch(setUser(user));
    }
  }, [dispatch, session]);

  return <Provider store={store}>{children}</Provider>;
}
// "use client";
// import { Provider } from "react-redux";
// import { store } from "./store";
// import { persistStore } from "redux-persist";
// persistStore(store);

// export default function ReduxProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <Provider store={store}>{children}</Provider>;
// }

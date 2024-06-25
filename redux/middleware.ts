import { parseCookies, destroyCookie } from 'nookies';
import {logout} from './userSlice';
// import { cookies } from 'next/headers';

const tokenMiddleware = (store: { dispatch: (arg0: any) => void; }) => (next: (arg0: any) => any) => (action: any) => {
    // const cookieToken = cookies().get("token");
    // console.log("🚀 ~ tokenMiddleware ~ cookies:", cookieToken)
    // const token = cookies.jwtToken;

    // if (!token) {
    //   store.dispatch(logout());
    // }

  return next(action);
};

export default tokenMiddleware;

"use client";
import { signIn } from "next-auth/react";
import { MenuItem } from "@headlessui/react";

const SignInButton = () => {
  return (
    <MenuItem>
      <button
        className="block text-start w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
        onClick={() => {
          console.log("🚀 ~ SignInButton ~ onClick ~ signOut");
          signIn();
        }}
      >
        <p>Iniciar sesión</p>
      </button>
    </MenuItem>
  );
};

// SignInButton.displayName = "SignInButton";

export default SignInButton;
// "use client";
// import { logoutAction } from "@/services/auth.actions";
// import React from "react";
// import { forwardRef } from "react";
// import { useSession, signOut, signIn } from "next-auth/react";

// const SignOutButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
//   console.log("🚀 ~ SignOutButton ~ props:", props)
//   return (
//     <button
//       className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
//       onClick={() => {
//         console.log("🚀 ~ SignOutButton ~ onClick ~ signOut");
//         signOut();
//       }}
//       ref={ref}
//       {...props}
//     >
//       Cerrar sesión
//     </button>
//   );
// });

// SignOutButton.displayName = "SignOutButton";

// export default SignOutButton;

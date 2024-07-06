import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Logo from "@/app/icon.svg";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import MiauAvatar from "@/assets/avatar-gatito.png";
import PersonaAvatar from "@/assets/avatar-persona.webp";
import SignOutButton from "../Auth/SignOutButton";
import SignInButton from "../Auth/SignInButton";
import SignControlButton from "../Auth/SignControlButton";

// const navigation = [
//   // { name: 'Mis Apuntes', href: '#', current: true },
//   // { name: "Deck X", href: "/", current: false },
// ];

function classNames(...classes: string[]) {
  console.log(
    "🚀 ~ classNames ~ classes.filter(Boolean).join(' '):",
    classes.filter(Boolean).join(" ")
  );
  return classes.filter(Boolean).join(" ");
}

export default async function NavBarTUI() {
  const session = await auth();
  console.log("🚀 ~ NavBarTUI ~ session:", session);

  const handlerSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <Disclosure
      as="nav"
      className="bg-gray-800"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <Image
                  alt="Your Company"
                  src={Logo}
                  className="h-8 w-auto"
                  width={40}
                  height={40}
                />
              </Link>
              <p className="ml-3 sm:block text-white">Repaso Activo</p>
            </div>
            <div className="hidden sm:ml-2 sm:block">
              <div className="flex space-x-4">
                {/* {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))} */}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon
                aria-hidden="true"
                className="h-6 w-6"
              />
            </button> */}

            {/* Profile dropdown */}
            <Menu
              as="div"
              className="relative ml-3"
            >
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <Image
                    alt=""
                    src={
                      session?.user
                        ? session?.user.image || MiauAvatar
                        : PersonaAvatar
                    }
                    className="h-8 w-8 rounded-full object-cover"
                    width={100}
                    height={100}
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {/* <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Mis Decks
                  </a>
                </MenuItem> */}
                {!session?.user && (
                  <MenuItem>
                    <Link
                      href="/auth/register"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Registrarme
                    </Link>
                  </MenuItem>
                )}
                {/* <MenuItem> */}
                <SignControlButton />
                {/* </MenuItem> */}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel> */}
    </Disclosure>
  );
}

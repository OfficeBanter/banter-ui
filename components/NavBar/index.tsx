import React, { useEffect, useState } from "react";
import Head from "next/head";
import * as S from "./style";
import authService from "../../services/auth.service";
import { Navbar, Dropdown } from "flowbite-react";
import { useRouter } from "next/router";

// encode url parameters to a string
const encodeParams = (params) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
};

export default function NavBar({}) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(authService.getUser());
  }, []);

  if (!user) return null;

  return (
    <Navbar className="bg-sky-500" fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <img
          src="/Banter_Logo.svg"
          className="mr-3 h-10 md:h-12"
          alt="Banter Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_BILLING_URL}?${encodeParams({
            prefilled_email: user.email,
          })}`}
        >
          Billing
        </Navbar.Link>

        <Navbar.Link href="https://banter.so/support">Support</Navbar.Link>

        <Dropdown label={`${user.name} (${user.workspace})`} inline={true}>
          <Dropdown.Item
            onClick={() => {
              authService.logoutUser();
              router.push("/");
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );

  // return (
  //   <nav className="px-2 sm:px-4 py-2.5 bg-red-300 dark:bg-gray-900">
  //     <div className="container flex flex-wrap items-center justify-between mx-auto">
  //       <a href="/dashboard" className="flex items-center">
  //         <img
  //           src="/Banter_Logo.svg"
  //           className="h-6 mr-3 sm:h-9"
  //           alt="Flowbite Logo"
  //         />
  //       </a>
  //       <button
  //         data-collapse-toggle="navbar-default"
  //         type="button"
  //         className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  //         aria-controls="navbar-default"
  //         aria-expanded="false"
  //       >
  //         <span className="sr-only">Open main menu</span>
  //         <svg
  //           className="w-6 h-6"
  //           aria-hidden="true"
  //           fill="currentColor"
  //           viewBox="0 0 20 20"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             fillRule="evenodd"
  //             d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
  //           ></path>
  //         </svg>
  //       </button>
  //       <div className="hidden w-full md:block md:w-auto" id="navbar-default">
  //         <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
  //           <li>
  //             <a
  //               href={`${process.env.NEXT_PUBLIC_APP_URL}/support/`}
  //               className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
  //               aria-current="page"
  //             >
  //               Help
  //             </a>
  //           </li>
  //           <li>
  //             <a
  //               href={`${
  //                 process.env.NEXT_PUBLIC_STRIPE_BILLING_URL
  //               }?${encodeParams({
  //                 prefilled_email: user.email,
  //               })}`}
  //               className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
  //             >
  //               Services
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </nav>
  //);
}

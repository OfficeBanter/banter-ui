import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { Navbar, Dropdown } from "flowbite-react";
import { useRouter } from "next/router";
import { useToast } from "../Toast";

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
  const context = useToast();

  useEffect(() => {
    setUser(authService.getUser());
    context.setBanner({ type: "failure", message: "Welcome to Banter!" });
  }, []);

  if (!user) return null;

  return (
    <Navbar
      className="bg-sky-500 rounded-none col-span-12 row-span-1"
      fluid={true}
      rounded={true}
    >
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
}

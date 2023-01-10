import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { Navbar, Dropdown } from "flowbite-react";
import { useRouter } from "next/router";
import { useToast } from "../Toast";
import { DateTime } from "luxon";
import { HiArrowRight } from "react-icons/hi";
import { useSettings } from "../../services/setting.context";
import Link from "next/link";

// encode url parameters to a string
const encodeParams = (params) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
};

const getBillingMessage = (subscription: any) => {
  if (!subscription) return;
  if (!subscription?.isFreeTrial && subscription?.isActive) {
    return;
  }

  if (!subscription.isActive) {
    return (
      <p className="flex space-x-2">
        <Link href="/billing">
          Your free trial is over click here to upgrade your account
        </Link>{" "}
        <HiArrowRight />
      </p>
    );
  }

  const subscriptionTrialEndDate = DateTime.fromISO(
    subscription.subscriptionEndsOn
  );
  let difference = subscriptionTrialEndDate.diffNow().as("days");

  let message = "";
  if (difference >= 2 && difference <= 30) {
    message = `Your free trial ends on ${subscriptionTrialEndDate.toFormat(
      "LLL dd"
    )}.`;
  } else if (difference > 1 && difference < 2) {
    message = `Your free trial ends tomorrow.`;
  } else if (difference < 1) {
    message = `It’s not near, it’s here, your Banterbot trial is expiring later today. You can use the discount code to keep the good times rolling. Do you need more time to test out Banter?`;
  }
  return (
    message && (
      <p className="flex space-x-2">
        <Link href="/billing">
          {message.trim()} Click here to update billing
        </Link>{" "}
        <HiArrowRight />
      </p>
    )
  );
};

export default function NavBar({}) {
  const router = useRouter();
  const user = authService.getUser();
  const { setBanner } = useToast();
  const { subscription } = useSettings();

  useEffect(() => {
    const billingMessage = getBillingMessage(subscription);

    if (billingMessage) {
      setBanner({
        type: "failure",
        message: billingMessage,
      });
    }
  }, [subscription]);

  if (!user || !subscription) return null;

  return (
    <Navbar
      className="bg-rose-50 rounded-none col-span-12 row-span-1"
      fluid={true}
      rounded={true}
    >
      <Link href="/dashboard">
        <img
          src="/Banter_Logo.svg"
          className="mr-3 h-10 md:h-12"
          alt="Banter Logo"
        />
      </Link>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          target={
            !subscription?.isActive || subscription?.isFreeTrial
              ? "_self"
              : "_blank"
          }
          className={
            subscription?.isActive &&
            !subscription?.isFreeTrial &&
            subscription.stripeCustomerId !== user.stripeCustomerId &&
            "hidden"
          }
          href={
            !subscription?.isActive || subscription?.isFreeTrial
              ? "/billing"
              : `${process.env.NEXT_PUBLIC_STRIPE_BILLING_URL}?${encodeParams({
                  prefilled_email: user.email,
                })}`
          }
        >
          Billing
        </Navbar.Link>

        <Navbar.Link target="_blank" href="https://banter.so/support">
          Support
        </Navbar.Link>
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

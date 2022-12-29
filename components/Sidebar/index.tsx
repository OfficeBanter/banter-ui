import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLoading } from "../Loading";
import { useSettings } from "../../services/setting.context";
import { HiOutlinePlusCircle, HiUserAdd } from "react-icons/hi";

export default function Sidebar({}) {
  const setLoading = useLoading({ name: "sidebar" });

  const router = useRouter();
  const { settingId } = router.query;
  const { settings } = useSettings();

  return (
    <>
      <div
        id="sidebar"
        className={`
        p-4 
        col-span-3 row-span-2

        h-full
        overflow-y-auto bg-slate-50
        `}
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
        <h2
          id="drawer-label"
          className={`
          text-2xl
          inline-flex items-center mb-4 text-base 
           text-gray-500 dark:text-gray-400`}
        >
          Your Channels
        </h2>
        {!!settings ? (
          <ol>
            {settings?.map((setting) => (
              <li
                className={`
                mt-2
                  text-lg
                 text-gray-500
                ${
                  settingId === setting._id &&
                  "font-bold text-gray-900 bg-blue-100  mr-2 px-2.5 py-0.5 rounded-full"
                }
            `}
                key={setting._id}
              >
                <Link href={`/setting/${setting._id}/overview`}>
                  {`#${setting.channel.name} ${
                    setting.channel.isPrivate ? "🔒" : ""
                  }`}
                </Link>
              </li>
            ))}
            <hr className="my-8 h-px bg-gray-900 border-0 dark:bg-gray-700" />
            <li>
              <Link href="/dashboard">
                <HiOutlinePlusCircle className="inline" /> Add New Channel
              </Link>
            </li>
          </ol>
        ) : (
          <p className="p-40">Loading</p>
        )}
      </div>
    </>
  );
}

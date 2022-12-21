import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLoading } from "../Loading";
import { useSettings } from "../../services/setting.context";

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
        overflow-y-auto bg-sky-100  dark:bg-gray-800
        `}
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
        <h2
          id="drawer-label"
          className={`
          text-2xl
          inline-flex items-center mb-4 text-base 
          font-semibold text-gray-500 dark:text-gray-400`}
        >
          Your Channels
        </h2>
        {!!settings ? (
          <ol>
            {settings?.map((setting) => (
              <li
                className={`
                  text-lg
                 text-gray-500 dark:text-gray-400
                ${
                  settingId === setting._id &&
                  "font-bold text-gray-900 dark:text-gray-900"
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
            <li>
              <Link href="/dashboard">Add New Channel</Link>
            </li>
          </ol>
        ) : (
          <p className="p-40">Loading</p>
        )}
      </div>
    </>
  );
}

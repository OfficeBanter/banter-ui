import React, { useEffect, useState } from "react";
import Head from "next/head";
import * as S from "./style";
import settingService from "../../services/setting.service";
import { useRouter } from "next/router";
import { type } from "os";
import Link from "next/link";

export default function Sidebar({}) {
  const [settings, setSettings] = useState(null);

  const router = useRouter();
  const { settingId } = router.query;

  useEffect(() => {
    const getSettings = async () => {
      const settings = await settingService.getAllSettingsForWorkspace();
      setSettings(settings);
    };
    getSettings();
  }, []);

  return (
    <>
      <div
        id="sidebar"
        className={`
        h-screen p-4 
        w-80
        overflow-y-auto bg-sky-100  dark:bg-gray-800
        `}
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
        <h2
          id="drawer-label"
          className={`
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
                 text-gray-500 dark:text-gray-400
                ${
                  settingId === setting._id &&
                  "text-bold text-gray-900 dark:text-gray-900"
                }
            `}
                key={setting._id}
              >
                <Link href={`/setting/${setting._id}/overview`}>
                  {setting.channel.name}
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

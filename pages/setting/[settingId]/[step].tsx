import React, { useEffect, useState } from "react";
import Head from "next/head";
import authService from "../../../services/auth.service";
import { useRouter } from "next/router";
import NavBar from "../../../components/NavBar";
import Sidebar from "../../../components/Sidebar";
import EditSetting from "../../../components/EditSetting";
import settingService from "../../../services/setting.service";
import Toast from "../../../components/Toast";
import { Button, Modal } from "flowbite-react";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import segmentService from "../../../services/segment.service";

export default function AuthPage({ message }) {
  const router = useRouter();

  useEffect(() => {
    if (router.query.success === "true") {
      segmentService.track("checked_out");
    }
  }, [router?.query?.success]);

  const [channels, setChannels] = useState(null);
  useEffect(() => {
    if (!authService.getUser()) {
      router.replace("/");
      return;
    }
    const getChannels = async () => {
      authService.init();
      const channels = await settingService.getChannels();
      setChannels(
        channels.map(({ uniqueId, name, isPrivate, ...rest }) => ({
          ...rest,
          value: uniqueId,
          label: `${isPrivate ? "🔒" : ""}${name}`,
        }))
      );
    };
    getChannels();
  }, []);

  const removeSuccess = () => {
    const query = { ...router.query };
    delete query.success;
    router.replace({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <>
      <Head>
        <title>Banter Dashboard</title>
        <meta name="description" content="Login for Banter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toast />
      <div
        style={{ gridTemplateRows: "64px auto 1fr" }}
        className="grid grid-cols-12 grid-rows-3 auto-rows-min"
      >
        <NavBar />
        <Sidebar />
        <EditSetting channels={channels} setChannels={setChannels} />
      </div>
      <Modal show={router.query.success === "true"} onClose={removeSuccess}>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineCheckCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
              {`Your subscription has been created successfully. Lets get Bantering!.`}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={removeSuccess}>
                Woo!
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

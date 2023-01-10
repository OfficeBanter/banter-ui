import React, { useEffect, useState } from "react";
import Head from "next/head";
import authService from "../../services/auth.service";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import Toast from "../../components/Toast";
import subscriptionService from "../../services/subscription.service";
import { HiArrowRight, HiCheck, HiCheckCircle } from "react-icons/hi";
import segmentService from "../../services/segment.service";

interface SubscriptionCardProps {
  bestValue?: boolean;
  feature: string;
  quantity: string;
  title: string;
  price: number;
  onClick: () => void;
}

const BasicCard = ({
  data: { feature, quantity, title, price, onClick },
}: {
  data: SubscriptionCardProps;
}) => (
  <div className="w-96 p-8 bg-cyan-50  text-center rounded-3xl pr-16 shadow-xl">
    <h1 className="text-black font-semibold text-2xl">{title}</h1>
    <p className="pt-2 tracking-wide">
      <span className="text-gray-600 align-top">$ </span>
      <span className="text-3xl font-semibold">{price}</span>
      <span className="text-gray-600 font-medium">/ channel</span>
    </p>
    <hr className="mt-4 border-1" />
    <div className="pt-8">
      <p className="text-left">
        <HiCheckCircle className="inline ml-2" />
        <span className="pl-2">New icebreakers added weekly </span>
      </p>
      <p className="text-left pt-5">
        <HiCheckCircle className="inline ml-2" />
        <span className="pl-2">Add your own icebreakers</span>
      </p>
      <p className="text-left pt-5">
        <HiCheckCircle className="inline ml-2" />
        <span className="pl-2">Edit & schedule upcoming messages </span>
      </p>

      <button onClick={onClick} className="">
        <p className="w-full py-4 bg-blue-900 mt-8 rounded-full px-8 text-white">
          <span className="font-medium">Choose This Plan</span>
          <HiArrowRight className="inline ml-2" />
        </p>
      </button>
    </div>
  </div>
);

const Popular = ({
  data: { feature, quantity, title, price, onClick },
}: {
  data: SubscriptionCardProps;
}) => (
  <div className="w-96 p-8 bg-cyan-50 text-center rounded-3xl border-2 shadow-xl border-blue-900 transform scale-125">
    <h1 className="font-semibold text-2xl">{title}</h1>
    <p className="pt-2 tracking-wide">
      <span className="text-gray-600 align-top">$ </span>
      <span className="text-3xl font-semibold">{(price / 12).toFixed(2)}</span>
      <span className="text-gray-600 font-medium">/ channel per month</span>
    </p>
    <hr className="mt-4 border-1 border-gray-600" />
    <div className="pt-8">
      <p className="text-left">
        <HiCheckCircle className="inline ml-2" />
        <span className="pl-2">20% off!</span>
      </p>
      <p className="text-left pt-5">
        <HiCheckCircle className="inline ml-2" />
        <span className="pl-2">New icebreakers added weekly </span>
      </p>
      <p className="text-left pt-5">
        <HiCheckCircle className="inline ml-2" />
        <span className="pl-2">Add your own icebreakers</span>
      </p>
      <p className="text-left pt-5">
        <HiCheckCircle className="inline ml-2" />
        <span className="pl-2">Edit & schedule upcoming messages </span>
      </p>

      <button onClick={onClick} className="">
        <p className="w-full py-4 bg-blue-900 mt-8 px-8 rounded-full text-white">
          <span className="font-medium">Choose This Plan</span>
          <HiArrowRight className="inline ml-2" />
        </p>
      </button>
    </div>
    <div className="absolute top-4 right-4">
      <p className="bg-blue-900 text-white font-semibold px-4 py-1 rounded-full uppercase text-xs">
        Best Value
      </p>
    </div>
  </div>
);

export default function Dashboard() {
  const router = useRouter();
  const [products, setProducts] = useState(null);

  const pay = async (pricingId: string) => {
    const data = await subscriptionService.pay(pricingId);
    window.open(data.paymentURL);
  };

  useEffect(() => {
    const getSubscriptions = async () => {
      const subscriptions = await subscriptionService.getProducts();
      setProducts(
        subscriptions.prices[0].metadata.bestValue === "yes"
          ? [subscriptions.prices[1], subscriptions.prices[0]]
          : subscriptions.prices
      );
    };

    getSubscriptions();

    if (!authService.getUser()) {
      router.replace("/");
      return;
    }
    segmentService.track("viewed_billing");
  }, []);

  return (
    <>
      <Head>
        <title>Banter Bi</title>
        <meta name="description" content="Banter Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toast />
      <div>
        <NavBar />
        <div className="mt-8">
          <div className="">
            <div className="text-center font-semibold">
              <h1 className="text-5xl">
                All you can{" "}
                <span className="text-blue-900 tracking-wide">Banter.</span>
              </h1>
              <h1 className="text-5xl">One simple price.</h1>

              <p className="pt-6 text-xl text-gray-600 font-normal w-full px-8 md:w-full">
                Faster and easier than having a person manually send ice
                breakers in Slack.
              </p>
            </div>
            <div className="flex justify-center pt-20">
              {products?.map((product) => {
                const standardizedProduct = {
                  bestValue: product.metadata.bestValue === "yes",
                  feature: product.metadata.feature,
                  quantity: product.metadata.quantity,
                  title: product.metadata.title,
                  price: product.unit_amount / 100,
                };
                if (standardizedProduct.bestValue) {
                  return (
                    <Popular
                      key={product.id}
                      data={{
                        ...standardizedProduct,
                        onClick: () => pay(product.id),
                      }}
                    />
                  );
                }
                return (
                  <BasicCard
                    key={product.id}
                    data={{
                      ...standardizedProduct,
                      onClick: () => pay(product.id),
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

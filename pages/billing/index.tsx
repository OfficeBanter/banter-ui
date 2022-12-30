import React, { useEffect, useState } from "react";
import Head from "next/head";
import authService from "../../services/auth.service";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import Toast from "../../components/Toast";
import { useSettings } from "../../services/setting.context";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import subscriptionService from "../../services/subscription.service";
import { HiArrowRight, HiCheck } from "react-icons/hi";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY); // starts with pk_

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
  <div className="w-96 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl">
    <h1 className="text-black font-semibold text-2xl">{title}</h1>
    <p className="pt-2 tracking-wide">
      <span className="text-gray-400 align-top">$ </span>
      <span className="text-3xl font-semibold">{price}</span>
      <span className="text-gray-400 font-medium">/ channel</span>
    </p>
    <hr className="mt-4 border-1" />
    <div className="pt-8">
      <p className="font-semibold text-gray-400 text-left">
        <HiCheck className="inline ml-2" />
        <span className="pl-2">New icebreakers added weekly </span>
      </p>
      <p className="font-semibold text-gray-400 text-left pt-5">
        <HiCheck className="inline ml-2" />
        <span className="pl-2">Add your own icebreakers</span>
      </p>
      <p className="font-semibold text-gray-400 text-left pt-5">
        <HiCheck className="inline ml-2" />
        <span className="pl-2">Edit & schedule upcoming messages </span>
      </p>

      <button onClick={onClick} className="">
        <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
          <span className="font-medium">Choose Plan</span>
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
  <div className="w-96 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
    <h1 className="text-white font-semibold text-2xl">{title}</h1>
    <p className="pt-2 tracking-wide">
      <span className="text-gray-400 align-top">$ </span>
      <span className="text-3xl font-semibold">{(price / 12).toFixed(2)}</span>
      <span className="text-gray-400 font-medium">/ channel</span>
    </p>
    <hr className="mt-4 border-1 border-gray-600" />
    <div className="pt-8">
      <p className="font-semibold text-gray-400 text-left">
        <HiCheck className="inline ml-2" />
        <span className="pl-2">20% off!</span>
      </p>
      <p className="font-semibold text-gray-400 text-left pt-5">
        <HiCheck className="inline ml-2" />
        <span className="pl-2">New icebreakers added weekly </span>
      </p>
      <p className="font-semibold text-gray-400 text-left pt-5">
        <HiCheck className="inline ml-2" />
        <span className="pl-2">Add your own icebreakers</span>
      </p>
      <p className="font-semibold text-gray-400 text-left pt-5">
        <HiCheck className="inline ml-2" />
        <span className="pl-2">Edit & schedule upcoming messages </span>
      </p>

      <button onClick={onClick} className="">
        <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
          <span className="font-medium">Choose Plan</span>
          <HiArrowRight className="inline ml-2" />
        </p>
      </button>
    </div>
    <div className="absolute top-4 right-4">
      <p className="bg-blue-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">
        Popular
      </p>
    </div>
  </div>
);

export default function Dashboard() {
  const router = useRouter();
  const [products, setProducts] = useState(null);

  const pay = async (pricingId: string) => {
    const data = await subscriptionService.pay(pricingId);
    window.location = data.paymentURL;
  };

  useEffect(() => {
    const getSubscriptions = async () => {
      const subscriptions = await subscriptionService.getProducts();
      setProducts(subscriptions);
    };

    getSubscriptions();

    if (!authService.getUser()) {
      router.replace("/");
      return;
    }
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
        <div className="">
          <div className="">
            <div className="text-center font-semibold">
              <h1 className="text-5xl">
                <span className="text-blue-700 tracking-wide">Flexible </span>
                <span>Plans</span>
              </h1>
              <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
                Choose a plan that works best for you and
                <br /> your team.
              </p>
            </div>
            <div className="flex justify-center pt-20">
              {products?.prices?.map((product) => {
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

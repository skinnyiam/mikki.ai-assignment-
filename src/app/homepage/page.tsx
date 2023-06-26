"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useFireStore from "../hooks/useFirestore";
import Card from "../components/card";
import Loading from "../loading";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
type Props = {};
const Page = (props: Props) => {
  const [randomData, setRandomData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [data, setData] = useState<string[]>([]);
  const { saveData, getData } = useFireStore();
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const auth = getAuth();
  const router = useRouter();
  const getRandomData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/`);
      const data = response.data;
      console.log(data.content);
      setRandomData(data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    console.log(auth);
    signOut(auth);
    router.push("/");
    router.push("/");
  };

  const uploadData = () => {
    var today = new Date();
    var time = today.getTime();
    console.log(time);
    setTime(time);
    if (user !== null) {
      saveData(user, { randomData }, time);
    } else {
      // Handle the case when user is null
      console.log("User is null. Cannot save data.");
    }
    setRandomData("");
  };
  useEffect(() => {
    const getAllRandomData = () => {
      if (user) {
        getData(user).then((data) => {
          setData(data);
          console.log(data);
        });
      }
    };
    getAllRandomData();
  }, [getData, user]);

  return (
    <div className="flex justify-center items-center flex-col max-w-[1140px] mx-auto">
      <div className="flex justify-between w-full">
        <button
          onClick={getRandomData}
          className="mt-8 text-white flex gap-2 justify-center items-center bg-neutral-800  border-gray-800 border focus:outline-none hover:bg-neutral-900 transition ease-in-out duration-300  focus:ring-neutral-900 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 "
        >
          Generate random data{" "}
        </button>
        <button
          onClick={logOut}
          className="mt-8 text-white flex gap-2 justify-center items-center bg-neutral-800  border-gray-800 border focus:outline-none hover:bg-neutral-900 transition ease-in-out duration-300  focus:ring-neutral-900 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 "
        >
          SignOut
        </button>
      </div>

      {!randomData ? (
        <h1 className="text-white font-medium text-xl mt-4">
          Here&apos;s list of all random data
        </h1>
      ) : (
        <div className="mt-6 flex justify-center flex-col items-center border border-gray-800 rounded-md">
          <h1 className=" p-6 text-white text-xl">{randomData}</h1>
          <button
            onClick={uploadData}
            className="mt-8  text-white flex gap-2 justify-center items-center bg-neutral-800  border-gray-800 border focus:outline-none hover:bg-neutral-900 transition ease-in-out duration-300  focus:ring-neutral-900 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 "
          >
            Save
          </button>
        </div>
      )}
      {loading ? <Loading /> : ""}
      {!data ? (
        ""
      ) : (
        <div className="mt-6 mb-4">
          {data?.map((d: any) => {
            return <Card key={d?.id} randomData={d.datas?.randomData} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Page;

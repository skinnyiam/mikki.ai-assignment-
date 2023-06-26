"use client";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { initFirebase } from "../config/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { useRouter } from "next/navigation";
type Props = {};

const Hero = (props: Props) => {
  const router = useRouter();
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const handleGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        router.push(`/homepage?user=${user.uid}`);
      } else {
        router.push("/");
      }
    });
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div>
        <h1 className="font-medium text-2xl text-white">Welcome to Mikki.Ai</h1>
      </div>
      <div>
        <button
          onClick={handleGoogle}
          className="flex justify-center items-center hover:bg-neutral-900 transition ease-in-out duration-300 p-3 rounded-lg mt-2 font-medium text-white bg-neutral-800 "
        >
          <FcGoogle className="text-2xl mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Hero;

"use client";
import React from 'react';
import oneko from '../Images/oneko-jump.png';
import Image from 'next/image';
import Header from '../Components/Header';
export default function Custom404() {

  function goBack() {
    window.history.back();
  }

  return (
    <>
     <Header />
     <div className="font-bungee-tint bg-[#282828] flex-col py-100 items-center justify-center flex align-center">
      <Image src={oneko} height={75} alt="ONEKO" />
      <div className='text-4xl font-space-grotesk'>
        404 No Page
      </div>
      <div className='text-2xl font-bungee-tint'>
        are you lost?
      </div>
      <div>
        <button onClick={goBack} className='mt-4 cursor-pointer font-montserrat underline'>
        let's go home...
        </button>
      </div>
     </div>
    </>
  );
}
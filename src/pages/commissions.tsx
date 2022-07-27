import React from 'react'

const Comissions = () => {
  return (
    <>
      <div className="w-screen bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x overflow-y-hidden">
        <div className="h-64"></div>
        <h1 className='font-stretch text-center text-periwinkle text-6xl pl-4'>
          <span>COM</span> <span className="relative -left-8">MISSIONS</span>
        </h1>
        <div className="bg-holo bg-cover mt-8 py-2">
          <h2 className='font-stretch text-center text-greyblack text-3xl'>INFORMATION AND FORM_</h2>
        </div>
      </div>

      <div className="w-screen px-[20%] pt-12 bg-pattern-holo-short bg-[length:1920px_330px] bg-repeat-x bg-bottom overflow-y-hidden">
        <div className="flex flex-row">
          <div className="inline-block w-[40%]">
            <div className="w-full h-[40%] text-center bg-periwinkle flex flex-col justify-around">
              <h2 className="font-stretch text-xl text-greyblack">TERMS</h2>
            </div>
            <div className="h-[20%]"></div>
            <div className="w-full h-[40%] text-center bg-periwinkle flex flex-col justify-around">
              <h2 className="font-stretch text-xl text-greyblack">FORM</h2>
            </div>
          </div>
          <div className="inline-block w-[5%]"></div>
          <div className="inline-block w-[55%] border-2 border-white p-6">
            <p className="text-periwinkle font-neou text-xl">IN MY PATRON POST BELOW YOU WILL FIND ALL THE INFORMATION NEEDED IN ORDER TO COMMISSION ME.</p>
            <div className="h-6"></div>
            <p className="text-periwinkle font-neou text-xl">TO THE LEFT YOU WILL FIND MY TERMS AND COMMISSIONS FOR USING MY SERVICES. PLEASE READ IT CAREFULLY BEFORE FILLING OUT THE FORM</p>
          </div>
        </div>
        <div className="h-12"></div>
        <div className="bg-mint w-full p-8">
          <h2 className="font-stretch text-xl text-greyblack text-center">READ ABOUT MY <span>COM</span> <span className="relative -left-3">MISSIONS HERE</span></h2>
        </div>
        <div className="h-64"></div>
      </div>

    </>
  )
};




export default Comissions
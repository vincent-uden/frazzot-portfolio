import React from 'react'

const Contact = () => {
  return (
    <>
      <div className="w-screen bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x overflow-y-hidden">
        <div className="h-64"></div>
        <h1 className='font-stretch text-center text-pastelpink text-6xl pl-4'>
          CONTACT
        </h1>
        <div className="bg-holo bg-cover mt-8 mb-16 py-2">
          <h2 className='font-stretch text-center text-greyblack text-3xl'><span>HOW TO CONTACT AND CON</span> <span className='relative -left-4'>NECT WITH ME_</span></h2>
        </div>
      </div>
      <div className="flex flex-row px-48">
        <aside>
          <div className="border-2 p-12">
            <h2 className="font-stretch text-2xl text-pastelpink no-ligature">COLLABORATION ?</h2>
            <p className="font-cocogoose font-thin text-pastelpink text-lg">IF YOU WISH TO COLLABORATE WITH ME. REACH OUT TO ME THROUGH EMAIL OR DISCORD</p>
          </div>
          <div className="border-2 p-12 my-8">
            <h2 className="font-stretch text-2xl text-pastelpink no-ligature">ORDER PHYSICAL COPIES ?</h2>
            <p className="font-cocogoose font-thin text-pastelpink text-lg">SINCE I HAVE NO STORE, THERE ARE NO SET PRICES ON MY PHYSICAL COPIES. YOU CAN REACH OUT TO ME THROUGH EMAIL IF YOU'RE INTERESTED.</p>
            <p className="font-cocogoose font-thin text-pastelpink">IF YOU'RE INTERESTED IN ORDERING OTHER PRODUCTS I CREATE LIKE PAINTED CLOTHING OR PAINTINGS, REACH OUT TO ME THROUGH EMAIL.</p>
          </div>
          <div className="border-2 p-12">
            <h2 className="font-stretch text-2xl text-pastelpink"><span className='no-ligature'>COMM</span>ISSION ?</h2>
            <p className="font-cocogoose font-thin text-pastelpink text-lg">IF YOU WISH TO COLLABORATE WITH ME. REACH OUT TO ME THROUGH EMAIL OR DISCORD</p>
          </div>
        </aside>
        <div className="bg-holo w-8 mx-8"></div>
        <aside className="flex flex-col">
          <h2 className="font-stretch text-2xl text-pastelpink w-[20em]">EMAIL FORM</h2>
          <div className="h-8"></div>
          <form action="" method="post" className="flex flex-col justify-between flex-grow">
            <div>
              <label htmlFor="name" className="block mb-4 text-pastelpink font-cocogoose font-thin text-lg">NAME</label>
              <input className="block text-pastelpink bg-transparent border-b-2 border-pastelpink w-full text-xl font-cocogoose font-thin outline-none" type="text" name="" id="name" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-4 text-pastelpink font-cocogoose font-thin text-lg">EMAIL ADDRESS</label>
              <input className="block text-pastelpink bg-transparent border-b-2 border-pastelpink w-full text-xl font-cocogoose font-thin outline-none" type="email" name="" id="email" />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-4 text-pastelpink font-cocogoose font-thin text-lg">SUBJECT</label>
              <textarea className="block text-pastelpink bg-transparent border-2 border-pastelpink w-full text-lg font-cocogoose font-thin outline-none p-2 resize-none" name="" id="subject" rows={6} maxLength={500} />
            </div>
            <button type="submit" className="block bg-pastelpink font-stretch text-2xl text-greyblack py-4 border-2 border-pastelpink hover:bg-greyblack hover:text-pastelpink transition-colors">SUBMIT</button>
          </form>
        </aside>
      </div>
      <div className="h-40"></div>
      <div className="w-full flex flex-row">
        <aside className="bg-pastelpink px-24 py-12">
          <img src="/DiscordBrand.svg" alt="" />
        </aside>
        <aside className="bg-holo bg-cover flex-grow relative shadow-left">
          <h2 className='absolute w-full font-stretch text-center text-greyblack text-3xl no-ligature top-1/2 -translate-y-1/2'>JOIN MY COMMUNITY HERE &gt;</h2>
        </aside>
      </div>

      <div className="w-screen px-[20%] h-72 pt-12 bg-pattern-holo-short bg-[length:1920px_330px] bg-repeat-x bg-bottom overflow-y-hidden">
      </div>
    </>
  )
}

export default Contact
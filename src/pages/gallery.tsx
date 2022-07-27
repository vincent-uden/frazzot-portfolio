import type { NextPage } from 'next';

import Image from 'next/image';
import { trpc } from '../utils/trpc';

import { useCallback, useState } from 'react';

const Gallery = () => {
  const { data: images, refetch } = trpc.useQuery(["gallery.getAll"]);


  return (
    <>
      <div className="w-screen bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x overflow-y-hidden">
        <div className="h-64"></div>
        <h1 className='font-stretch text-center text-periwinkle text-6xl pl-4'>
          <span>GAL</span> <span className="relative -left-8">LERY</span>
        </h1>
        <div className="bg-holo bg-cover mt-8 py-2">
          <h2 className='font-stretch text-center text-greyblack text-3xl'>A SELECTION OF MY DIGITAL ARTWORKS_</h2>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        {images?.map((img, i) => {
          return (
            <div key={i} className="w-1/3">
              <h2 className='text-3xl text-purple-200 my-4'>{img.name}</h2>
              <Image
                key={i}
                src={img.path}
                width={500}
                height={650}
                layout='responsive'
                alt={img.name}
              />
            </div>
          )
        })}
      </div>
      <div className="h-40">
      </div>
    </>
  )
}

export default Gallery
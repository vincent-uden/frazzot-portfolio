import type { NextPage } from 'next';

import Image from 'next/image';
import { trpc } from '../utils/trpc';

import { useCallback, useState } from 'react';

const Gallery = () => {
    const { data: images, refetch } = trpc.useQuery(["gallery.getAll"]);


    return (
        <>
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
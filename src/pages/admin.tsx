import { useCallback, useState } from 'react';
import { trpc } from '../utils/trpc';
import cuid from 'cuid';

const Admin = () => {
    const [imageName, setImageName] = useState<string>("");
    const [uploadData, setUploadData] = useState<FileList | null>();

    const { data: images, refetch } = trpc.useQuery(["gallery.getAll"]);

    const imageInsertMut = trpc.useMutation(["gallery.insertOne"], {
        onSuccess: () => refetch(),
    });

    const imageDeleteAllMut = trpc.useMutation(["gallery.deleteAll"], {
        onSuccess: () => refetch(),
    })

    const imageDeleteOneMut = trpc.useMutation(["gallery.deleteById"], {
        onSuccess: () => refetch(),
    })

    const deleteAll = useCallback(() => {
        imageDeleteAllMut.mutate();
    }, [imageDeleteAllMut]);

    const deleteById = useCallback((id: string) => {
        imageDeleteOneMut.mutate({
            id: id,
        })
    }, []);

    const bigImage = useCallback(() => {
        const chunkSize = 500_000;
        let chunkId = 0;
        let imageCuid = cuid();
        const reader = new FileReader();
        reader.readAsDataURL(uploadData!![0]!!);
        reader.onload = () => {
            let chunkAmount = Math.ceil(((reader.result as string).length) / chunkSize)
            console.log(chunkAmount);
            for (let i = 22; i < (reader.result as string).length; i += chunkSize) {
                let chunk = (reader.result as string).slice(i, i + chunkSize);
                fetch("/api/bigfile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    body: JSON.stringify({
                        title: imageName,
                        fileName: uploadData!![0]!!.name,
                        data: chunk,
                        chunkId,
                        chunkAmount,
                        cuid: imageCuid,
                    })
                }).then()
                chunkId++;
            }

            imageInsertMut.mutate({
                name: imageName,
                path: `/gallery/${uploadData!![0]!!.name}`,
            })
        }
    }, [uploadData, imageName, imageInsertMut]);

    return (
        <>
            <div className='flex flex-col justify-around items-center h-full'>
                <input type="text" name="newName" id="newName" className='block w-80 mb-20 mt-10 bg-transparent border-b-purple-300 border-b-2 text-white text-lg outline-none' placeholder='Image Name' onChange={(e) => setImageName(e.target.value)} value={imageName} />
                <input
                    className='text-white mb-10'
                    type="file"
                    onChange={(e) => {
                        setUploadData(e.target.files ? e.target.files : new FileList());
                    }}
                />
                <button className="text-purple-300 font-bold bg-transparent p-5 rounded-xl border-4 border-purple-300 hover:text-slate-900 hover:bg-purple-300 transition-colors w-60 block mt-10" onClick={() => bigImage()}>Upload Image</button>
            </div>
            <div className='z-10'>
                {images?.map((img) => {
                    return (
                        <div key={img.id} className="mt-10 mb-10 flex justify-between items-center w-full">
                            <p className="text-white mt-1" >{img.id + " " + img.name + " " + img.path}</p>
                            <button
                                className='bg-red-600 text-white font-extrabold text-2xl w-10 h-10 rounded-lg shadow-hard-xl-red hover:bg-white hover:text-red-600 transition-colors'
                                onClick={() => deleteById(img.id)}
                            >
                                X
                            </button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Admin;
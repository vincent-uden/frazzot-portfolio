import { useCallback, useRef, useState } from "react";
import { trpc } from "../utils/trpc";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "universal-cookie";

import cuid from "cuid";
import InputLabel from "../components/InputLabel";
import { EmailError } from "../utils/errortypes";
import SubmitButton from "../components/SubmitButton";

const Admin = () => {
  const [imageName, setImageName] = useState<string>("");
  const [uploadData, setUploadData] = useState<FileList | null>();
  const [jwt, setJwt] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const uploadDivRef = useRef<HTMLDivElement | null>(null);

  const [loginErrors, setLoginErrors] = useState<EmailError[]>([]);

  const cookies = new Cookies();

  const { data: images, refetch } = trpc.useQuery(["gallery.getAll"]);

  const imageInsertMut = trpc.useMutation(["gallery.insertOne"], {
    onSuccess: () => refetch(),
  });

  const imageDeleteAllMut = trpc.useMutation(["gallery.deleteAll"], {
    onSuccess: () => refetch(),
  });

  const imageDeleteOneMut = trpc.useMutation(["gallery.deleteById"], {
    onSuccess: () => refetch(),
  });

  const deleteAll = useCallback(() => {
    imageDeleteAllMut.mutate();
  }, [imageDeleteAllMut]);

  const submitLoginMut = trpc.useMutation(["admin.submitLogin"], {
    onSuccess: ({ errors, token }) => {
      setLoginErrors(errors);
      if (errors.length > 0) {
        let btn = document.getElementById("submitBtn");
        btn?.classList.toggle("shake-anim");
        setTimeout(() => {
          btn?.classList.toggle("shake-anim");
        }, 300);
      } else {
        setJwt(token);
        cookies.set("session_token", token);
      }
    },
  });

  const deleteById = useCallback((id: string) => {
    imageDeleteOneMut.mutate({
      id: id,
    });
  }, []);

  const bigImage = useCallback(() => {
    const chunkSize = 500_000;
    let chunkId = 0;
    let imageCuid = cuid();
    const reader = new FileReader();
    reader.readAsDataURL(uploadData!![0]!!);
    reader.onload = () => {
      let chunkAmount = Math.ceil((reader.result as string).length / chunkSize);
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
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            let msg = JSON.parse(data.message);
            if (msg.completed) {
              imageInsertMut.mutate({
                name: imageName,
                path: `${uploadData!![0]!!.name}`,
                w: msg.w,
                h: msg.h,
                thmb_w: msg.thmb_w,
                thmb_h: msg.thmb_h,
              });
              if (
                (uploadDivRef.current?.children[1] as HTMLElement).style != null
              ) {
                (
                  uploadDivRef.current!!.children[1] as HTMLElement
                ).style.opacity = "1";
              }
              setTimeout(() => {
                if (
                  (uploadDivRef.current?.children[1] as HTMLElement).style !=
                  null
                ) {
                  (
                    uploadDivRef.current!!.children[1] as HTMLElement
                  ).style.opacity = "0";
                }
              }, 2000);
            }
          });
        chunkId++;
      }
    };
  }, [uploadData, imageName, imageInsertMut]);

  return (
    <>
      <div className="h-16"></div>
      <div className="w-screen bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x overflow-y-hidden">
        <div className="h-16"></div>
        <div className="flex flex-col justify-around items-center h-full">
          <InputLabel
            htmlFor="name"
            text="YOUR NAME"
            color="periwinkle-light"
            errors={loginErrors}
            errorCodes={[
              { code: EmailError.EmptyName, message: "Can't be empty" },
            ]}
          />
          <input
            className="text-input text-periwinkle-light focus:border-lilac transition-colors border-periwinkle w-64"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputLabel
            htmlFor="password"
            text="PASSWORD"
            color="periwinkle-light"
            errors={loginErrors}
            errorCodes={[
              { code: EmailError.EmptyPassword, message: "Can't be empty" },
            ]}
          />
          <input
            className="text-input text-periwinkle-light focus:border-lilac transition-colors border-periwinkle w-64"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="h-8"></div>
          <SubmitButton
            color="mint"
            text="LOG IN"
            success={loginErrors.length > 0 && jwt != null}
            onClick={(_) =>
              submitLoginMut.mutate({
                name,
                password,
              })
            }
          />
          <button
            className="text-periwinkle-light font-cocogoose font-thin bg-transparent p-5 rounded-xl border-4 border-periwinkle hover:text-slate-900 hover:bg-periwinkle transition-colors w-60 block mt-10"
            onClick={() => {
              setJwt(null);
              cookies.remove("session_token");
            }}
          >
            Log out
          </button>
        </div>
      </div>
      {jwt != null && (
        <>
          <div className="h-32"></div>
          <div className="flex flex-col justify-around items-center h-full">
            <input
              type="text"
              name="newName"
              id="newName"
              className="block w-80 mb-20 mt-10 bg-transparent border-b-purple-300 border-b-2 text-white text-lg outline-none"
              placeholder="Image Name"
              onChange={(e) => setImageName(e.target.value)}
              value={imageName}
            />
            <input
              className="text-white mb-10"
              type="file"
              onChange={(e) => {
                setUploadData(e.target.files ? e.target.files : new FileList());
              }}
            />
            <div className="relative" ref={uploadDivRef}>
              <button
                className="text-purple-300 font-bold bg-transparent p-5 rounded-xl border-4 border-purple-300 hover:text-slate-900 hover:bg-purple-300 transition-colors w-60 block mt-10"
                onClick={() => bigImage()}
              >
                Upload Image
              </button>
              <FontAwesomeIcon
                className="absolute top-1/2 left-full text-green-400 w-10 h-10 mx-4 cursor-pointer opacity-0 transition-opacity"
                icon={faCheck}
              />
            </div>
          </div>
          <div className="z-10 px-8 mt-8">
            <table className="w-full">
              <tbody className="w-full">
                <tr className="border-b-2 border-white">
                  <th className="text-white text-left">createdAt</th>
                  <th className="text-white text-left">id</th>
                  <th className="text-white text-left">name</th>
                  <th className="text-white text-left">path</th>
                  <th className="text-white text-left">w</th>
                  <th className="text-white text-left">h</th>
                  <th className="text-white text-left">thmb_w</th>
                  <th className="text-white text-left">thmb_h</th>
                </tr>
                {images?.map((img) => {
                  return (
                    <tr className="border-b-2 border-white" key={img.id}>
                      <td className="text-white py-2">
                        {img.createdAt.toDateString()}
                      </td>
                      <td className="text-white">{img.id}</td>
                      <td className="text-white">{img.name}</td>
                      <td className="text-white">{img.path}</td>
                      <td className="text-white">{img.w}</td>
                      <td className="text-white">{img.h}</td>
                      <td className="text-white">{img.thmb_w}</td>
                      <td className="text-white">{img.thmb_h}</td>
                      <td
                        className="text-red-500 font-bold cursor-pointer"
                        onClick={() => deleteById(img.id)}
                      >
                        Delete
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="h-16"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Admin;

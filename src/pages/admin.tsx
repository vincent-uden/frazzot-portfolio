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

        refetch();
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
            token: jwt,
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
            }
          });
        chunkId++;
      }
    };
  }, [uploadData, imageName, imageInsertMut]);

  return (
    <>
      <div className="hidden border-pastelpink"></div>
      <div className="h-16"></div>
      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x">
        <div className="h-64"></div>
        <div className="mx-auto flex h-full max-w-screen-sm flex-col items-stretch justify-around">
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
            className="text-input w-full border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
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
            className="text-input w-full border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
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
          <div className="h-8"></div>
          <SubmitButton
            color="pastelpink"
            text="LOG OUT"
            success={loginErrors.length > 0 && jwt != null}
            onClick={(_) => {
              setJwt(null);
              cookies.remove("session_token");
            }}
          />
        </div>
      </div>

      {/* Gallery Management */}
      {jwt != null && (
        <>
          <div className="h-32"></div>
          <div className="w-full">
            <div className="mx-auto flex h-full max-w-screen-sm flex-col items-stretch justify-around">
              <input
                className="text-input w-full border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
                type="text"
                name="newName"
                id="newName"
                placeholder="Image Name"
                onChange={(e) => setImageName(e.target.value)}
                value={imageName}
              />
              <div className="h-8"></div>
              <input
                className="mb-10 text-white"
                type="file"
                onChange={(e) => {
                  setUploadData(
                    e.target.files ? e.target.files : new FileList()
                  );
                }}
              />
              <div className="h-8"></div>
              <SubmitButton
                color="mint"
                text="UPLOAD IMAGE"
                success={false}
                onClick={(_) => {
                  bigImage();
                }}
              />
            </div>
          </div>

          {/* Image table */}
          <div className="h-16"></div>
          <div className="mt-8 mb-16 bg-holo bg-cover py-2">
            <h2 className="no-ligature text-center font-stretch text-3xl text-greyblack">
              TABLE OF GALLERY DATA_
            </h2>
          </div>
          <div className="z-10 mt-8 px-8">
            <table className="mx-auto">
              <tbody className="w-full">
                <tr className="border-b-2 border-white">
                  <th className="pr-4 text-left font-cocogoose font-light text-white">
                    Upload Date
                  </th>
                  <th className="pr-4 text-left font-cocogoose font-light text-white">
                    Image Name
                  </th>
                  <th className="pr-4 text-left font-cocogoose font-light text-white">
                    Src Width (px)
                  </th>
                  <th className="pr-4 text-left font-cocogoose font-light text-white">
                    Src Height (px)
                  </th>
                  <th className="pr-4 text-left font-cocogoose font-light text-white">
                    Thmb Width (px)
                  </th>
                  <th className="pr-4 text-left font-cocogoose font-light text-white">
                    Thmb Height (px)
                  </th>
                </tr>
                {images?.map((img) => {
                  return (
                    <tr className="" key={img.id}>
                      <td className="py-2 text-white">
                        {img.createdAt.toDateString()}
                      </td>
                      <td className="font-neuo font-thin text-white">
                        {img.name}
                      </td>
                      <td className="font-neuo font-thin text-white">
                        {img.w}
                      </td>
                      <td className="font-neuo font-thin text-white">
                        {img.h}
                      </td>
                      <td className="font-neuo font-thin text-white">
                        {img.thmb_w}
                      </td>
                      <td className="font-neuo font-thin text-white">
                        {img.thmb_h}
                      </td>
                      <td
                        className="cursor-pointer px-4 font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-greyblack"
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

import { useCallback, useRef, useState } from "react";
import { trpc } from "../utils/trpc";
import Cookies from "universal-cookie";

import cuid from "cuid";
import InputLabel from "../components/InputLabel";
import { EmailError } from "../utils/errortypes";
import SubmitButton from "../components/SubmitButton";
import Head from "next/head";

const Admin = () => {
  const [imageName, setImageName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [uploadData, setUploadData] = useState<FileList | null>();
  const [jwt, setJwt] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [imgS3Key, setImgS3Key] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const uploadDivRef = useRef<HTMLDivElement | null>(null);

  const [loginErrors, setLoginErrors] = useState<EmailError[]>([]);

  const cookies = new Cookies();

  const { data: images, refetch: refetchImgs } = trpc.useQuery([
    "gallery.getAll",
  ]);
  const { data: categories } = trpc.useQuery(["gallery.getAllCategories"]);
  const { data: getS3ImgUrl, refetch: refetchS3 } = trpc.useQuery(
    ["gallery.getS3ImageUrl", { src: imgS3Key }],
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: allS3Urls } = trpc.useQuery([
    "gallery.getAllS3Thumbnails",
    { categoryName: null },
  ]);

  const imageInsertMut = trpc.useMutation(["gallery.insertOne"], {
    onSuccess: () => refetchImgs(),
  });

  const imageDeleteAllMut = trpc.useMutation(["gallery.deleteAll"], {
    onSuccess: () => refetchImgs(),
  });

  const imageDeleteOneMut = trpc.useMutation(["gallery.deleteById"], {
    onSuccess: () => refetchImgs(),
  });

  const s3ImageInsertMut = trpc.useMutation(["gallery.s3InsertOne"], {
    onSuccess: () => {
      refetchImgs();
    },
  });

  const s3GenThmbs = trpc.useMutation(["gallery.s3GenThumbnails"], {
    onSuccess: () => {
      refetchImgs();
    },
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

        refetchImgs();
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
                categoryId: categories?.at(selectedCategory)?.id,
              });
            }
          });
        chunkId++;
      }
    };
  }, [uploadData, imageName, imageInsertMut]);

  const uploadS3 = async () => {
    let file = uploadData!![0]!!;
    let { url, fields } = await s3ImageInsertMut.mutateAsync({
      name: `gallery/${file.name}`,
      type: file.type,
    });

    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      // TRPC convert image mutation
      s3GenThmbs.mutate({
        src: `gallery/${file.name}`,
        name: imageName,
        categoryId: categories?.at(selectedCategory)?.id,
      });
    }
  };

  return (
    <>
      <Head>
        <title>FRAZZOT - Admin</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitLoginMut.mutate({
                  name,
                  password,
                });
              }
            }}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitLoginMut.mutate({
                  name,
                  password,
                });
              }
            }}
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
              <h2 className="font-gothic text-2xl text-periwinkle-light">
                SELECT A CATEGORY
              </h2>
              <ul className="border-2 border-periwinkle p-8">
                {categories?.map((category, i) => {
                  return (
                    <li
                      key={category.id}
                      className={`cursor-pointer font-gothic text-lg text-mint transition-opacity ${
                        i === selectedCategory ? "opacity-100" : "opacity-40"
                      }`}
                      onClick={(e) => setSelectedCategory(i)}
                    >
                      {category.name}
                    </li>
                  );
                })}
              </ul>
              <div className="h-8"></div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-screen-md gap-8">
            <SubmitButton
              color="periwinkle"
              text="UPLOAD TO S3"
              success={false}
              onClick={(_) => uploadS3()}
            />
            <input
              className="text-input w-full border-mint/80 text-mint placeholder-mint/50 transition-colors focus:border-mint"
              type="text"
              name="imgS3Key"
              id="imgS3Key"
              placeholder="Image Path"
              onChange={(e) => setImgS3Key(e.target.value)}
              value={imgS3Key}
            />
            <SubmitButton
              color="mint"
              text="FETCH S3 IMAGE URL"
              success={false}
              onClick={async (_) => {
                refetchS3();
              }}
            />
            <p className="w-full font-mono text-white">{getS3ImgUrl}</p>
            <img src={getS3ImgUrl} alt="" />
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
                  <th className="pr-4 text-left font-gothic text-white">
                    Upload Date
                  </th>
                  <th className="pr-4 text-left font-gothic text-white">
                    Image Name
                  </th>
                  <th className="pr-4 text-left font-gothic text-white">
                    Src Width (px)
                  </th>
                  <th className="pr-4 text-left font-gothic text-white">
                    Src Height (px)
                  </th>
                  <th className="pr-4 text-left font-gothic text-white">
                    Thmb Width (px)
                  </th>
                  <th className="pr-4 text-left font-gothic text-white">
                    Thmb Height (px)
                  </th>
                  <th className="pr-4 text-left font-gothic text-white">
                    Category
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
                      <td className="font-neuo font-thin text-white">
                        {img.category?.name}
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

          {allS3Urls?.map((v, i) => {
            return (
              <img
                src={v.url!!}
                alt=""
                key={`s3img-${i}`}
                className="h-auto w-96"
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default Admin;

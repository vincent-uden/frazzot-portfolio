import { useCallback, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import Cookies from "universal-cookie";

import InputLabel from "../components/InputLabel";
import { EmailError } from "../utils/errortypes";
import SubmitButton from "../components/SubmitButton";
import Head from "next/head";
import { GalleryImage, ImageCategory } from "../db/schema";
import { useAnalytics } from "../utils/useAnalytics";
import { SortableList } from "../components/SortableList";
import { DragHandle, SortableItem } from "../components/SortableItem";
import { cn } from "../utils/cn";

type UiName = {
  id: string;
  name: string;
};

// TODO: Fetch each category individually!
//       Trigger mutation for re-ordering
const Admin = () => {
  const [imageName, setImageName] = useState<string>("");
  const [images, setImages] = useState<
    {
      id: string;
      GalleryImage: GalleryImage;
      ImageCategory: ImageCategory | null;
    }[]
  >([]);
  const [filterCategory, setFilterCategory] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [uploadData, setUploadData] = useState<FileList | null>();
  const [jwt, setJwt] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [imgS3Key, setImgS3Key] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hoveredImage, setHoveredImage] = useState<GalleryImage | null>(null);
  const [hoveredImageX, setHoveredImageX] = useState(0);
  const [hoveredImageY, setHoveredImageY] = useState(0);
  const [draggingRow, setDraggingRow] = useState(false);

  const [uiImageNames, setUiImagesNames] = useState<UiName[]>([]);

  const [loginErrors, setLoginErrors] = useState<EmailError[]>([]);

  const cookies = new Cookies();

  const { data: categories } = trpc.useQuery(["gallery.getAllCategories"]);
  const { data: fetchedImages, refetch: refetchImgs } = trpc.useQuery(
    ["gallery.getImages", {categoryName: categories?.at(filterCategory)?.name ?? null }],
    {
      onSuccess: (data) => {
        const names = [];
        for (const x of data) {
          names.push({ id: x.GalleryImage.id, name: "" });
        }
        setUiImagesNames(names);
        const imgs = data.map((x) => {
          return { id: x.GalleryImage.id, ...x };
        });
        setImages(imgs);
      },
    }
  );

  const { data: getS3ImgUrl, refetch: refetchS3 } = trpc.useQuery(
    ["gallery.getS3ImageUrl", { src: imgS3Key }],
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    let token = cookies.get("session_token");
    if (token != null) {
      setJwt(token);
    }
  }, []);

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
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        cookies.set("session_token", token, {
          secure: true,
          expires: expirationDate,
        });

        refetchImgs();
      }
    },
  });

  const imageDeleteOneMut = trpc.useMutation(["manage.deleteById"], {
    onSuccess: () => refetchImgs(),
  });

  const imageUpdateOneMut = trpc.useMutation(["manage.updateOne"], {
    onSuccess: () => refetchImgs(),
  });

  const s3ImageInsertMut = trpc.useMutation(["manage.s3InsertOne"], {
    onSuccess: () => {
      refetchImgs();
    },
  });

  const s3GenThmbs = trpc.useMutation(["manage.s3GenThumbnails"], {
    onSuccess: () => {
      refetchImgs();
    },
  });

  const deleteById = useCallback((id: string) => {
    imageDeleteOneMut.mutate({
      id: id,
    });
  }, []);

  const updateImageNames = useCallback(() => {
    for (let i = 0; i < uiImageNames.length; i++) {
      if (uiImageNames[i]?.name != "") {
        imageUpdateOneMut.mutate({
          id: uiImageNames[i]!!.id,
          name: uiImageNames[i]!!.name,
        });
      }
    }
  }, [uiImageNames, images]);

  const uploadS3 = async () => {
    let file = uploadData!![0]!!;
    let { url, fields } = await s3ImageInsertMut.mutateAsync({
      name: `gallery/${file.name}`,
      type: file.type,
    });

    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as unknown as string);
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

  const renderImage = (
    img: { GalleryImage: GalleryImage; ImageCategory: ImageCategory | null },
    i: number
  ) => {
    return (
      <>
        <td className="py-4 text-white">
          {img.GalleryImage.createdAt.toDateString()}
        </td>
        <td className="font-neuo px-2 font-thin text-white">
          <input
            className="text-input transition-colors focus:border-lilac"
            type="text"
            placeholder={img.GalleryImage.name}
            value={uiImageNames[i]?.name ?? ""}
            onChange={(e) => {
              const imgNames = uiImageNames.map((uiName) => {
                if (uiName.id == img.GalleryImage.id) {
                  return {
                    id: uiName.id,
                    name: e.target.value,
                  };
                } else {
                  return uiName;
                }
              });
              setUiImagesNames(imgNames);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateImageNames();
              }
            }}
          />
        </td>
        <td className="font-neuo px-2 font-thin text-white">
          {img.GalleryImage.w}
        </td>
        <td className="font-neuo px-2 font-thin text-white">
          {img.GalleryImage.h}
        </td>
        <td className="font-neuo px-2 font-thin text-white">
          {img.GalleryImage.thmb_w}
        </td>
        <td className="font-neuo px-2 font-thin text-white">
          {img.GalleryImage.thmb_h}
        </td>
        <td className="font-neuo font-thin text-white">
          {img.ImageCategory?.name ?? ""}
        </td>
        <td
          className="cursor-pointer px-4 font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-greyblack"
          onClick={() => deleteById(img.GalleryImage.id)}
        >
          Delete
        </td>
      </>
    );
  };

  useAnalytics("/admin");


  return (
    <>
      <Head>
        <title>FRAZZOT ⋄ ADMIN</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hidden border-pastelpink"></div>
      <div className="h-16"></div>
      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x">
        <div className="h-64"></div>
        { jwt == null ? (
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
        </div>
        ) : null}
      </div>


      {/* Gallery Management */}
      {jwt != null && (
        <>
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

          <div className="mx-auto mt-8 grid max-w-screen-md gap-8">
            <SubmitButton
              color="periwinkle"
              text="Regenerate all S3 Urls"
              success={false}
              onClick={(_) => {
                var req1 = new XMLHttpRequest();
                req1.open("GET", "/api/generateS3Urls/Gallery", false);
                req1.send(null);
                console.log("Gallery query");

                var req2 = new XMLHttpRequest();
                req2.open("GET", "/api/generateS3Urls/WARM-UPS", false);
                req2.send(null);
                console.log("WARM-UPS query");

                var req3 = new XMLHttpRequest();
                req3.open(
                  "GET",
                  "/api/generateS3Urls/ILLUSTRATION%20SKETCHES",
                  false
                );
                req3.send(null);
                console.log("Illustration Sketches query");

                var req4 = new XMLHttpRequest();
                req4.open("GET", "/api/generateS3Urls/STUDIES", false);
                req4.send(null);
                console.log("STUDIES query");
              }}
            />
          </div>

          {/* Image table */}
          <div className="h-16"></div>
          <div className="mt-8 mb-16 bg-holo bg-cover py-2">
            <h2 className="no-ligature text-center font-stretch text-3xl text-greyblack">
              TABLE OF GALLERY DATA_
            </h2>
          </div>
          <div className="mb-4 flex flex-row gap-8 px-8">
            {categories?.map((category, i) => {
              return (
                <div
                  className={`flex w-full cursor-pointer flex-col justify-around border-2 border-lilac transition-colors ${
                    filterCategory === i ? "bg-greyblack" : "bg-lilac"
                  }`}
                  onClick={(e) => setFilterCategory(i)}
                >
                  <p
                    className={`no-ligature my-auto py-4 text-center font-stretch text-base transition-transform hover:scale-110 ${
                      filterCategory === i ? "text-lilac" : "text-greyblack"
                    }`}
                  >
                    {category.name}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="z-10 mt-8 px-8">
            <table className="mx-auto">
              <thead>
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
              </thead>
              {/* TODO: Trpc to fetch only one category -> store in state variable since we souldnt modify react query state */}
              <SortableList
                element="tbody"
                items={images}
                onChange={setImages}
                onDragStart={() => setDraggingRow(true)}
                onDragEnd={() => setDraggingRow(false)}
                renderItem={({ i, item }) => (
                  <SortableItem
                    id={item.id}
                    className=""
                    element="tr"
                    onMouseEnter={(_) => setHoveredImage(item.GalleryImage)}
                    onMouseLeave={(_) => setHoveredImage(null)}
                    onMouseMove={(e) => {
                      setHoveredImageX(e.clientX);
                      setHoveredImageY(e.clientY);
                    }}
                  >
                    {renderImage(item, i)}
                    <td className="">
                      <DragHandle className="scale-150 rounded fill-periwinkle-light py-2 px-1 transition-colors hover:bg-white/10" />
                    </td>
                  </SortableItem>
                )}
              />
              <tbody className="w-full">{}</tbody>
            </table>

            <div className="h-16"></div>
          </div>

          <div
            className={cn(
              "pointer-events-none fixed top-0 left-0 z-10 h-fit w-fit shadow-lg transition-opacity",
              draggingRow ? "opacity-0" : "opacity-100"
            )}
            style={{ top: hoveredImageY + 10, left: hoveredImageX }}
          >
            <img
              src={hoveredImage?.url ?? ""}
              alt=""
              className={"h-auto w-48"}
            />
          </div>

          <SubmitButton
            color="pastelpink"
            text="LOG OUT"
            success={loginErrors.length > 0 && jwt != null}
            onClick={(_) => {
              setJwt(null);
              cookies.remove("session_token");
            }}
          />
        </>
      )}
    </>
  );
};

export default Admin;

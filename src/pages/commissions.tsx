import React, { useState } from "react";
import { EmailError } from "../utils/errortypes";
import { trpc } from "../utils/trpc";
import InputLabel from "../components/InputLabel";

const Comissions = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [charAmount, setCharAmount] = useState<string>("");
  const [wishes, setWishes] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [charNames, setCharNames] = useState<string>("");
  const [charDesc, setCharDesc] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  const [errors, setErrors] = useState<EmailError[]>([]);

  const submitFormMut = trpc.useMutation(["email.submitCommission"], {
    onSuccess: (data) => {
      setErrors(data.errors);
      console.log(data.errors);
    },
  });

  return (
    <>
      <div className="w-screen bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x overflow-y-hidden">
        <div className="h-64"></div>
        <h1 className="font-stretch text-center text-periwinkle text-6xl pl-4">
          <span>COM</span> <span className="relative -left-8">MISSIONS</span>
        </h1>
        <div className="bg-holo bg-cover mt-8 py-2">
          <h2 className="font-stretch text-center text-greyblack text-3xl">
            INFORMATION AND FORM_
          </h2>
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
            <p className="text-periwinkle-light font-cocogoose font-thin text-lg">
              IN MY PATREON POST BELOW YOU WILL FIND ALL THE INFORMATION NEEDED
              IN ORDER TO COMMISSION ME.
            </p>
            <div className="h-6"></div>
            <p className="text-periwinkle-light font-cocogoose font-thin text-lg">
              TO THE LEFT YOU WILL FIND MY TERMS AND COMMISSIONS FOR USING MY
              SERVICES. PLEASE READ IT CAREFULLY BEFORE FILLING OUT THE FORM
            </p>
          </div>
        </div>
        <div className="h-12"></div>
        <div className="bg-mint w-full p-8">
          <h2 className="font-stretch text-xl text-greyblack text-center">
            READ ABOUT MY <span>COM</span>{" "}
            <span className="relative -left-3">MISSIONS HERE</span>
          </h2>
        </div>
        <div className="h-8"></div>

        <div className="px-[20%]">
          <h2 className="font-stretch text-2xl text-periwinkle mb-4 mt-24">
            GENERAL INFO
          </h2>
          <InputLabel
            htmlFor="name"
            text="YOUR NAME"
            color="periwinkle-light"
            errors={errors}
            errorCodes={[
              { code: EmailError.EmptyName, message: "Can't be empty" },
            ]}
          />
          <input
            className="text-input focus:border-lilac transition-colors border-periwinkle"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputLabel
            htmlFor="email"
            text="YOUR EMAIL"
            color="periwinkle-light"
            errors={errors}
            errorCodes={[
              { code: EmailError.EmptyEmail, message: "Can't be empty" },
              { code: EmailError.InvalidEmail, message: "Invalid email address" },
            ]}
          />
          <input
            className="text-input focus:border-lilac transition-colors border-periwinkle"
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLabel
            htmlFor="category"
            text="TYPE/CATEGORY OF COMMISSION"
            color="periwinkle-light"
            errors={errors}
            errorCodes={[
              { code: EmailError.EmptyCategory, message: "Can't be empty" },
            ]}
          />
          <input
            className="text-input focus:border-lilac transition-colors border-periwinkle"
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <InputLabel
            htmlFor="charAmount"
            text="HOW MANY CHARACTERS?"
            color="periwinkle-light"
            errors={errors}
            errorCodes={[
              { code: EmailError.EmptyCharAmount, message: "Can't be empty" },
            ]}
          />
          <input
            className="text-input focus:border-lilac transition-colors border-periwinkle"
            type="text"
            name="charAmount"
            id="charAmount"
            value={charAmount}
            onChange={(e) => setCharAmount(e.target.value)}
          />
          <InputLabel
            htmlFor="wishes"
            text="ANY SPECIFIC WISHES OR DETAILS?"
            color="periwinkle-light"
            errors={errors}
            errorCodes={[
              { code: EmailError.EmptyWishes, message: "Can't be empty" },
            ]}
          />
          <input
            className="text-input focus:border-lilac transition-colors border-periwinkle"
            type="text"
            name="wishes"
            id="wishes"
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
          />
          <InputLabel
            htmlFor="background"
            text="BACKGROUND?"
            color="periwinkle-light"
            errors={errors}
            errorCodes={[
              { code: EmailError.EmptyBackground, message: "Can't be empty" },
            ]}
          />
          <input
            className="text-input focus:border-lilac transition-colors border-periwinkle"
            type="text"
            name="background"
            id="background"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />

          <h2 className="font-stretch text-2xl text-periwinkle mt-12 mb-4">
            CHARACTER(S) INFO
          </h2>
          <InputLabel
            htmlFor="charNames"
            text="CHARACTER(S) NAME(S)"
            color="periwinkle-light"
            errors={errors}
            errorCodes={[
              { code: EmailError.EmptyCharNames, message: "Can't be empty" },
            ]}
          />
          <input
            className="text-input focus:border-lilac transition-colors text-mint border-periwinkle"
            type="text"
            name="charNames"
            id="charNames"
            value={charNames}
            onChange={(e) => setCharNames(e.target.value)}
          />
          <InputLabel
            htmlFor="charDesc"
            text="CHARACTER(S) PERSONALITY/DESCRIPTION"
            color="periwinkle-light"
            height="12"
            errors={errors}
            errorCodes={[
              { code: EmailError.EmptyCharDesc, message: "Can't be empty" },
            ]}
          />
          <p className="font-cocogoose font-thin text-periwinkle text-base italic mb-4 opacity-70">
            PLEASE GIVE ME EVERYTHING YOU HAVE ON YOUR CHARACTER THAT YOU WANT
            ME TO HAVE IN MIND WHEN DRAWING THEM - ALSO CHARACTERS FROM SERIES
            SINCE I MIGHT NOT KNOW THEM. YOU CAN ALSO SEND ME A YOUTUBE LINK TO
            A VIDEO PORTRAYING THE CHARACTERS' PERSONALITIES.
          </p>
          <input
            className="text-input focus:border-lilac transition-colors text-mint border-periwinkle"
            type="text"
            name="charDesc"
            id="charDesc"
            value={charDesc}
            onChange={(e) => setCharDesc(e.target.value)}
          />

          <h2 className="font-stretch text-2xl text-periwinkle no-ligature mt-12 mb-4">
            ADDITIONAL INFO
          </h2>
          <p className="font-cocogoose font-thin text-periwinkle text-base italic mb-4 opacity-70">
            THIS IS YOUR PLACE FOR QUESTIONS, CLARIFICATIONS AND ADDITIONAL
            INFORMATION YOU WANT ME TO KNOW. IF YOU WANT TO COMMISSION A
            CHARACTER SHEET, YOU CAN PROVIDE THE ELEMENTS YOU WANT TO INCLUDE IN
            THE SHEET HERE. (E.G. STATS, BIO, EXPRESSIONS, WEAPON, ITEM,
            PALETTE, ICONS, ETC.)
          </p>
          <textarea
            className="text-input border-2 p-2 border-periwinkle resize-none text-base text-sky placeholder:text-sky placeholder:opacity-60 focus:border-lilac transition-colors"
            name="additional-info"
            id="additional-info"
            rows={10}
            maxLength={2500}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          ></textarea>
          <p className="font-cocogoose font-thin text-mint text-center text-base italic mt-12 my-4 opacity-70">
            {" "}
            BY SENDING THIS ORDER I CONFIRM THAT I HAVE READ AND ACCEPTED THE
            TERMS OF SERVICE FOR COMMISSIONING “IDA FRANZÉN KARLSSON, AKA
            FRAZZOT”. (SEE BOTTOM OF THE POST).
          </p>
          <button
            className="block bg-mint font-stretch text-2xl text-greyblack py-4 border-2 border-mint hover:bg-greyblack hover:text-mint transition-colors w-full"
            onClick={(e) =>
              submitFormMut.mutate({
                name,
                email,
                category,
                charAmount,
                wishes,
                background,
                charNames,
                charDesc,
                additionalInfo,
              })
            }
          >
            SUBMIT
          </button>
        </div>
        <div className="h-64"></div>
      </div>
    </>
  );
};

export default Comissions;

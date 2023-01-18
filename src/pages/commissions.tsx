import React, { useState } from "react";
import { EmailError } from "../utils/errortypes";
import { trpc } from "../utils/trpc";
import InputLabel from "../components/InputLabel";
import SubmitButton from "../components/SubmitButton";
import Head from "next/head";

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
  const [success, setSuccess] = useState<boolean>(false);

  const submitFormMut = trpc.useMutation(["email.submitCommission"], {
    onSuccess: (data) => {
      setErrors(data.errors);

      if (data.errors.length > 0) {
        let btn = document.getElementById("submitBtn");
        btn?.classList.toggle("shake-anim");
        setSuccess(false);
        setTimeout(() => {
          btn?.classList.toggle("shake-anim");
        }, 300);
      } else {
        setSuccess(true);
      }

      console.log(data.errors);
    },
  });

  return (
    <>
      <Head>
        <title>FRAZZOT - Commissions</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x">
        <div className="hidden stroke-mint text-mint hover:text-mint"></div>
        <div className="h-64"></div>
        <h1 className="page-header text-periwinkle">
          <span className="no-ligature">COMM</span>
          <span>ISSIONS</span>
        </h1>
        <div className="mt-8 bg-holo bg-cover py-2">
          <h2 className="page-sub-header">
            INFORMATION AND FORM_
          </h2>
        </div>
      </div>

      <div className="w-screen overflow-y-hidden bg-pattern-holo-short bg-[length:1920px_330px] bg-bottom bg-repeat-x px-4 md:px-[20%] pt-12">
        <div className="flex flex-col md:flex-row">
          <div className="block md:inline-block md:w-[40%]">
            <div className="flex h-[40%] w-full flex-col justify-around bg-periwinkle text-center">
              <h2 className="font-stretch text-lg md:text-2xl text-greyblack py-4">TERMS</h2>
            </div>
            <div className="h-6 md:h-[20%]"></div>
            <div className="flex h-[40%] w-full flex-col justify-around bg-mint text-center">
              <h2 className="font-stretch text-lg md:text-2xl text-greyblack py-4">
                INFORMATION
              </h2>
            </div>
          </div>
          <div className="block h-8 md:inline-block md:w-[5%]"></div>
          <div className="block md:inline-block md:w-[55%] bg-holo p-[2px]">
            <div className="bg-greyblack p-6">
              <p className="font-cocogoose text-xs md:text-lg font-extralight text-periwinkle-light">
                BELOW YOU WILL FIND THE FORM TO SUBMIT A COMMISSION. RESPONSE
                WILL BE SENT TO THE EMAIL YOU STATE IN THE FORM.
              </p>
              <div className="h-6"></div>
              <p className="font-cocogoose text-xs md:text-lg font-extralight text-periwinkle-light">
                TO THE LEFT YOU CAN READ MY TERMS AND CONDITIONS FOR USING MY
                SERVICES AS WELL AS ADDITIONAL INFORMATION ON MY PATREON.
              </p>
              <div className="h-6"></div>
              <p className="font-cocogoose text-xs md:text-lg font-extralight text-periwinkle-light">
                PLEASE READ THEM CAREFULLY BEFORE FILLING OUT THE FORM.
              </p>
            </div>
          </div>
        </div>
        <div className="h-12"></div>

        <div className="border-2 md:border-[12px] border-periwinkle px-8 md:px-24 pt-12 md:pt-24 pb-12">
          <h2 className="mb-12 md:mb-4 font-stretch text-xl md:text-2xl text-periwinkle">
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
            className="text-input border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
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
              {
                code: EmailError.InvalidEmail,
                message: "Invalid email address",
              },
            ]}
          />
          <input
            className="text-input border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
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
            className="text-input border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
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
            className="text-input border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
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
            className="text-input border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
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
            className="text-input border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
            type="text"
            name="background"
            id="background"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />

          <h2 className="mt-12 mb-4 font-stretch text-xl md:text-2xl text-periwinkle">
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
            className="text-input border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
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
            height="16"
            errors={errors}
            errorCodes={[
              { code: EmailError.EmptyCharDesc, message: "Can't be empty" },
            ]}
          />
          <p className="mb-4 font-cocogoose text-sm md:text-base font-extralight italic text-periwinkle opacity-70">
            PLEASE GIVE ME EVERYTHING YOU HAVE ON YOUR CHARACTER THAT YOU WANT
            ME TO HAVE IN MIND WHEN DRAWING THEM - ALSO CHARACTERS FROM SERIES
            SINCE I MIGHT NOT KNOW THEM. YOU CAN ALSO SEND ME A YOUTUBE LINK TO
            A VIDEO PORTRAYING THE CHARACTERS' PERSONALITIES.
          </p>
          <input
            className="text-input border-periwinkle text-periwinkle-light transition-colors focus:border-lilac"
            type="text"
            name="charDesc"
            id="charDesc"
            value={charDesc}
            onChange={(e) => setCharDesc(e.target.value)}
          />

          <h2 className="no-ligature mt-12 mb-4 font-stretch text-2xl text-periwinkle">
            ADDITIONAL INFO
          </h2>
          <p className="mb-4 font-cocogoose text-sm md:text-base font-extralight italic text-periwinkle opacity-70">
            THIS IS YOUR PLACE FOR QUESTIONS, CLARIFICATIONS AND ADDITIONAL
            INFORMATION YOU WANT ME TO KNOW. IF YOU WANT TO COMMISSION A
            CHARACTER SHEET, YOU CAN PROVIDE THE ELEMENTS YOU WANT TO INCLUDE IN
            THE SHEET HERE. (E.G. STATS, BIO, EXPRESSIONS, WEAPON, ITEM,
            PALETTE, ICONS, ETC.)
          </p>
          <textarea
            className="w-full border-transparent font-cocogoose font-extralight text-periwinkle-light outline-none resize-none border-2 p-2 text-base transition-colors placeholder:text-pastelpink placeholder:opacity-60 focus:border-periwinkle bg-periwinkle/10"
            name="additional-info"
            id="additional-info"
            rows={10}
            maxLength={2500}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          ></textarea>
          <p className="my-4 mt-12 text-center font-cocogoose text-sm md:text-base font-extralight italic text-mint opacity-70">
            {" "}
            BY SENDING THIS ORDER I CONFIRM THAT I HAVE READ AND ACCEPTED THE
            TERMS OF SERVICE FOR COMMISSIONING “IDA FRANZÉN KARLSSON, AKA
            FRAZZOT”. (SEE BOTTOM OF THE POST).
          </p>
          <SubmitButton
            color="mint"
            success={success}
            onClick={(_) =>
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
          />
        </div>
        <div className="h-64"></div>
      </div>
    </>
  );
};

export default Comissions;

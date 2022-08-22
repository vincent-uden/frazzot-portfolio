import React, { useState } from "react";
import { CommissionError } from "../utils/errortypes";
import { trpc } from "../utils/trpc";

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

  const [errors, setErrors] = useState<CommissionError[]>([]);

  const submitFormMut = trpc.useMutation(["email.submitCommission"], {
    onSuccess: (data) => {
      setErrors(data.errors);
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
          <h2 className="font-stretch text-2xl text-pastelpink mb-4 mt-24">
            GENERAL INFO
          </h2>
          <label htmlFor="" className="label mt-8">
            Name
          </label>
          <input
            className="text-input focus:border-lilac transition-colors"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="" className="label mt-8">
            Email
          </label>
          <input
            className="text-input focus:border-lilac transition-colors"
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="" className="label mt-8">
            Type/Category of commission
          </label>
          <input
            className="text-input focus:border-lilac transition-colors"
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="" className="label mt-8">
            How many characters
          </label>
          <input
            className="text-input focus:border-lilac transition-colors"
            type="text"
            name="charAmount"
            id="charAmount"
            value={charAmount}
            onChange={(e) => setCharAmount(e.target.value)}
          />
          <label htmlFor="" className="label mt-8">
            Any specific wishes or details?
          </label>
          <input
            className="text-input focus:border-lilac transition-colors"
            type="text"
            name="wishes"
            id="wishes"
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
          />
          <label htmlFor="" className="label mt-8">
            Background?
          </label>
          <input
            className="text-input focus:border-lilac transition-colors"
            type="text"
            name="background"
            id="background"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />

          <h2 className="font-stretch text-2xl text-mint mt-12 mb-4">
            CHARACTER(S) INFO
          </h2>
          <label htmlFor="" className="label mt-8 text-mint">
            Character(s) name(s)
          </label>
          <input
            className="text-input focus:border-lilac transition-colors text-mint border-mint"
            type="text"
            name="charNames"
            id="charNames"
            value={charNames}
            onChange={(e) => setCharNames(e.target.value)}
          />
          <label htmlFor="" className="label mt-8 text-mint">
            Character(s) personality/description
          </label>
          <p className="font-cocogoose font-thin text-mint text-base italic mb-4">
            Please give me everything you have on your character that you want
            me to have in mind when drawing them - also characters from series
            since I might not know them. You can also send me a youtube link to
            a video portraying the characters' personalities.
          </p>
          <input
            className="text-input focus:border-lilac transition-colors text-mint border-mint"
            type="text"
            name="charDesc"
            id="charDesc"
            value={charDesc}
            onChange={(e) => setCharDesc(e.target.value)}
          />

          <h2 className="font-stretch text-2xl text-sky no-ligature mt-12 mb-4">
            Additional info
          </h2>
          <p className="font-cocogoose font-thin text-sky text-base italic mb-4">
            This is your place for questions, clarifications and additional
            information you want me to know. If you want to commission a
            character sheet, you can provide the elements you want to include in
            the sheet here. (e.g. stats, bio, expressions, weapon, item,
            palette, icons, etc.)
          </p>
          <textarea
            className="text-input border-2 p-2 border-sky resize-none text-base text-sky placeholder:text-sky placeholder:opacity-60 focus:border-lilac transition-colors"
            name="additional-info"
            id="additional-info"
            rows={10}
            maxLength={2500}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          ></textarea>
          <p className="font-cocogoose font-thin text-yellowpeach text-center text-base italic my-4">
            By sending this order I confirm that I have read and accepted the
            terms of service for commissioning “Ida Franzén Karlsson, aka
            Frazzot”. (See bottom of the post).
          </p>
          <button
            className="block bg-yellowpeach font-stretch text-2xl text-greyblack py-4 border-2 border-yellowpeach hover:bg-greyblack hover:text-yellowpeach transition-colors w-full"
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

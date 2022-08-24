import Link from "next/link";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { EmailError } from "../utils/errortypes";
import InputLabel from "../components/InputLabel";
import SubmitButton from "../components/SubmitButton";

const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [errors, setErrors] = useState<EmailError[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const submitFormMut = trpc.useMutation(["email.submitContact"], {
    onSuccess: (data) => {
      setErrors(data.errors);

      if (data.errors.length > 0) {
        setSuccess(false);
        let btn = document.getElementById("submitBtn");
        btn?.classList.toggle("shake-anim");
        setTimeout(() => {
          btn?.classList.toggle("shake-anim");
        }, 300);
      } else {
        setSuccess(true);
      }
    },
  });

  return (
    <>
      <div className="w-screen bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x overflow-y-hidden">
        <div className="hidden stroke-pastelpink hover:text-pastelpink"></div>
        <div className="h-64"></div>
        <h1 className="font-stretch text-center text-pastelpink text-6xl pl-4">
          CONTACT
        </h1>
        <div className="bg-holo bg-cover mt-8 mb-16 py-2">
          <h2 className="font-stretch text-center text-greyblack text-3xl">
            <span>HOW TO CONTACT AND CON</span>{" "}
            <span className="relative -left-4">NECT WITH ME_</span>
          </h2>
        </div>
      </div>
      <div className="flex flex-row px-48">
        <aside>
          <div className="border-2 p-12 border-lilac">
            <h2 className="font-stretch text-2xl text-pastelpink no-ligature">
              COLLABORATION ?
            </h2>
            <div className="h-8"></div>
            <p className="font-cocogoose font-thin text-pastelpink text-lg">
              IF YOU WISH TO COLLABORATE WITH ME. REACH OUT TO ME THROUGH EMAIL
              OR DISCORD
            </p>
          </div>
          <div className="border-2 p-12 my-8 border-sky">
            <h2 className="font-stretch text-2xl text-pastelpink no-ligature">
              ORDER PHYSICAL COPIES ?
            </h2>
            <div className="h-8"></div>
            <p className="font-cocogoose font-thin text-pastelpink text-lg">
              SINCE I HAVE NO STORE, THERE ARE NO SET PRICES ON MY PHYSICAL
              COPIES. YOU CAN REACH OUT TO ME THROUGH EMAIL IF YOU'RE
              INTERESTED.
            </p>
            <div className="h-4"></div>
            <p className="font-cocogoose font-thin text-pastelpink text-lg">
              IF YOU'RE INTERESTED IN ORDERING OTHER PRODUCTS I CREATE LIKE
              PAINTED CLOTHING OR PAINTINGS, REACH OUT TO ME THROUGH EMAIL.
            </p>
          </div>
          <div className="border-2 p-12 border-mint">
            <h2 className="font-stretch text-2xl text-pastelpink">
              <span className="no-ligature">COMM</span>ISSION ?
            </h2>
            <div className="h-8"></div>
            <p className="font-cocogoose font-thin text-pastelpink text-lg">
              READ MORE ABOUT MY COMMISSIONS ON THE{" "}
              <Link href="/commissions">
                <span className="font-cocogoose font-normal cursor-pointer">
                  COMMISSION PAGE.
                </span>
              </Link>
            </p>
          </div>
        </aside>
        <div className="bg-holo w-8 mx-8"></div>
        <aside className="flex flex-col">
          <h2 className="font-stretch text-2xl text-pastelpink w-[20em]">
            EMAIL FORM
          </h2>
          <div className="h-8"></div>
          <div className="flex flex-col justify-between flex-grow">
            <div>
              <InputLabel
                htmlFor="name"
                text="NAME"
                color="pastelpink"
                errors={errors}
                errorCodes={[
                  { code: EmailError.EmptyName, message: "Can't be empty" },
                ]}
              />
              <input
                className="text-input focus:border-lilac transition-colors"
                type="text"
                name=""
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <InputLabel
                htmlFor="email"
                text="YOUR EMAIL ADDRESS"
                color="pastelpink"
                errors={errors}
                errorCodes={[
                  { code: EmailError.EmptyEmail, message: "Can't be empty" },
                  { code: EmailError.InvalidEmail, message: "Invalid email address" },
                ]}
              />
              <input
                className="text-input focus:border-lilac transition-colors"
                type="email"
                name=""
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <InputLabel
                htmlFor="subject"
                text="MESSAGE"
                color="pastelpink"
                errors={errors}
                errorCodes={[
                  { code: EmailError.EmptyMessage, message: "Can't be empty" },
                ]}
              />
              <textarea
                className="text-input border-2 p-2 resize-none text-base placeholder:text-pastelpink placeholder:opacity-60 focus:border-lilac transition-colors"
                name=""
                id="subject"
                rows={8}
                maxLength={500}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Interested in commissions? Fill out the form on the commission page"
              />
            </div>
            <SubmitButton
              color="pastelpink"
              onClick={(_) => submitFormMut.mutate({ name, email, subject })}
              success={success}
            />
          </div>
        </aside>
      </div>
      <div className="h-40"></div>
      <div className="w-full flex flex-row">
        <aside className="bg-pastelpink px-24 py-12">
          <img src="/DiscordBrand.svg" alt="" />
        </aside>
        <aside className="bg-holo bg-cover flex-grow relative shadow-left">
          <h2 className="absolute w-full font-stretch text-center text-greyblack text-3xl no-ligature top-1/2 -translate-y-1/2 transition-transform hover:scale-110 cursor-pointer py-4">
            <Link href={"https://discord.gg/MAQm86a3Xw"}>
              JOIN MY COMMUNITY HERE &gt;
            </Link>
          </h2>
        </aside>
      </div>

      <div className="w-screen px-[20%] h-72 pt-12 bg-pattern-holo-short bg-[length:1920px_330px] bg-repeat-x bg-bottom overflow-y-hidden"></div>
    </>
  );
};

export default Contact;

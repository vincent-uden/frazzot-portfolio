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
      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x">
        <div className="hidden stroke-pastelpink hover:text-pastelpink"></div>
        <div className="h-64"></div>
        <h1 className="pl-4 text-center font-stretch text-6xl text-pastelpink">
          CONTACT
        </h1>
        <div className="mt-8 mb-16 bg-holo bg-cover py-2">
          <h2 className="text-center font-stretch text-3xl text-greyblack">
            <span>HOW TO CONTACT AND CON</span>{" "}
            <span className="relative -left-4">NECT WITH ME_</span>
          </h2>
        </div>
      </div>
      <div className="flex flex-row px-48">
        <aside>
          <div className="border-2 border-lilac p-12">
            <h2 className="no-ligature font-stretch text-2xl text-pastelpink">
              COLLABORATION ?
            </h2>
            <div className="h-8"></div>
            <p className="font-cocogoose text-lg font-thin text-pastelpink">
              IF YOU WISH TO COLLABORATE WITH ME. REACH OUT TO ME THROUGH EMAIL
              OR DISCORD
            </p>
          </div>
          <div className="my-8 border-2 border-sky p-12">
            <h2 className="no-ligature font-stretch text-2xl text-pastelpink">
              ORDER PHYSICAL COPIES ?
            </h2>
            <div className="h-8"></div>
            <p className="font-cocogoose text-lg font-thin text-pastelpink">
              SINCE I HAVE NO STORE, THERE ARE NO SET PRICES ON MY PHYSICAL
              COPIES. YOU CAN REACH OUT TO ME THROUGH EMAIL IF YOU'RE
              INTERESTED.
            </p>
            <div className="h-4"></div>
            <p className="font-cocogoose text-lg font-thin text-pastelpink">
              IF YOU'RE INTERESTED IN ORDERING OTHER PRODUCTS I CREATE LIKE
              PAINTED CLOTHING OR PAINTINGS, REACH OUT TO ME THROUGH EMAIL.
            </p>
          </div>
          <div className="border-2 border-mint p-12">
            <h2 className="font-stretch text-2xl text-pastelpink">
              <span className="no-ligature">COMM</span>ISSION ?
            </h2>
            <div className="h-8"></div>
            <p className="font-cocogoose text-lg font-thin text-pastelpink">
              READ MORE ABOUT MY COMMISSIONS ON THE{" "}
              <Link href="/commissions">
                <span className="cursor-pointer font-cocogoose font-normal">
                  COMMISSION PAGE.
                </span>
              </Link>
            </p>
          </div>
        </aside>
        <div className="mx-8 w-8 bg-holo"></div>
        <aside className="flex flex-col">
          <h2 className="w-[20em] font-stretch text-2xl text-pastelpink">
            EMAIL FORM
          </h2>
          <div className="h-8"></div>
          <div className="flex flex-grow flex-col justify-between">
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
                className="text-input transition-colors focus:border-lilac"
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
                  {
                    code: EmailError.InvalidEmail,
                    message: "Invalid email address",
                  },
                ]}
              />
              <input
                className="text-input transition-colors focus:border-lilac"
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
                className="text-input resize-none border-2 p-2 text-base transition-colors placeholder:text-pastelpink placeholder:opacity-60 focus:border-lilac"
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
      <div className="flex w-full flex-row">
        <aside className="bg-pastelpink px-24 py-12">
          <img src="/DiscordBrand.svg" alt="" />
        </aside>
        <aside className="relative flex-grow bg-holo bg-cover shadow-left">
          <h2 className="no-ligature absolute top-1/2 w-full -translate-y-1/2 cursor-pointer py-4 text-center font-stretch text-3xl text-greyblack transition-transform hover:scale-110">
            <Link href={"https://discord.gg/MAQm86a3Xw"}>
              JOIN MY COMMUNITY HERE &gt;
            </Link>
          </h2>
        </aside>
      </div>

      <div className="h-72 w-screen overflow-y-hidden bg-pattern-holo-short bg-[length:1920px_330px] bg-bottom bg-repeat-x px-[20%] pt-12"></div>
    </>
  );
};

export default Contact;

import Link from "next/link";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { EmailError } from "../utils/errortypes";
import InputLabel from "../components/InputLabel";
import SubmitButton from "../components/SubmitButton";
import Head from "next/head";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <Head>
        <title>FRAZZOT - Contact</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1090px_220px] bg-[center_top_4rem] bg-repeat-x md:bg-[length:1920px_330px]">
        <div className="hidden stroke-pastelpink hover:text-pastelpink"></div>
        <div className="h-48 md:h-64"></div>
        <h1 className="page-header text-pastelpink">CONTACT</h1>
        <div className="mt-2 md:mt-8 mb-8 md:mb-16 bg-holo bg-cover py-2">
          <h2 className="page-sub-header no-ligature hidden lg:block">
            CONTACT & CONNECT WITH ME_
          </h2>
          <h2 className="page-sub-header no-ligature lg:hidden">
            CONNECT WITH ME_
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 px-4 md:flex md:flex-row xl:px-32 2xl:px-48">
        <div className="mb-24 flex w-screen -translate-x-4 flex-row md:hidden">
          <aside className="bg-pastelpink px-6 py-4">
            <FontAwesomeIcon
              icon={faDiscord}
              className="h-20 w-20 text-greyblack"
            />
          </aside>
          <aside className="relative flex-grow bg-holo bg-cover shadow-left">
            <Link href={"https://discord.gg/MAQm86a3Xw"}>
              <h2 className="no-ligature absolute top-1/2 w-full -translate-y-1/2 cursor-pointer py-4 text-center font-stretch text-xl text-greyblack transition-transform hover:scale-110">
                <span className="block">JOIN MY</span>
                <span className="block">COMMUNITY</span>
                <span className="block">HERE &gt;</span>
              </h2>
            </Link>
          </aside>
        </div>
        <div className="mb-24 h-[2.65rem] w-screen -translate-x-4 bg-pastelpink md:hidden">
          <div className="ml-[10%] w-fit bg-greyblack px-8">
            <h1 className="relative -top-[.40rem] text-center font-stretch text-6xl text-pastelpink">
              FAQ
            </h1>
            <p className="-translate-y-3 font-gothic text-pastelpink">
              AND ANSWERS
            </p>
          </div>
        </div>
        <aside className="mr-0 md:mr-6 lg:mr-0">
          <div className="border-2 border-lilac px-4 py-8 md:px-8 md:py-8 lg:px-12 lg:py-12">
            <h2 className="no-ligature font-stretch text-xl text-pastelpink md:text-2xl">
              COLLABORATION ?
            </h2>
            <div className="h-8"></div>
            <p className="font-gothic text-sm text-pastelpink md:text-lg">
              IF YOU WISH TO COLLABORATE, REACH OUT TO ME THROUGH EMAIL OR
              DISCORD.
            </p>
          </div>
          <div className="my-8 border-2 border-sky px-4 py-8 md:px-8 md:py-8 lg:px-12 lg:py-12">
            <h2 className="no-ligature font-stretch text-xl text-pastelpink md:text-2xl">
              PHYSICAL COPIES ?
            </h2>
            <div className="h-8"></div>
            <p className="font-gothic text-sm text-pastelpink md:text-lg">
              SINCE I HAVE NO STORE, THERE ARE NO SET PRICES ON MY PHYSICAL
              COPIES. YOU CAN REACH OUT TO ME THROUGH EMAIL IF YOU'RE
              INTERESTED.
            </p>
            <div className="h-4"></div>
            <p className="font-gothic text-sm text-pastelpink md:text-lg">
              IF YOU'RE INTERESTED IN ORDERING OTHER PRODUCTS I CREATE LIKE
              PAINTED CLOTHING OR PAINTINGS, REACH OUT TO ME THROUGH EMAIL.
            </p>
          </div>
          <div className="border-2 border-mint px-4 py-8 md:px-8 md:py-8 lg:px-12 lg:py-12">
            <h2 className="font-stretch text-xl text-pastelpink md:text-2xl">
              <span className="no-ligature">COMM</span>ISSION ?
            </h2>
            <div className="h-8"></div>
            <p className="font-gothic text-sm text-pastelpink md:text-lg">
              READ MORE ABOUT MY COMMISSIONS ON THE{" "}
              <Link href="/commissions">
                <span className="cursor-pointer font-gothic font-bold">
                  COMMISSION PAGE.
                </span>
              </Link>
            </p>
          </div>
        </aside>
        <div className="mx-4 hidden w-8 bg-holo lg:block xl:mx-8"></div>
        <aside className="row-start-1 row-end-2 flex flex-col border-2 border-pastelpink p-8 md:w-fit">
          <h2 className="font-stretch text-2xl text-pastelpink md:w-72 lg:w-[20em]">
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
                className="w-full resize-none border-2 border-transparent bg-pastelpink/10 p-2 font-gothic text-base text-pastelpink outline-none transition-colors placeholder:text-pastelpink placeholder:opacity-60 focus:border-pastelpink"
                name=""
                id="subject"
                rows={8}
                maxLength={500}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Interested in commissions? Fill out the form on the commission page"
              />
            </div>
            <div className="h-8"></div>
            <SubmitButton
              color="pastelpink"
              onClick={(_) => submitFormMut.mutate({ name, email, subject })}
              success={success}
            />
          </div>
        </aside>
        <div className="row-start-2 row-end-3 h-24"></div>
      </div>
      <div className="hidden h-40 md:block"></div>
      <div className="hidden w-full flex-row md:flex">
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

      <div className="h-40 lg:h-72 w-screen overflow-y-hidden bg-pattern-holo-short bg-[length:1090px_220px] bg-bottom bg-repeat-x px-[20%] pt-12 md:bg-[length:1920px_330px]"></div>
    </>
  );
};

export default Contact;

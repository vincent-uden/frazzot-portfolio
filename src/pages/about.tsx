import type { NextPage } from "next";
import Head from "next/head";
import FadeIn from "../components/FadeIn";

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>Frazzot - About</title>
            </Head>

            <FadeIn>
                <h2 className="text-3xl text-purple-200 my-4">Hello there!</h2>
                <div className="bg-slate-800 p-4 max-w-lg rounded-md shadow">
                    <p className="text-slate-100 my-2">I'm very happy that you decided to support me and my work! I love creating and reaching out to people that enjoy my work, It provides me with motivation and happiness to continue doing what I love. <span className="font-extrabold">A special thanks to my dear patrons that have been with me for a while now, you're awesome and I love you!! </span></p>

                    <p className="text-slate-100 my-2">If you have any problem, questions or feedback, don't hesitate - contact me! I'll help you as good as I can. </p>

                    <p className="text-slate-100 my-2">Once more, thank you kindly for your generosity and support.</p>

                    <p className="text-slate-100">Kind regards,</p>
                    <p className="text-slate-100">Ida</p>
                </div>
            </FadeIn>
        </>
    )
}

export default About
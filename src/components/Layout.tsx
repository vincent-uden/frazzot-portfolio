import { ReactNode } from "react";

import Header from "./Header";

interface Props {
    children: ReactNode
}

const Layout = ({children}: Props) => {
    return (
        <>
            <div className="main flex flex-col justify-around m-0 p-0 min-h-screen ">
            <Header />
            <img className="fixed -z-5 top-1/4 -right-1/2 w-50 h-50" src="/gggyrate.svg" alt="" />
            <div className="flex-grow justify-center pt-6 bg-gray-900 px-28">
                <div className="container z-10 flex flex-col justify-between">
                    { children }
                </div>
            </div>
            </div>
        </>
    )
}

export default Layout
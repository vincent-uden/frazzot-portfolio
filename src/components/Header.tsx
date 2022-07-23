import Link from "next/link";

const Header = () => {
    return (
        <nav className="flex flex-row justify-start bg-holo p-5 flex-grow-0 shadow-lg z-10">
            {[
                { name: "Home", path: "/" },
                { name: "Gallery", path: "/gallery" },
                { name: "About", path: "/about" },
                { name: "Admin", path: "/admin" },
            ].map(l => {
                return (
                    <Link href={l.path} key={l.name}>
                        <a className="mx-6 text-black text-xl">{l.name}</a>
                    </Link>
                )
            })}
        </nav>
    )
}

export default Header

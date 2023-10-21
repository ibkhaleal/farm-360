"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useData } from './providers/content-provider';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MenuIcon } from 'lucide-react';
import Chat from './chat/chat';

const Logo = () => {
    return (
        <div className="relative w-28 h-10 md:w-36 md:h-14">
            <Image
                src="/logo.png"
                fill
                alt='farm360 logo'
            />
        </div>
    )
}

const Navbar = () => {

    const pathname = usePathname();
    const router = useRouter();

    const { user } = useData();
    const [isOpen, setIsOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push("/")
        }
    }, []);


    const navigation = [
        {
            title: "Overview",
            route: "/main",
            type: ["0"],
            active: pathname === '/main'
        },
        {
            title: "Products",
            route: "/products",
            type: ["2"],
            active: pathname === '/products'
        },
        {
            title: "My Storage",
            route: "/storage",
            type: ["1"],
            active: pathname === '/storage'
        },
        {
            title: "Tools",
            route: "/tools",
            type: ["3"],
            active: pathname === '/tools'
        },
        {
            title: "Customers",
            route: "/customers",
            type: ["2", "3"],
            active: pathname === '/customers'
        },
        {
            title: "Warehouses",
            route: "/warehouses",
            type: ["1"],
            active: pathname === '/warehouses'
        },
        // {
        //     title: "Borrow Tools",
        //     route: "/borrow",
        //     type: ["1"],
        //     active: pathname === '/warehouses'
        // },
        {
            title: "Requests",
            route: "/requests",
            type: ["2", "3"],
            active: pathname === '/requests'
        },
        {
            title: "Requests",
            route: "/user-requests",
            type: ["1"],
            active: pathname === '/requests'
        },
        {
            title: "History",
            route: "/history",
            type: ["0"],
            active: pathname === '/history'
        },
    ]

    const Header = () => {
        return (
            <div className="p-3 flex justify-between items-center">
                <Logo />
                <MenuIcon
                    size={30}
                    className='block md:hidden'
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>
        )
    }

    return (
        <>
            <div className="fixed top-0 bg-white w-full z-50 ">
                <Header />
            </div>
            <div className={cn("flex py-2 top-0 px-4 fixed w-full border-b h-screen md:h-16 md:items-center bg-white z-50 -translate-x-full md:-translate-x-0 transition duration-300",
                isOpen ? "-translate-x-0" : "-translate-x-full"
            )}>
                <div className="w-full max-w-7xl mx-auto flex md:items-center  flex-col md:flex-row gap-3">
                    <Header />
                    {
                        navigation
                            .filter((nav) => nav.type.includes("0") || nav.type.includes(user?.utype || "0"))
                            .map((nav, i) => (
                                <Link
                                    href={nav.route}
                                    key={i}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        'px-3 hover:bg-teal-500 hover:text-white rounded-full py-2 w-full md:w-auto transition',
                                        nav.active && "rounded-none text-teal-600 border-b-2 border-teal-400/80 hover:bg-transparent hover:text-teal-500"
                                    )}
                                >
                                    {nav.title}
                                </Link>
                            ))
                    }
                    <div className="p-3 mt-auto md:mt-0 md:ml-auto">
                        <UserButton afterSignOutUrl='/' />
                    </div>
                </div>
            </div>
            <div
                className={cn(
                    "w-14 h-14 fixed flex z-40 items-center justify-center bottom-5 right-5 md:bottom-10 md:right-10 bg-white shadow-xl rounded-xl animate-pulse cursor-pointer",
                    isChatOpen && "animate-none"
                )}
                onClick={() => setIsChatOpen(!isChatOpen)}
            >
                <Image
                    src="/x.png"
                    width={10}
                    height={10}
                    className='w-10 h-10'
                    alt='x assistant logo'
                />
            </div>
            <Chat 
            isOpen={isChatOpen} 
            onClose={setIsChatOpen}
            />
        </>
    )
}

export default Navbar
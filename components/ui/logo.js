import Image from "next/image";
import GetImage from "@utils/getImage";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

const logo = (props) => {
    return ( 
        <div className="flex justify-between items-center w-full md:w-auto">
            <Link href="/">
            <a className="w-28 dark:hidden py-3">
                {props.logo ? (
                <Image
                    {...GetImage(props.logo)}
                    alt="Logo"
                    sizes="(max-width: 640px) 100vw, 200px"
                    priority={true}
                />
                ) : (
                <span className="block">
                    {props.logotext}
                </span>
                )}
            </a>
            </Link>
            <Link href="/">
            <a className="hidden w-28 dark:block py-3">
                {props.logoalt ? (
                <Image
                    {...GetImage(props.logoalt)}
                    alt="Logo"
                    sizes="(max-width: 640px) 100vw, 200px"
                    priority={true}
                />
                ) : (
                <span className="block ">
                    {props.logotext}
                </span>
                )}
            </a>
            </Link>
            <Disclosure.Button
            aria-label="Toggle Menu"
            className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 ">
            <svg width="31" height="9" viewBox="0 0 31 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.633301" y1="8.5" x2="29.5533" y2="8.5" stroke="white" strokeLinecap="round" strokeLineJoin="round"/>
                <line x1="0.633301" y1="0.5" x2="29.5533" y2="0.5" stroke="white" strokeLinecap="round" strokeLineJoin="round"/>
            </svg>
            </Disclosure.Button>
        </div>
     );
}
 
export default logo;
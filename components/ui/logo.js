import Image from "next/image";
import GetImage from "@utils/getImage";
import { myLoader } from "@utils/all";
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
            <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                {props.open && (
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
                )}
                {!props.open && (
                <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
                )}
            </svg>
            </Disclosure.Button>
        </div>
     );
}
 
export default logo;
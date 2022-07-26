import { Fragment } from "react";
import Image from "next/image";
import GetImage from "@utils/getImage";
import { Disclosure,Popover } from "@headlessui/react";
import Link from "next/link";

const logo = (props) => {
    return ( 
            <Fragment>
                <Link href="/">
                    <a className="w-28 hidden py-3">
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
                    <a className="hidden w-28 block py-3">
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
            </Fragment>
     );
}
 
export default logo;
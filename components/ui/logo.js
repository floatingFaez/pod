import { Fragment } from "react";
import Image from "next/image";
import GetImage from "@utils/getImage";
import Link from "next/link";

const logo = (props) => {
    
    const mainLogo = props.logo ? GetImage(props.logo) : null;
    
    console.log({mainLogo})
    
    return ( 
            <Fragment>
                <Link href="/">
                    <a className="w-28 py-1 site-logo">
                        {!!mainLogo ? (
                        <Image
                            {...mainLogo}
                            alt={props.logo.alt}
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
            </Fragment>
     );
}
 
export default logo;
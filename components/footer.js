import { Fragment } from "react";
import Container from "@components/container";
import Newsletter from "@components/newsletter";
import Copyright from "./ui/copyright-text";
import Image from "next/image";
import GetImage from "@utils/getImage";
import Link from "next/link";

export default function Footer(props) {
  const footerMenus = props.footer_menus;

  return (
    <div className="footer" id="footer">

      <Newsletter classes="pt-0 !pb-4 !md:pb-22 border-t-0"/>

      <Container className="border-t full-width pb-16">
        <div className="footer-logo flex-col items-center w-full text-center uppercase font-secondary text-white mb-7">
          <Link href="/">
            <a className="w-28">
            <div className="logo-wrap max-w-xs text-center mx-auto my-10">
              {props.footerlogo ? (
                <Image
                    {...GetImage(props.footerlogo)}
                    alt={props.footerlogoalt}
                    sizes="(max-width: 640px) 100vw, 200px"
                    priority={true}
                    className="animate-[spin_6s_linear_infinite]"
                />
                ) : (
                <span className="block">
                    {props.footerlogoalt}
                </span>
                )}
              </div>
              {props?.slogan} <br/> {props?.location}
            </a>
          </Link>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center w-full md:flex-row md:w-auto uppercase">
          {footerMenus.map((item, index) => (
            <Link href={item.link} key={index}>
              <a className="px-4 mx-5 my-3 md:py-5 md:my-10 font-secondary text-white">
                {item.name}
              </a>
            </Link>
          ))}
        </div>

        <Copyright text={props.copyright} />

      </Container>
    </div>
  );
}

const Backlink = () => {
  return (
    <a
      href="#"
      rel="noopener"
      className="fixed flex px-3 py-1 space-x-2  font-regular text-gray-900 bg-white border border-gray-300 rounded shadow-sm place-items-center right-5 bottom-5 dark:bg-trueGray-900 dark:border-trueGray-700 dark:text-trueGray-300">
      
      <span>Up</span>
    </a>
  );
};

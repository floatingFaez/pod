import Container from "@components/container";
import ThemeSwitch from "@components/themeSwitch";
import Image from "next/image";
import GetImage from "@utils/getImage";
import { myLoader } from "@utils/all";
import Link from "next/link";

export default function Footer(props) {
  const footermenu = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Work",
      href: "/work"
    },
    {
      label: "Services",
      href: "/services"
    },
    {
      label: "Field Trips",
      href: "/field-trips"
    },
    {
      label: "Instagram",
      href: "/instagram"
    },
    {
      label: "Facebook",
      href: "/facebook"
    },
    {
      label: "Twitter",
      href: "/twitter"
    }
  ];

  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800 py-10">

      <div className="footer-logo flex-col items-center w-full text-center uppercase">
            <Link href="/">
              <a className="w-28">
              <div className="logo-wrap max-w-xs text-center mx-auto my-10">
                {props.footerlogo ? (
                  <Image
                      {...GetImage(props.footerlogo)}
                      alt={props.footerlogoalt}
                      sizes="(max-width: 640px) 100vw, 200px"
                      priority={true}
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

      <div className="flex-col items-center justify-center w-full md:flex md:flex-row md:w-auto uppercase">
        {footermenu.map((item, index) => (
          <Link href={item.href} key={index}>
            <a className="px-4 py-5 my-10 mx-5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
              {item.label}
            </a>
          </Link>
        ))}
      </div>

      <div className="text-sm text-center">
        © {new Date().getFullYear()} {props?.copyright}.
      </div>

      {/* <div className="flex items-center justify-between mt-2">
        <div className="mt-5">
          {props?.logotext}
        </div>
        <ThemeSwitch />
      </div>
      <Backlink /> */}

    </Container>
  );
}

const Backlink = () => {
  return (
    <a
      href="#"
      rel="noopener"
      className="fixed flex px-3 py-1 space-x-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded shadow-sm place-items-center right-5 bottom-5 dark:bg-trueGray-900 dark:border-trueGray-700 dark:text-trueGray-300">
      
      <span>Up</span>
    </a>
  );
};

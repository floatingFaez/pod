import React from "react";
import { Disclosure } from "@headlessui/react";
import Container from "@components/container";
import Logo from "@components/ui/logo";
import Link from "next/link";

export default function Navbar({logo,logoalt,logotext}) {
  const leftmenu = [
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
    }
  ];

  const rightmenu = [
    {
      label: "Discovery Session",
      href: "/discovery-session"
    },
  ];

  const mobilemenu = [...leftmenu, ...rightmenu];
  const mainmenu = [...leftmenu, ...rightmenu];

  return (
    <Container py='0'>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap border-b border-gray-400 font-secondary text-dark dark:text-white">
                
                {/* LeftSide: logo */}

                <Logo logo={logo} logoalt={logoalt} logotext={logotext} open={open}/>

                {/* RightSide: Menu */}
                <div className="flex-col uppercase items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none">
                  {leftmenu.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <a className="px-5 py-4 mx-5 text-sm font-regular hover:text-blue-500">
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>

                <div className="flex-col uppercase items-center justify-start order-2 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none">
                  {rightmenu.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <a
                        className="py-4 text-sm font-regular hover:text-blue-500"
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}>
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>

              </div>
              <Disclosure.Panel>
                <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                  {mobilemenu.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <a
                        className="px-5 py-2 text-sm font-regular text-dark dark:text-white hover:text-blue-500"
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}>
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}

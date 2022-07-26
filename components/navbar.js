import {Fragment} from "react";
import { Popover, Transition } from "@headlessui/react";
import Container from "@components/container";
import Logo from "@components/ui/logo";
import Copyright from "./ui/copyright-text";
import Link from "next/link";
import Image from "next/image";
import GetImage from "@utils/getImage";

export default function Navbar({menus, logo, footerlogo, logoalt, logotext, copyright, navClass='theme-bg-black'}) {

  const rightmenu = [
    {
      name: "Discovery Session",
      link: "/discovery-session"
    },
  ];
  const rightMenu = [
    {
      name: "Connect",
      link: "/discovery-session"
    },
  ];


  const mobilemenu = [...menus, ...rightMenu];
  const mainmenu = [...menus, ...rightmenu];

  return (
    <Container py='0' full="true" className={`z-50 relative border-b border-theme-black md:border-white full-width sticky top-0 ${navClass} `}>
      <nav className="max-w-screen-xl mx-auto px-5">
        <Popover className="relative">
          {({ open }) => (
            <Fragment>
              <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap font-secondary text-white">
                
                {/* LeftSide: logo */}
                <div className="flex justify-between items-center w-full md:w-auto">
                  <Logo logo={logo} logoalt={logoalt} logotext={logotext} open={open}/>
                  <Popover.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 ">
                    {
                      !open ? 
                      <svg width="31" height="9" viewBox="0 0 31 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line x1="0.633301" y1="8.5" x2="29.5533" y2="8.5" stroke="white" strokeLinecap="round" strokeLineJoin="round"/>
                          <line x1="0.633301" y1="0.5" x2="29.5533" y2="0.5" stroke="white" strokeLinecap="round" strokeLineJoin="round"/>
                      </svg> :
                      <img src="/img/cross.svg" alt="cross"/>
                    }
                    

                  </Popover.Button>
                </div>

                {/* RightSide: Menu */}
                <div className="flex-col uppercase items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none">
                  {menus.map((item, index) => (
                    <Link href={item.link} key={index}>
                      <a className="px-6 py-3 mx-2 text-sm">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>

                <div className="flex-col uppercase items-center justify-start order-2 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none">
                  {rightmenu.map((item, index) => (
                    <Link href={item.link} key={index}>
                      <a
                        className="py-3 text-sm font-regular hover:text-blue-500"
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}>
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>

              </div>
              <Transition
                enter="transition duration-300 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-200 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="absolute z-10 px-5 mobile-menu md:hidden flex flex-col grow h-screen content-between left-0 right-0 py-20 -mx-5 border-t theme-bg-black">
                  <div className="flex flex-col grow items-center justify-start w-full ">
                    {mobilemenu.map((item, index) => (
                      <Link href={item.link} key={index}>
                        <a
                          className={`px-5 py-4 font-regular text-white text-white text-3xl border-b border-white w-full ${ index === 0? 'border-t':''}`}
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}>
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col items-center nav-logo">
                    <div children="block w-12 mb-5">
                      <Image
                          {...GetImage(footerlogo)}
                          alt={'POD'}
                          sizes="(max-width: 640px) 100vw, 200px"
                          priority={true}
                          className='mb-5'
                      />
                    </div>
                    <Copyright text={copyright} className="mt-5 w-full block"/>
                  </div>
                </Popover.Panel>
              </Transition>
            </Fragment>
          )}
        </Popover>
      </nav>
    </Container>
  );
}

// navbar/NavbarClient.tsx
"use client";

import { useEffect, useState } from "react";
import { Button, Navbar, NavbarBrand, Tooltip } from "@heroui/react";
import Link from "next/link";
import { GiJourney } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import GadgetsMenu from "./GadgetsMenu";
import { useRouter, usePathname } from "next/navigation";
import { Session } from "next-auth";
import Image from "next/image";

interface NavbarClientProps {
  session: Session | null;
}

export default function NavbarClient({ session }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const userInfo = session?.user;
  const router = useRouter();
  const pathname = usePathname();

  // Schließe Mobile-Menü bei jeder Navigation (auch durch Dropdowns)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleClick = (href: string) => {
    closeMenu();
    router.push(href);
  };

  return (
    <Navbar className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pprimary-400 to-pprimary-700 px-4 py-2">
      <div className="flex justify-between items-center w-full">
        <NavbarBrand as={Link} href="/" className="flex items-center" onClick={closeMenu}>
          <GiJourney size={40} className="text-gray-200 mr-2" />
          <div className="font-bold text-3xl flex">
            <span className="text-gray-900">Places</span>
            <span className="text-gray-200">26</span>
          </div>
        </NavbarBrand>

        {/* Desktop */}
        <div className="hidden md:flex gap-4">
          <NavLink href="/disclaimer" className="ml-5">
            <Tooltip content="Disclaimer" placement="bottom">
              <Button isIconOnly variant="light" size="sm" className="text-white">
                <AiOutlineInfoCircle size={20} />
              </Button>
            </Tooltip>
          </NavLink>
          <NavLink href="https://places26.vercel.app/places/cmf6hqc1k0000jp040y7adw9x/default" isMobile onClick={closeMenu}>
            <Tooltip content="Tansania" placement="bottom">
              <span className="inline-flex items-center justify-center w-full">
                <Image src="/Flagge50px.png" title="Tansania" alt="Flagge" width={24} height={24} className="w-[24px] h-auto" priority />
              </span>
            </Tooltip>
          </NavLink>
          <NavLink href="/subjects" label="Subjects" />
          <NavLink href="/quiz" label="Quiz" />
          <GadgetsMenu />
          {session?.user?.role === "ADMIN26" && <NavLink href="/conv" label="conv" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/lb" label="LB" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/farben" label="Farben" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/settings" label="set" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/quadrate" label="qua" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/tabs" label="tabs" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/cardtesting" label="card" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/user" label="user" />}
        </div>

        {/* Userbereich Desktop */}
        <div className="hidden md:flex gap-2 ml-4">
          {userInfo ? (
            <UserMenu userInfo={userInfo} />
          ) : (
            <>
              <Button variant="bordered" className="text-white w-full" onPress={() => handleClick("/login")}>
                Login
              </Button>
              <Button variant="bordered" className="text-white w-full" onPress={() => handleClick("/register")}>
                Register
              </Button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-white text-2xl focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile */}
      {isOpen && (
        <div className="absolute right-0 top-full w-40 bg-gradient-to-r from-pprimary-600 to-pprimary-700 p-4 flex flex-col items-center space-y-2 shadow-lg">
          <NavLink href="/disclaimer" isMobile onClick={closeMenu}>
            <Tooltip content="Disclaimer" placement="bottom">
              <span className="inline-flex items-center justify-center w-full" title="Disclaimer">
                <AiOutlineInfoCircle size={20} />
              </span>
            </Tooltip>
          </NavLink>
          <NavLink href="https://places26.vercel.app/places/cmf6hqc1k0000jp040y7adw9x/default" isMobile onClick={closeMenu}>
            <Tooltip content="Tansania" placement="bottom">
              <span className="inline-flex items-center justify-center w-full">
                <Image src="/Flagge50px.png" title="Tansania" alt="Flagge" width={24} height={24} className="w-[24px] h-auto" priority />
              </span>
            </Tooltip>
          </NavLink>
          <NavLink href="/subjects" label="Subjects" isMobile onClick={closeMenu} />
          <NavLink href="/quiz" label="Quiz" isMobile onClick={closeMenu} />
          {/* WICHTIG: closeMenu an Gadgets weiterreichen */}
          <GadgetsMenu onSelectItem={closeMenu} />
          {session?.user?.role === "ADMIN26" && <NavLink href="/conv" label="conv" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/lb" label="LB" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/farben" label="Farben" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/settings" label="set" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/quadrate" label="qua" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/tabs" label="tabs" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/cardtesting" label="card" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/user" label="user" isMobile onClick={closeMenu} />}

          {userInfo ? (
            <UserMenu userInfo={userInfo} />
          ) : (
            <>
              <Button variant="bordered" className="text-white w-full" onPress={() => handleClick("/login")}>
                Login
              </Button>
              <Button variant="bordered" className="text-white w-full" onPress={() => handleClick("/register")}>
                Register
              </Button>
            </>
          )}
        </div>
      )}
    </Navbar>
  );
}

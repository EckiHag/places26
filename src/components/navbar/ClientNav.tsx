"use client";

import { useState } from "react";
import { Button, Navbar, NavbarBrand } from "@heroui/react";
import Link from "next/link";
import { GiJourney } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";

import { Session } from "next-auth";

interface ClientNavProps {
  session: Session | null;
}

export default function ClientNav({ session }: ClientNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const userInfo = session?.user;

  return (
    <Navbar className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pprimary-400 to-pprimary-700 px-4 py-2">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <NavbarBrand as={Link} href="/" className="flex items-center">
          <GiJourney size={40} className="text-gray-200 mr-2" />
          <div className="font-bold text-3xl flex">
            <span className="text-gray-900">Places</span>
            <span className="text-gray-200">26</span>
          </div>
        </NavbarBrand>

        {/* Desktop-Navigation */}
        <div className="hidden md:flex gap-4">
          <NavLink href="/subjects" label="Subjects" />
          <NavLink href="/quiz" label="Quiz" />
          {session?.user?.role === "ADMIN26" && <NavLink href="/conv" label="conv" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/lb" label="LB" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/farben" label="Farben" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/settings" label="set" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/quadrate" label="qua" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/tabs" label="tabs" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/cardtesting" label="card" />}
        </div>

        {/* Benutzerbereich */}
        <div className="hidden md:flex gap-2 ml-4">
          {userInfo ? (
            <UserMenu userInfo={userInfo} />
          ) : (
            <>
              <Button as={Link} href="/login" variant="bordered" className="text-white">
                Login
              </Button>
              <Button as={Link} href="/register" variant="bordered" className="text-white">
                Register
              </Button>
            </>
          )}
        </div>

        {/* Hamburger-Menü für Mobile */}
        <button className="md:hidden text-white text-2xl focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute right-0 top-full w-32 bg-gradient-to-r from-pprimary-600 to-pprimary-700 p-4 flex flex-col items-center space-y-2 shadow-lg">
          <NavLink href="/subjects" label="Subjects" isMobile onClick={closeMenu} />
          <NavLink href="/quiz" label="Quiz" isMobile onClick={closeMenu} />
          {session?.user?.role === "ADMIN26" && <NavLink href="/conv" label="conv" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/lb" label="LB" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/farben" label="Farben" />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/settings" label="set" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/quadrate" label="qua" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/tabs" label="tabs" isMobile onClick={closeMenu} />}
          {session?.user?.role === "ADMIN26" && <NavLink href="/cardtesting" label="card" isMobile onClick={closeMenu} />}

          {/* Mobile Benutzerbereich */}
          {userInfo ? (
            <UserMenu userInfo={userInfo} />
          ) : (
            <>
              <Button as={Link} href="/login" variant="bordered" className="text-white w-full">
                Login
              </Button>
              <Button as={Link} href="/register" variant="bordered" className="text-white w-full">
                Register
              </Button>
            </>
          )}
        </div>
      )}
    </Navbar>
  );
}

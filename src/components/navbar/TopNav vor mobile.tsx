import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { GiJourney } from "react-icons/gi";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
// import UserMenu from './UserMenu'

export default async function TopNav() {
  const session = await auth();
  // const role = session?.user.role;
  // const name = session?.user.name;

  const userInfo = session?.user;
  console.log("userInfo in TopNav:", userInfo);

  // const userInfo = session?.user && (await getUserInfoForNav())
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-blue-400 to-blue-700"
      classNames={{ item: ["text-xl", "text-white", "uppercase", "data-[active=true]:text-yellow-200"] }}
    >
      <NavbarBrand as={Link} href="/">
        <GiJourney size={40} className="text-gray-200 mr-2" />
        <div className="font-bold text-3xl flex">
          <span className="text-gray-900">Places</span>
          <span className="text-gray-200">26</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavLink href="/subjects" label="Subjects" />
        <NavLink href="/places" label="Places" />
        <NavLink href="/pics" label="Pics" />
        {session?.user.role === "ADMIN" && <NavLink href="/quiz" label="Quiz" />}
        <NavLink href="/lb" label="LB" />
        <NavLink href="/conv" label="conv" />
        <NavLink href="/settings" label="set" />
        <NavLink href="/quadrate" label="qua" />
        <NavLink href="/tabs" label="tabs" />
        <NavLink href="/cardtesting" label="card" />
      </NavbarContent>
      <NavbarContent justify="end">
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
        {/* <span>{role}</span>
        <span>{name}</span>
        <Button as={Link} href="/login" variant="bordered" className="text-white">
          Login
        </Button>
        <Button as={Link} href="/register" variant="bordered" className="text-white">
          Register
        </Button> */}
      </NavbarContent>
    </Navbar>
  );
}

"use client";

import { signOutUser } from "@/app/actions/authActions";
// import { transformImageUrl } from "@/lib/util"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/react";
import Link from "next/link";
import React from "react";

type Props = {
  userInfo: { name: string | null; image: string | null; email: string | null; role: string | null } | null;
};

export default function UserMenu({ userInfo }: Props) {
  // console.log("userInfo?.image: ", userInfo?.image);
  // console.log("userInfo:", userInfo);
  // console.log("userInfo?.email: ", userInfo?.email);
  const image = userInfo?.image;
  // `https://beihaggis.de/${image.replace(/^.\//, "")}` ||
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          color="success"
          style={{ borderColor: "#FFFFFF", borderWidth: "2px" }} // Orange Farbe
          name={userInfo?.name || "user avatar"}
          size="sm"
          src={`https://beihaggis.de/${image}` || "https://beihaggis.de/uploads/user/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem key="user" isReadOnly as="span" className="h-14 flex flex-row" aria-label="username">
            Signed in as {userInfo?.name}
            <br></br>({userInfo?.role})
          </DropdownItem>
        </DropdownSection>
        <DropdownItem key="username2" color="success" as={Link} href="/members/edit">
          Edit profile
        </DropdownItem>
        <DropdownItem key="username3" color="danger" onPress={async () => signOutUser()}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

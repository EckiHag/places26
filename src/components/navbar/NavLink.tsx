"use client";

import { NavbarItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  label: string;
  className?: string;
  isMobile?: boolean;
  onClick?: () => void; // ✅ Neu: onClick als optionales Prop
};

export default function NavLink({ href, label, className, isMobile = false, onClick }: Props) {
  const pathname = usePathname();

  // Falls im mobilen Menü -> Verwende normales Link-Element mit onClick
  if (isMobile) {
    return (
      <Link
        href={href}
        onClick={onClick} // ✅ Menü wird geschlossen, wenn Link angeklickt wird
        className={`w-full block text-white text-center py-2 ${className || ""}`}
      >
        {label}
      </Link>
    );
  }

  // Standard für Desktop-Navigation
  return (
    <NavbarItem isActive={pathname === href} as={Link} href={href} className={`text-white ${className || ""}`}>
      {label}
    </NavbarItem>
  );
}

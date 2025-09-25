"use client";

import { NavbarItem, NavbarMenuItem } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  isMobile?: boolean; // true, wenn innerhalb <NavbarMenu> gerendert
  onClick?: () => void; // Menü schließen
};

export default function NavLink({ href, label, children, className, isMobile = false, onClick }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href.replace(/\/$/, "")));

  // --- Mobile: innerhalb von <NavbarMenu> ---
  if (isMobile) {
    const handleClick = () => {
      if (pathname === href) {
        onClick?.();
        return;
      }
      onClick?.();
      setTimeout(() => router.push(href), 0);
    };

    return (
      <NavbarMenuItem className={`list-none ${className || ""}`}>
        <Link href={href} onClick={handleClick} className="w-full block text-white text-center py-2" aria-current={isActive ? "page" : undefined}>
          {children ?? label}
        </Link>
      </NavbarMenuItem>
    );
  }

  // --- Desktop ---
  return (
    <NavbarItem isActive={isActive} as={Link} href={href} className={`text-white ${className || ""}`} aria-current={isActive ? "page" : undefined}>
      {children ?? label}
    </NavbarItem>
  );
}

// navbar/GadgetsMenu.tsx
"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/react";
import { useRouter } from "next/navigation";

type AdminMenuProps = {
  onSelectItem?: () => void; // optional
};

const routeByKey: Record<string, string> = {
  adminuser: "/user",
  adminconv: "/conv",
  adminlb: "/lb",
  adminfarben: "/farben",
  adminsettings: "/settings",
  adminquadrate: "/quadrate",
  admintabs: "/tabs",
  admincardtesting: "/cardtesting",
};

export default function AdminMenu({ onSelectItem }: AdminMenuProps) {
  const router = useRouter();

  const handleAction = (key: React.Key) => {
    const href = routeByKey[String(key)];
    if (href) {
      onSelectItem?.(); // Mobile-Menü schließen
      router.push(href); // Navigation
    }
  };

  return (
    <div className="text-white cursor-pointer">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>Admin</DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="AdminMenu" onAction={handleAction}>
          <DropdownSection showDivider>
            <DropdownItem key="adminuser">user</DropdownItem>
            <DropdownItem key="adminconv">conv</DropdownItem>
            <DropdownItem key="adminlb">lb</DropdownItem>
            <DropdownItem key="adminfarben">farben</DropdownItem>
            <DropdownItem key="adminquadrate">quadrate</DropdownItem>
            <DropdownItem key="admintabs">tabs</DropdownItem>
            <DropdownItem key="admincardtesting">cardtesting</DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            <DropdownItem key="adminsettings">settings</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

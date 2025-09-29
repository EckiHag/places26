// navbar/GadgetsMenu.tsx
"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/react";
import { useRouter } from "next/navigation";

type GadgetsMenuProps = {
  onSelectItem?: () => void; // optional
};

const routeByKey: Record<string, string> = {
  gadgetsMatrix: "/matrix",
  gadgetsSchnee: "/schnee",
  gadgetsWuerfel: "/wuerfel",
  gadgetsKreise: "/kreise",
  gadgetsMemory: "/memory",
};

export default function GadgetsMenu({ onSelectItem }: GadgetsMenuProps) {
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
        <DropdownTrigger>Gadgets</DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Gadgets menu" onAction={handleAction}>
          <DropdownSection showDivider>
            <DropdownItem key="gadgetsMatrix">Matrix</DropdownItem>
            <DropdownItem key="gadgetsSchnee">Schnee</DropdownItem>
            <DropdownItem key="gadgetsWuerfel">Würfel</DropdownItem>
            <DropdownItem key="gadgetsKreise">Kreise</DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            <DropdownItem key="gadgetsMemory">Memory</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

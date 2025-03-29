"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/react";
import Link from "next/link";
import React from "react";

export default function GadgetsMenu() {
  return (
    <div className="text-white">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>Gadgets</DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="User actions menu">
          <DropdownSection showDivider>
            <DropdownItem key="gadgetsMatrix" color="success" as={Link} href="/matrix">
              Matrix
            </DropdownItem>
            <DropdownItem key="gadgetsSchnee" color="success" as={Link} href="/schnee">
              Schnee
            </DropdownItem>
            <DropdownItem key="gadgetsWuerfel" color="success" as={Link} href="/wuerfel">
              Würfel
            </DropdownItem>
            <DropdownItem key="gadgetsKreise" color="success" as={Link} href="/kreise">
              Kreise
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

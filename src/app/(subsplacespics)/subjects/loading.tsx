// subjects/loading.tsx

import { Spinner } from "@heroui/react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center vertical-center">
      {/* <Spinner label="Loading..." color="secondary" labelColor="secondary" /> */}
      <Spinner label="Loading..." className="bg-pprimary" />
    </div>
  );
}

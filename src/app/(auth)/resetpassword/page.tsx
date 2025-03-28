import React, { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Lade...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

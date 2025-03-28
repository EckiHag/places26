// app/(auth)/resetpassword/page.tsx
import dynamic from "next/dynamic";

// Dynamischer Import mit Deaktivierung von SSR
const ResetPasswordForm = dynamic(() => import("./ResetPasswordForm"), { ssr: false });

export default function Page() {
  return <ResetPasswordForm />;
}

export default function LoggedOutLayout({ children }) {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center">{children}</div>
    </>
  )
}



export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-start pt-[50px] items-center w-full h-screen">
      <div className="flex flex-col py-10 px-4 w-[600px] max-w-full">
        {children}
      </div>
    </div>
  )
}
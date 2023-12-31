export default function Header() {
  return (
    <header className="flex w-screen justify-center">
      <div className="flex flex-col md:flex-row items-center p-5 md:mb-16 w-full max-w-7xl rounded-b-2xl">
        <div className="pb-6 md:pb-0 flex items-center gap-3">
          <h1 className="font-garamond font-semibold text-center md:text-start text-2xl">
            Contas da <strong className="text-amber-900">Casa</strong>
          </h1>
        </div>
      </div>
    </header>
  )
}

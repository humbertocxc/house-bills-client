import { LightBulbIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import UserAvatar from "./UserAvatar";

export default function Header() {
  return (
    <header className="flex w-screen justify-center">
      <div className="flex flex-col md:flex-row items-center p-5 mb-20 w-full max-w-7xl rounded-b-2xl">
        <div className="pb-6 md:pb-0 flex items-center gap-3">
          <h1 className="font-garamond font-semibold text-center md:text-start text-2xl">
            Contas da <strong className="text-amber-900">Casa</strong>
          </h1>
        </div>
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white/90 rounded-md p-2 shadow-md flex-1
          md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gay-400" />
            <input
              type="text"
              placeholder="Pesquisar"
              className="flex-1 outline-none p-2 bg-transparent"
            />
            <button hidden type="submit">
              Search
            </button>
          </form>
          <UserAvatar name="Humberto Gessinger" />
        </div>
      </div>
    </header>
  )
}

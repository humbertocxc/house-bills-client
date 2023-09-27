import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Search() {
  return (
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
    </div>
  )
}

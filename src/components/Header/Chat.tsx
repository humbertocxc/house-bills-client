import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Chat() {
  return (
    <div className="flex items-center justify-center px-5 py-2 md:py-5">
      <p className="flex items-center p-5 text-sm shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-orange-950">
        <UserCircleIcon className="inline-block h-10 w-10 text-orange-900 mr-1" />
        Gpt está processando sua resposta...
      </p>
    </div>
  )
}
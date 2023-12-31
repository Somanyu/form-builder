import { UpdateIcon } from "@radix-ui/react-icons"

const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <UpdateIcon className="animate-spin h-12 w-12" />
        </div>
    )
}

export default Loading
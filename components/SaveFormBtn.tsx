import { DownloadIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'

const SaveFormBtn = ({ id }: { id: number }) => {
    return (
        <Button className="gap-2" variant={"outline"}>
            <DownloadIcon className="h-4 w-4" />
            Save
        </Button>
    )
}

export default SaveFormBtn
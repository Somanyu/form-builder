import { EyeOpenIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"

const PreviewDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="gap-2">
                    <EyeOpenIcon className="h-4 w-4" />
                    Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
                <div>
                    <p>Form preview</p>
                    <p>This is how your form will look like to your users.</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PreviewDialog
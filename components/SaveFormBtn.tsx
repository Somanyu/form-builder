import { UpdateFormContent } from '@/actions/form';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import useDesigner from './hooks/useDesigner';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { FaSpinner } from "react-icons/fa";

const SaveFormBtn = ({ id }: { id: number }) => {
    const { elements } = useDesigner();
    const [loading, startTransition] = useTransition();

    const updateFormContent = async () => {
        try {
            const jsonElements = JSON.stringify(elements);
            await UpdateFormContent(id, jsonElements);

            toast({
                title: "Success",
                description: "Form saved successfully",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }
    return (
        <Button
            className="gap-2"
            variant={"outline"}
            disabled={loading}
            onClick={() => {startTransition(updateFormContent)}}
        >
            <DownloadIcon className="h-4 w-4" />
            Save
            {loading && <FaSpinner className="animate-spin" />}
        </Button>
    )
}

export default SaveFormBtn
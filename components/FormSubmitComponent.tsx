"use client"

import { SubmitForm } from "@/actions/form";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useCallback, useRef, useState, useTransition } from "react";
import { HiCursorClick } from "react-icons/hi";
import { FormElements, FormElementsInstance } from "./FormElements";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

const FormSubmitComponent = ({ formUrl, content }: { content: FormElementsInstance[], formUrl: string }) => {

    const formValues = useRef<{ [key: string]: string }>({});
    const formErrors = useRef<{ [key: string]: boolean }>({});
    const [renderKey, setRenderKey] = useState(new Date().getTime());

    const [submitted, setSubmitted] = useState(false)
    const [pending, startTransition] = useTransition()

    const validateForm: () => boolean = useCallback(() => {
        for (const field of content) {
            const actualValue = formValues.current[field.id] || "";
            const valid = FormElements[field.type].validate(field, actualValue)

            if (!valid) {
                formErrors.current[field.id] = true;
            }
        }

        if (Object.keys(formErrors.current).length > 0) {
            return false;
        }

        return true
    }, [content])


    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value;
    }, [])


    const submitForm = async () => {
        formErrors.current = {};
        const validForm = validateForm();
        if (!validForm) {
            setRenderKey(new Date().getTime());
            toast({
                title: "Error",
                description: "Please check all the required fields",
                variant: "destructive"
            })
            return;
        }

        try {
            const jsonContent = JSON.stringify(formValues.current);
            await SubmitForm(formUrl, jsonContent);
            setSubmitted(true);
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again",
                variant: "destructive"
            })
        }
    }

    if (submitted) {
        return (
            <div className="flex justify-center w-full h-full items-center p-8">
                <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded">
                    <h1 className="text-2xl font-bold">Form submitted</h1>
                    <p className="text-muted-foreground">Thank you for submitting the form, you can close this page now.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full h-full items-center p-8">
            <div key={renderKey} className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded">
                {content.map(element => {
                    const FormElement = FormElements[element.type].formComponent;
                    return (
                        <FormElement
                            key={element.id}
                            elementInstance={element}
                            submitValue={submitValue}
                            isInvalid={formErrors.current[element.id]}
                            defaultValue={formValues.current[element.id]}
                        />
                    )
                })}
                <Button
                    className="mt-8"
                    onClick={() => { startTransition(submitForm) }}
                    disabled={pending}
                >
                    {!pending && (
                        <>
                            <HiCursorClick className="mr-2" />
                            Submit
                        </>
                    )}
                    {pending && <UpdateIcon className="animate-spin" />}
                </Button>
            </div>
        </div>
    )
}

export default FormSubmitComponent
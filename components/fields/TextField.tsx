"use client"

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementsInstance } from "../FormElements";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text field",
    helperText: "Helper text",
    required: false,
    placeholder: "Value here...",
}

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),

    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
    },

    designerComponent: DesignerComponent,
    formComponent: () => <div>Form TextField Component</div>,
    propertiesComponent: () => <div>Properties TextField Component</div>,
}

type CustomInstance = FormElementsInstance & {
    extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementsInstance }) {

    const element = elementInstance as CustomInstance;
    const { label, required, placeholder, helperText } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Input readOnly disabled placeholder={placeholder} />
            {helperText && <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>}
        </div>
    )
}

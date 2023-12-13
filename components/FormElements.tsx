import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";

export type FormElement = {
    type: ElementsType;

    construct: (id:string) => FormElementsInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };

    designerComponent: React.FC<{
        elementInstance: FormElementsInstance
    }>;
    formComponent: React.FC;
    propertiesComponent: React.FC;
}

export type FormElementsInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}

type FormElementsType = {
    [key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement
}

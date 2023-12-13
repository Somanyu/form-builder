"use client"

import { ReactNode, createContext, useState } from "react";
import { FormElementsInstance } from "../FormElements";

type DesignerContextType = {
    elements: FormElementsInstance[];
    // setElements: Dispatch<SetStateAction<FormElementsInstance[]>>;
    addElement: (index: number, element: FormElementsInstance) => void;
    removeElement: (id: string) => void;
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider({ children }: { children: ReactNode }) {
    const [elements, setElements] = useState<FormElementsInstance[]>([])

    const addElement = (index: number, element: FormElementsInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            newElements.splice(index, 0, element);
            return newElements;
        })
    }

    const removeElement = (id: string) => {
        setElements((prev) => prev.filter((element) => element.id !== id))
    }

    return (
        <DesignerContext.Provider
            value={{
                elements,
                addElement,
                removeElement,
            }}
        >
            {children}
        </DesignerContext.Provider>
    )
}
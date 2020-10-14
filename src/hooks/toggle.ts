import { useCallback, useState } from "react";

export const useToggle = (initialize: boolean = false) => {
    const [isOpen, setIsOpen] = useState<boolean>(initialize);

    const toggle = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    return {
        isOpen,
        toggle,
    }
};
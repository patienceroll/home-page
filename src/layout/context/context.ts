import { createContext } from "react";

export type LayoutContextType = {
    state: {
        showNav: boolean;
        showAside: boolean;
    };
    setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAside: React.Dispatch<React.SetStateAction<boolean>>;
};

const LayoutContext = createContext<LayoutContextType>({} as any);

export default LayoutContext;

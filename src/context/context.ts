import { createContext, SetStateAction, Dispatch } from "react";

/** 是否显示导航菜单 */
export const ShowNavList = createContext<{
    state: { showNav: boolean; showAbout: boolean };
    setShowNav: Dispatch<SetStateAction<boolean>>;
    setShowAbout: Dispatch<SetStateAction<boolean>>;
}>({} as any);

import { createContext, SetStateAction, Dispatch } from "react";

/** 是否显示导航菜单 */
export const ShowNavList = createContext<{
    state: boolean;
    setShowNavList: Dispatch<SetStateAction<boolean>>;
}>({} as any);

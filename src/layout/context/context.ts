import { createContext } from 'react';

export type LayoutContextType = {
//   state: {
//     showNav: boolean;
//     showAside: boolean;
//   };
  getState: () => {
    showNav: boolean;
    showAside: boolean;
    QQplayer: QMplayer;
  };
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAside: React.Dispatch<React.SetStateAction<boolean>>;
};

const LayoutContext = createContext<LayoutContextType>({} as any);

export default LayoutContext;

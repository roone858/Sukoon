import { useContext } from "react";
import { StoreContext } from "..";

export const useStoreContext = () => {
     const context = useContext(StoreContext);
     if (!context) {
       throw new Error("useStoreContext must be used within a StoreProvider");
     }
     return context;
   };
   
import { useEffect, useRef } from "react";


export function useFirstMountState(): boolean {
    const isFirst = useRef(true);
  
    if (isFirst.current) {
      isFirst.current = false;
  
      return true;
    }
  
    return isFirst.current;
  }
  
  export const useUpdateEffect: typeof useEffect = (effect, deps) => {
    const isFirstMount = useFirstMountState();
  
    useEffect(() => {
      if (!isFirstMount) {
        return effect();
      }
    }, deps);
  };
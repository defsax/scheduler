import { useState } from 'react';

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      //set mode then set history
      setMode(newMode);
      setHistory((prev) => {     
        //last the last element from the previous state then push on newMode   
        prev.pop();
        prev.push(mode);
        return [...prev];
      });
    } else {
      setMode(newMode);
      setHistory((prev) => {
        return [...prev, newMode]
      });
    }
  }
  const back = () => {
    //we can only go back if history length array is greater than 1
    if (history.length > 1) {
    
      //pop last pushed element from history and set mode to prev element
      const newHistory = [...history];
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  }

  return {mode, transition, back};
};
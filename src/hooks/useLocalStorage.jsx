import {useState, useEffect} from 'react';

export default function useLocalStorage({key, defaultValue}) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error al guardar en local storage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
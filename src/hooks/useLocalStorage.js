import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
  // Getting stored value
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : defaultValue;
  return initial;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // Storing value to local storage
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
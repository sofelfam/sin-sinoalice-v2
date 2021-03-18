import { useState, useCallback } from 'react';

interface Functions<T> {
  set: (items: T[]) => void;
  push: (item: T) => void;
  unshift: (item: T) => void;
  deleteIndex: (index: number) => void;
  toggle: (newItem: T, func: (item: T) => boolean) => void;
  findAndReplace: (newValue: T, func: (item: T) => boolean) => void;
  findAndRemove: (func: (item: T) => boolean) => void;
  clear: () => void;
}

export default function useArray<T>(initialValue: T[]): [T[], Functions<T>] {
  const [array, setArray] = useState<T[]>(initialValue);

  const push = useCallback((item: T) => {
    setArray((_arr) => [..._arr, item]);
  }, []);

  const unshift = useCallback((item: T) => {
    setArray((_arr) => [item, ..._arr]);
  }, []);

  const deleteIndex = useCallback((index: number) => {
    setArray((_arr) => {
      _arr.splice(index, 1);
      return [..._arr];
    });
  }, []);

  // 指定された item が存在する場合は配列から取り除き、存在しない場合は push する
  const toggle = useCallback((newItem: T, func: (item: T) => boolean) => {
    setArray((_arr) => {
      const copy = [..._arr];
      const index = copy.findIndex((item) => func(item));
      if (index > -1) {
        copy.splice(index, 1);
      } else {
        copy.push(newItem);
      }

      return copy;
    });
  }, []);

  const findAndReplace = useCallback((newItem: T, func: (item: T) => boolean) => {
    setArray((_arr) => {
      const copy = [..._arr];
      const index = copy.findIndex((item) => func(item));
      if (index > -1) {
        copy[index] = newItem;
      }

      return copy;
    });
  }, []);

  const findAndRemove = useCallback((func: (item: T) => boolean) => {
    setArray((_arr) => {
      const copy = [..._arr];
      const index = copy.findIndex((item) => func(item));
      if (index > -1) {
        copy.splice(index, 1);
      }

      return copy;
    });
  }, []);

  const clear = useCallback(() => setArray([]), []);

  return [
    array,
    { set: setArray, push, unshift, deleteIndex, toggle, findAndReplace, findAndRemove, clear }
  ];
}
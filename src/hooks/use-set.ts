import { useState, useCallback } from 'react';

export interface Functions<T> {
  set: (items: Set<T>) => void;
  add: (item: T) => void;
  remove: (item: T) => void;
  toggle: (item: T) => void;
  clear: () => void;
}

export default function useSet<T>(): [Set<T>, Functions<T>] {
  const [set, setSet] = useState<Set<T>>(new Set());

  const add = useCallback((item: T) => {
    setSet((_set) => {
      _set.add(item);
      return _set;
    });
  }, []);

  const remove = useCallback((item) => {
    setSet((_set) => {
      _set.delete(item);
      return _set;
    });
  }, []);
  
  // 指定された item が存在する場合はdeleteし、存在しない場合は add する
  const toggle = useCallback((item: T) => {
    setSet((_set) => {
      if (_set.has(item)) {
        _set.delete(item);
      } else {
        _set.add(item);
      }

      return _set;
    });
  }, []);

  const clear = useCallback(() => {
    setSet((_set) => {
      _set.clear();
      return _set;
    });
  }, []);

  return [
    set,
    { set: setSet, add, remove, toggle, clear }
  ];
}
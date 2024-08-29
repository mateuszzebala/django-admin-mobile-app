import React from "react";

export default (initialItems: any[] = []) => {
  const [list, setList] = React.useState<any[]>(initialItems);

  const push = (item: any) => setList((prev) => [...prev, item]);
  const remove = (item: any) =>
    setList((prev) => prev.filter((i) => i != item));

  return {
    items: list,
    setItems: setList,
    pop: (index: number = list.length - 1) =>
      setList((prev) => prev.filter((_, i) => i != index)),
    clear: () => setList([]),
    includes: (item: any) => list.includes(item),
    remove,
    push,
    unshift: (item: any) => setList((prev) => [item, ...prev]),
    toggle: (item: any) => {
      if (list.includes(item)) remove(item);
      else push(item);
    },
  };
};

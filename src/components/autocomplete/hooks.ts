import { useState, useMemo } from "react";

export type UseFiltersArgs<T> = {
  options: T[];
  filterFunction: (value: T, filter: string) => boolean;
};

export const useFilter = <T>({
  options,
  filterFunction,
}: UseFiltersArgs<T>) => {
  const [filter, setFilter] = useState<string>("");

  const filteredOptions = useMemo(() => {
    return options.filter((value: T) => filterFunction(value, filter));
  }, [options, filter, filterFunction]);

  return {
    filter,
    setFilter,
    filteredOptions,
  };
};

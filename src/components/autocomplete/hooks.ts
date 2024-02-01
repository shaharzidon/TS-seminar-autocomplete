import { useState, useMemo } from "react";
import { AutocompleteProps } from ".";

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

type UseAutocompleteOptionSelectHandlareArgs<T> = Pick<AutocompleteProps<T>, "getOptionID" | "isMulti">

export const useAutocompleteOptionSelectHandlare = <T,>({getOptionID, isMulti}:UseAutocompleteOptionSelectHandlareArgs<T>) =>{
  const [selectedOptions, setSelectedOptions] = useState<Record<string, T>>({});

  const toggleOption = (option: T) => {
    const id = getOptionID(option);
    setSelectedOptions((lastState: Record<string, T>) => {
      const isOptionsSelected = lastState[id];
      if (isMulti) {
        if (isOptionsSelected) {
          const copy = { ...lastState };
          delete copy[id];
          return copy;
        }
        return {
          ...lastState,
          [id]: option,
        };
      }
      if (isOptionsSelected) return lastState;
      return {
        [id]: option,
      };
    });
  };

  return{
    selectedOptions,
    toggleOption
  }
}

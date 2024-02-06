import { useState, useMemo } from "react";
import { BaseAutocompleteProps } from "./index";

// 6. use Pick utility type to constract dynamic type - when AutocompleteProps change the type is updated
type UseAutocompleteOptionsArgs<T> = Pick<
  BaseAutocompleteProps<T>,
  "getOptionID" | "isMulti"
>;

export const useAutocompleteOptionSelectHandlare = <T>({
  getOptionID,
  isMulti,
}: UseAutocompleteOptionsArgs<T>) => {
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

  return {
    selectedOptions,
    toggleOption,
  };
};

// 7. create the type for the arguments in useFilters - use BaseAutocompleteProps and Omit
// NOTE: just for practice, Pick would be a better logical choice
export type UseFiltersArgs<T> = Omit<
  BaseAutocompleteProps<T>,
  "isMulti" | "getOptionID" | "getOptionLabel"
>;

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

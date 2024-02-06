import { useState, useMemo } from "react";
import { BaseAutocompleteProps } from "./index";

// 6. use Pick utility type to constract dynamic type - when BaseAutocompleteProps change the type is updated
// NOTE: use as NEEDED!
type UseAutocompleteOptionsArgs<T> = Pick<
  BaseAutocompleteProps<T>,
  "getOptionID" | "isMulti"
>;

//7. write the same type with Omit

export const UseAutocompleteOptions = <T>({
  getOptionID,
  isMulti,
}: UseAutocompleteOptionsArgs<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, T>>({});

  const toggleOption = (option: T) => {
    const id = getOptionID(option);
    setSelectedOptions((lastState) => {
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

//NOTE: this hook should be reusable, it makes no sens to depend on other types
// if the autocompleteBaseProps will change it will change as well
type UseFiltersArgs<T> = {
  options: T[];
  filterFunction: (option: T, filter: string) => boolean;
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

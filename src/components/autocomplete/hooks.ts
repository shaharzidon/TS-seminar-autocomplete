import { useState, useMemo } from "react";
//import { BaseAutocompleteProps } from "./index";

// 6. use Pick utility type to constract dynamic type - when BaseAutocompleteProps change the type is updated
// NOTE: use as NEEDED!
type UseAutocompleteOptionsArgs = any;

// 7. write the same type with Omit

export const UseAutocompleteOptions = ({
  getOptionID,
  isMulti,
}: UseAutocompleteOptionsArgs) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>(
    {},
  );

  const toggleOption = (option: any) => {
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

// 8. complete the hook type
type UseFiltersArgs = {
  options: any;
  filterFunction: any;
};

export const useFilter = ({ options, filterFunction }: UseFiltersArgs) => {
  const [filter, setFilter] = useState<string>("");

  const filteredOptions = useMemo(() => {
    return options.filter((value: any) => filterFunction(value, filter));
  }, [options, filter, filterFunction]);

  return {
    filter,
    setFilter,
    filteredOptions,
  };
};

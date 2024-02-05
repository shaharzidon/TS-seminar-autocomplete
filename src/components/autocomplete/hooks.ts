import { useState, useMemo } from "react";

// 6. use Pick utility type to constract dynamic type - when AutocompleteProps change the type is updated
type UseAutocompleteOptionSelectHandlareArgs = any;

export const useAutocompleteOptionSelectHandlare = ({
  getOptionID,
  isMulti,
}: UseAutocompleteOptionSelectHandlareArgs) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>(
    {},
  );

  const toggleOption = (option: any) => {
    const id = getOptionID(option);
    setSelectedOptions((lastState: Record<string, any>) => {
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
export type UseFiltersArgs = any;

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

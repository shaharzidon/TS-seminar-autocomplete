import { useEffect, useState } from "react";
import { useFilter } from "./hooks";

export type MultiOrSingular<T> =
  | { isMulti: true; onChange: (value: T[]) => void }
  | { isMulti: false; onChange: (value: T) => void };

export type AutocompleteProps<T> = {
  isMulti: boolean;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionID: (option: T) => string;
  filterFunction: (option: T, search: string) => boolean;
} & MultiOrSingular<T>;

type useFilterArguments<T> = Parameters<typeof useFilter<T>>[0];

export const Autocomplete = <T,>({
  options,
  getOptionID,
  isMulti,
  onChange,
  filterFunction,
}: AutocompleteProps<T>) => {
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

  useEffect(() => {
    // Check if it's a multi-select scenario
    if (isMulti) {
      // If it is, call the onChange with an array
      onChange(Object.values(selectedOptions));
    } else {
      // If it's a single-select, find the first selected option
      const singleOption = Object.values(selectedOptions)[0];
      if (singleOption !== undefined) {
        onChange(singleOption);
      }
    }
  }, [selectedOptions, isMulti, onChange]);

  // type safty for arguments that are not passed inline
  const useFiltersArguments: useFilterArguments<T> = {
    options,
    filterFunction,
  };

  const { filter, setFilter, filteredOptions } = useFilter(useFiltersArguments);

  return (
    <div>
      <SearchField filter={filter} setFilter={setFilter} />
    </div>
  );
};

type FilterState<T> = Pick<
  ReturnType<typeof useFilter<T>>,
  "filter" | "setFilter"
>;

type SearchFieldProps<T> = FilterState<T>;

const SearchField = <T,>({ filter, setFilter }: SearchFieldProps<T>) => {
  return <input value={filter} onChange={(e) => setFilter(e.target.value)} />;
};

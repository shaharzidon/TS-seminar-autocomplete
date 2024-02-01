import { useEffect, useState } from "react";
import { useFilter } from "./hooks";
import { SearchField } from "./searchField";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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
  getOptionLabel,
}: AutocompleteProps<T>) => {
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

  useEffect(() => {
    if (isMulti) {
      onChange(Object.values(selectedOptions));
    } else {
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
      <Popover>
        <PopoverTrigger>
          <SearchField filter={filter} setFilter={setFilter} />
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="flex flex-col gap-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={getOptionID(option)}
                  onClick={() => toggleOption(option)}
                  className={`${
                    selectedOptions[getOptionID(option)]
                      ? "bg-blue-300"
                      : "hover:bg-gray-200"
                  } cursor-pointer p-2 rounded-md`}
                >
                  {getOptionLabel(option)}
                </div>
              ))
            ) : (
              <div>No results</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

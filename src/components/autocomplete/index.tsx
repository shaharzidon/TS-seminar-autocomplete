import { useEffect } from "react";
import { useFilter, useAutocompleteOptionSelectHandlare } from "./hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "@/components/ui/input";
import {Option} from "./components"

// Discreminarting union
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

//type useFilterArguments<T> = Parameters<typeof useFilter<T>>[0];

export const Autocomplete = <T,>({
  options,
  getOptionID,
  isMulti,
  onChange,
  filterFunction,
  getOptionLabel,
}: AutocompleteProps<T>) => {  
  const {selectedOptions, toggleOption} = useAutocompleteOptionSelectHandlare({
    isMulti, 
    getOptionID
  })
  
  const { filter, setFilter, filteredOptions } = useFilter({
    options,
    filterFunction,  
  });
  
  // On options state change trigger onChange appropriatly
  useEffect(() => {
    if (isMulti) {
      const allOptions = Object.values(selectedOptions)
      onChange(allOptions);      
    } else {
      const singleOption = Object.values(selectedOptions)[0];
      if (singleOption !== undefined) {
        onChange(singleOption);        
      }
    }
  }, [selectedOptions, isMulti, onChange]);

  return (
    <div>
      <Popover>
        <PopoverTrigger autoFocus>
          <Input
            autoFocus
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </PopoverTrigger>
        <PopoverContent onOpenAutoFocus={(e)=>e.preventDefault()} align="start">
          <div className="flex flex-col gap-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <Option
                key={getOptionID(option)}
                onClickHandle={() => toggleOption(option)}
                isSelected={Boolean(selectedOptions[getOptionID(option)])}
                label={getOptionLabel(option)}
                />
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

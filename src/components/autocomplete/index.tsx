import { useEffect } from "react";
import { useFilter, useAutocompleteOptionSelectHandlare } from "./hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Option } from "./components";

// 3. build a type for the props
export type BaseAutocompleteProps<T> = {
  // the options that are available for choosing, for the best DX, allow array of any type
  options: T[];
  // is multi select or single value select
  isMulti: boolean;
  // a function to call when we want to generate a label from an option
  getOptionLabel: (options: T) => string;
  // a function to call when we want to generate an id from an option
  getOptionID: (options: T) => string;
  // a function that recieves an option and the search term and returns true if the option matches the search
  filterFunction: (option: T, searchTerm: string) => boolean;
};

// 4. build a type for the isMulti prop and the onChange function with the corresponding argument type
export type MultiOrSingular<T> =
  // if is multi is true the on change will recieve an array of selected options
  | { isMulti: true; onChange: (value: T[]) => void }
  // if is multi is false the on change will recieve a single value
  | { isMulti: false; onChange: (value: T) => void };

//5. generate the type by using a union
export type AutocompleteProps<T> = BaseAutocompleteProps<T> &
  MultiOrSingular<T>;

export const Autocomplete = <T,>({
  options,
  getOptionID,
  isMulti,
  onChange,
  filterFunction,
  getOptionLabel,
}: AutocompleteProps<T>) => {
  const { selectedOptions, toggleOption } = useAutocompleteOptionSelectHandlare(
    {
      isMulti,
      getOptionID,
    },
  );

  const { filter, setFilter, filteredOptions } = useFilter({
    options,
    filterFunction,
  });

  // On options state change trigger onChange appropriatly
  useEffect(() => {
    const allSelectedOptions = Object.values(selectedOptions);

    if (isMulti) {
      const allOptions = allSelectedOptions;
      onChange(allOptions);
      return;
    }

    const singleOption = allSelectedOptions[0];
    if (singleOption !== undefined) {
      onChange(singleOption);
    }
  }, [selectedOptions, isMulti, onChange]);

  // Function to render selected options
  const renderSelectedOptions = () => {
    const allSelectedOptions = Object.values(selectedOptions);

    if (allSelectedOptions.length === 0) {
      return null;
    }

    if (isMulti) {
      return (
        <span>
          {allSelectedOptions
            .map((option) => getOptionLabel(option))
            .join(", ")}
        </span>
      );
    }
    return getOptionLabel(allSelectedOptions[0]);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start">
      <Popover>
        {renderSelectedOptions()}
        <PopoverTrigger autoFocus>
          <Input
            className="min-w-full"
            placeholder="Search"
            type="text"
            name="search"
            autoFocus
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          align="start"
          sideOffset={12}
          className="max-h-[300px] overflow-y-auto"
        >
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

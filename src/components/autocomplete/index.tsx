import { useEffect } from "react";
import { useFilter, UseAutocompleteOptions } from "./hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Option } from "./components";

// 3. build a type for the props
export type BaseAutocompleteProps = {
  // the options that are available for choosing, for the best DX, allow array of any type
  options: any;
  // is multi select or single value select
  isMulti: any;
  // a function to call when we want to generate a label from an option
  getOptionLabel: any;
  // a function to call when we want to generate an id (string) from an option
  getOptionID: any;
  // a function that recieves an option and the search term and returns true if the option matches the search and false otherwise
  filterFunction: any;
};

// 4. build a type for the isMulti prop and the onChange function with the corresponding argument type
export type MultiOrSingular =
  // if is multi is true the on change will recieve an array of selected options
  | { isMulti: true; onChange: (options: any) => void }
  // if is multi is false the on change will recieve a single value
  | { isMulti: false; onChange: (option: any) => void };

// 5. generate the type by using a union
export type AutocompleteProps = any;

export const Autocomplete = ({
  options,
  getOptionID,
  isMulti,
  onChange,
  filterFunction,
  getOptionLabel,
}: AutocompleteProps) => {
  const { selectedOptions, toggleOption } = UseAutocompleteOptions({
    isMulti,
    getOptionID,
  });

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
    onChange(singleOption);
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

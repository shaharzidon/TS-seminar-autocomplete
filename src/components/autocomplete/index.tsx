import { useEffect } from "react";
import { useFilter, useAutocompleteOptionSelectHandlare } from "./hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "@/components/ui/input";
import { Option } from "./components";

// 3. build a type for the props with generics
export type BaseAutocompleteProps<T> = {
  options: T[];
  isMulti: boolean;
  getOptionLabel: (option: T) => string;
  getOptionID: (option: T) => string;
  filterFunction: (option: T, search: string) => boolean;
};

// NOTE: before 4, go to app.tsx and show the motivation for discrimenating unions
// 4. build a type for the isMulti prop and the onChange function with the corresponding argument type
export type MultiOrSingular<T> =
  | { isMulti: true; onChange: (value: T[]) => void }
  | { isMulti: false; onChange: (value: T) => void };

//5. generate the type by using a union
export type AutocompleteProps<T> = BaseAutocompleteProps<T> &
  MultiOrSingular<T>;

//8. create a type for the useFilters arguments
//type useFilterArguments<T> = Parameters<typeof useFilter<T>>[0];

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
    if (isMulti) {
      const allOptions = Object.values(selectedOptions);
      onChange(allOptions);
      return;
    }
    const singleOption = Object.values(selectedOptions)[0];
    if (singleOption !== undefined) {
      onChange(singleOption);
    }
  }, [selectedOptions, isMulti, onChange]);

  // Function to render selected options
  const renderSelectedOptions = () => {
    return isMulti ? (
      <span>
        {Object.values(selectedOptions)
          .map((option) => getOptionLabel(option))
          .join(", ")}
      </span>
    ) : (
      getOptionLabel(Object.values(selectedOptions)[0])
    );
  };

  return (
    <div className="w-full flex justify-stretch items-center">
      <Popover>
        <PopoverTrigger autoFocus>
          {renderSelectedOptions()}
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

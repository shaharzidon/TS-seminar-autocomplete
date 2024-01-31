import { useState, useEffect } from "react";

type MultiOrSingular<T> =
  | { isMulty: true; onChange: (value: T[]) => void }
  | { isMulty: false; onChange: (value: T) => void };

type AutocompleteProps<T> = {
  isMulty: boolean;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionID: (option: T) => string;
} & MultiOrSingular<T>;

export const Autocomplete = <T,>({
  options,
  getOptionID,
  isMulty,
  onChange,
}: AutocompleteProps<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, T>>({});

  const toggleOption = (option: T) => {
    const id = getOptionID(option);
    setSelectedOptions((lastState) => {
      const isOptionsSelected = lastState[id];
      if (isMulty) {
        //multi select
        //already selected
        if (isOptionsSelected) {
          const copy = { ...lastState };
          delete copy[id];
          return copy;
        }
        //not selected
        return {
          ...lastState,
          [id]: option,
        };
      }
      //single select
      if (isOptionsSelected) {
        //already selected
        return lastState;
      }
      //not selected
      return {
        [id]: option,
      };
    });
  };

  //
  useEffect(() => {
    if (isMulty) {
      onChange(Object.values(selectedOptions));
    } else {
      onChange(Object.values(selectedOptions)[0]);
    }
  }, [selectedOptions, isMulty, onChange]);
};

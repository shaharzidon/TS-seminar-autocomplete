import { useState } from "react";

type AutocompleteProps<T> = {
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionID: (option: T) => string;
};

export const Autocomplete = <T,>({ options }: AutocompleteProps<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<>([]);
};

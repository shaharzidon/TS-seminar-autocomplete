import { useFilter } from "./hooks";

type FilterState<T> = Pick<
  ReturnType<typeof useFilter<T>>,
  "filter" | "setFilter"
>;

type SearchFieldProps<T> = FilterState<T>;

export const SearchField = <T,>({ filter, setFilter }: SearchFieldProps<T>) => {
  return (
    <input
      style={{ border: "1px solid black" }}
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

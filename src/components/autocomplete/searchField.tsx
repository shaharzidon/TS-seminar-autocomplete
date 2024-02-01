import { useFilter } from "./hooks";
import { Input } from "@/components/ui/input";

type FilterState<T> = Pick<
  ReturnType<typeof useFilter<T>>,
  "filter" | "setFilter"
>;

type SearchFieldProps<T> = FilterState<T>;

export const SearchField = <T,>({ filter, setFilter }: SearchFieldProps<T>) => {
  return <Input value={filter} onChange={(e) => setFilter(e.target.value)} />;
};

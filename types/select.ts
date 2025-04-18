import { SelectOption } from "rizzui";

export interface BaseSelectProps {
  defaultValue?: string | null;
  onSelect?: (selected: SelectOption | null) => void;
}

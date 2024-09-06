import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StoreContext } from "@/context/store-context";
import { useContext } from "react";

type Props = {
  handleCategorySelect: (categoryId: string) => void;
};

const ChooseCategory = ({ handleCategorySelect }: Props) => {
  const { categories, selectedCategoryId } = useContext(StoreContext);

  return (
    <Select onValueChange={(value) => handleCategorySelect(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={
            categories.find((c) => c.id === selectedCategoryId)?.name ??
            "All category"
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value={" "}>All category</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChooseCategory;

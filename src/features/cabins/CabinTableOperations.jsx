import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "ALL" },
          { value: "no-discount", label: "No dicount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        sortField="sortBy"
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "sort by price(low first)" },
          { value: "regularPrice-desc", label: "sort by price(high first)" },
          { value: "maxCapacity-asc", label: "sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}
export default CabinTableOperations;

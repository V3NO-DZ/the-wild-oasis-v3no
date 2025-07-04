import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useCabins } from "./useCabins";

function CabinTable() {
  const {isLoading, error , cabins} = useCabins()

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  // Read filter from URL
  const filterValue = searchParams.get("discount") || "all";

  // Apply filter
  let filteredCabins = cabins;
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // sort functionalities

  const sortBy = searchParams.get("sortBy") || "price-asc"; // Correct default field
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });
  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table columns="1.8fr 2.2fr 4fr 4fr 2fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />

        
      </Table>
    </Menus>
  );
}

export default CabinTable;

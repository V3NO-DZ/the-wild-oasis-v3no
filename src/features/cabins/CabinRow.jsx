import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import EditCabinForm from "./EditCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal-v1";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <Table.Row role="row">
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount > 0 ? formatCurrency(discount) : "—"}</Discount>
      <Container>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={`menu-${cabinId}`} />
            <Menus.List id={`menu-${cabinId}`}>
              {/* ✅ Duplicate */}
              <Menus.MenuButton
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.MenuButton>

              {/* ✅ Edit (opens modal) */}
              <Modal.Open opens={`edit-cabin-${cabinId}`}>
                <Menus.MenuButton icon={<HiPencil />}>Edit</Menus.MenuButton>
              </Modal.Open>

              {/* ✅ Delete (opens modal) */}
              <Modal.Open opens={`delete-cabin-${cabinId}`}>
                <Menus.MenuButton icon={<HiTrash />} disabled={isDeleting}>
                  Delete
                </Menus.MenuButton>
              </Modal.Open>
            </Menus.List>

            {/* ✅ Edit Modal */}
            <Modal.Window name={`edit-cabin-${cabinId}`}>
              <EditCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            {/* ✅ Delete Modal */}
            <Modal.Window name={`delete-cabin-${cabinId}`}>
              <ConfirmDelete
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
                resourceName="cabins"
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Container>
    </Table.Row>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CabinRow;

import styled from "styled-components";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useEditCabin from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function EditCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: editValues });

  const { isEditing, editCabin } = useEditCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    editCabin(
      { newCabinData: { ...data, image }, id: editId },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <div>
          <Input
            type="text"
            id="name"
            disabled={isEditing}
            {...register("name", { required: "This field is required" })}
          />
          {errors?.name && <Error>{errors.name.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <div>
          <Input
            type="number"
            id="maxCapacity"
            disabled={isEditing}
            {...register("maxCapacity", {
              required: "This field is required",
              min: { value: 1, message: "Capacity should be at least 1" },
            })}
          />
          {errors?.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <div>
          <Input
            type="number"
            id="regularPrice"
            disabled={isEditing}
            {...register("regularPrice", {
              required: "This field is required",
              min: { value: 0, message: "Price should be positive" },
            })}
          />
          {errors?.regularPrice && <Error>{errors.regularPrice.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <div>
          <Input
            type="number"
            id="discount"
            disabled={isEditing}
            {...register("discount", {
              required: "This field is required",
              min: { value: 0, message: "Discount should be positive" },
              validate: (value) => {
                const regularPrice = getValues("regularPrice");
                return (
                  Number(value) <= Number(regularPrice) ||
                  "Discount cannot be greater than regular price"
                );
              },
            })}
          />
          {errors?.discount && <Error>{errors.discount.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <div>
          <Textarea
            id="description"
            disabled={isEditing}
            {...register("description", { required: "This field is required" })}
          />
          {errors?.description && <Error>{errors.description.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <div>
          <FileInput
            id="image"
            accept="image/*"
            disabled={isEditing}
            {...register("image")}
          />
          {errors?.image && <Error>{errors.image.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        
        <Button type="submit" disabled={isEditing}>
          Edit cabin
        </Button>
      </FormRow>
    </Form>
  );
}

EditCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default EditCabinForm;

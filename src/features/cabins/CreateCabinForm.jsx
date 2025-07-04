import styled from "styled-components";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import FormRow from "../../ui/FormRow";



const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ onCloseModal}) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { isCreating, createCabin } = useCreateCabin();

  function onSubmit(data) {
    createCabin(
      { ...data, image: data.image[0] },
      {
        onSuccess: () => {
          reset(), onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} typ={onCloseModal ?"modal" : "regular"}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <div>
          <Input
            type="text"
            id="name"
            disabled={isCreating}
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
            disabled={isCreating}
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
            disabled={isCreating}
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
            defaultValue={0}
            disabled={isCreating}
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
            defaultValue=""
            disabled={isCreating}
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
            disabled={isCreating}
            {...register("image", { required: "this image is required" })}
          />
          {errors?.image && <Error>{errors.image.message}</Error>}
        </div>
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          Create cabin
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  onCloseModal: PropTypes.func,
};

export default CreateCabinForm;

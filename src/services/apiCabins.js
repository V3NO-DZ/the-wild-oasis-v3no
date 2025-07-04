import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

// Create a new cabin or edit existing one
export async function createEditCabin(newCabin, id) {

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // ✅ Generate image name safely (replace slashes)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`; // ✅ Changed from "cabin-image" to "cabin-images" to match storage bucket name

  // 🧱 Prepare the query
  let query = supabase.from("cabins");

  // A) Create cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) Edit cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  // ✅ Await the insert/update query and fetch single record
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created or updated");
  }

  if (hasImagePath) {
    return data;
  }

  // 🖼️ Upload image only if it's a new file (not an existing image path)
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabins-images") // ✅ Use correct bucket name ("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
  }

  return data;
}





export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

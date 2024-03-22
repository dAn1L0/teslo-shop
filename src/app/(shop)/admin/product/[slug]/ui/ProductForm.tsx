"use client";

import { createUpdateProduct, removeProductImage } from "@/actions";
import { ProductImage } from "@/components";
import type { ICategory, Product, ProductImage as ProductWithImage } from "@/interfaces";
import { textCapitalize, textSlug } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[]};
  categories: ICategory[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

type FormInputs = {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kids" | "unisex";
  categoryId: string;

  //* images
  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
    watch
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      slug: textSlug(product.title ?? ''),
      tags: product.tags?.join(", "),
      sizes: product.sizes || [],
      images: undefined
    }
  });

  watch("sizes");

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));
  }

  const onSlugChanged = () => {
    const { title } = getValues();
    const newSlug = textSlug(title);
    const newTitle = textCapitalize(title);
    setValue("slug", newSlug);
    setValue("title", newTitle);
  }


  const onSubmit = async( data: FormInputs) => {
    const formData = new FormData();
    const { images,...productToSave } = data;
    if ( product.id ) {
      formData.append("id", product.id ?? "");
    }
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", `${productToSave.price}`);
    formData.append("inStock", `${productToSave.inStock}`);
    formData.append("sizes", `${productToSave.sizes}`);
    formData.append("tags", productToSave.tags);
    formData.append("gender", productToSave.gender);
    formData.append("categoryId", productToSave.categoryId);

    if (images) {
      for ( let i = 0 ; i < images.length ; i++ ) {
        formData.append("images", images[i]);
      }
    }

    const { ok, message, product: prod } = await createUpdateProduct(formData);
    if( !ok ){
      alert(`${ message }`);
    }
    router.replace(`/admin/product/${ prod?.slug }`)
    setValue("images", undefined);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-1 mb-16 grid-cols-1 sm:px-10 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input type="text" onKeyUp={onSlugChanged} className="p-3 border rounded-md bg-gray-200"
            {...register("title", { required: true })}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-3 border rounded-md bg-gray-200" readOnly
            {...register("slug", { required: true })}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-3 border rounded-md bg-gray-200 resize-none overflow-auto"
            { ...register("description", { required: true }) }></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-3 border rounded-md bg-gray-200" step="5.50" min="0.00"
            {...register("price", { required: true, min: 0 })}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-3 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-3 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoría</span>
          <select className="p-3 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}>
            <option value="">[Seleccione]</option>
            {
              categories.map( category => (
                <option key={ category.id } value={ category.id }>{ category.name }</option>
              ))
            }
          </select>
        </div>

        <button className="btn-primary w-full">
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input type="number" className="p-3 border rounded-md bg-gray-200" step="1" min="0"
            {...register("inStock", { required: true, min: 0 })}/>
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Tallas</span>
          <div className="flex flex-wrap">

            {
              sizes.map( size => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div
                  key={ size }
                  onClick={ () => onSizeChanged( size ) }
                  className={
                    clsx(
                      "flex items-center justify-center text-gray-800 w-10 h-10 mr-2 p-2 border-1 border-gray-300 hover:bg-blue-600 hover:text-white shadow-md rounded-md transition-all cursor-pointer",
                      {
                        "bg-blue-500 text-white": getValues("sizes").includes(size),
                      }
                    )
                  }
                >
                  <span>{ size }</span>
                </div>
              ))
            }

          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              {...register("images")}
              multiple
              className="p-3 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {
              product.ProductImage?.map( image => (
                <div key={ image.id } className="relative z-0 w-fit">
                  <ProductImage
                    src={ image.url }
                    alt={ product.slug ?? "" }
                    width={ 200 }
                    height={ 200 }
                    priority={true}
                    className="rounded shadow-md h-64 w-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={ () => removeProductImage( +image.id, image.url ) }
                    className="fade-in absolute z-10 top-1 right-1 rounded-full bg-gray-200 hover:bg-blue-500 text-gray-800 hover:text-white"
                  >
                    <IoCloseSharp size={25} className="m-1"/>
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </form>
  );
};
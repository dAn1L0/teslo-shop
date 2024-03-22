import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { Product } from "@/interfaces";


interface Props {
  params: {
    slug: string;
  };
}


export default async function ProductPage({ params }: Props) {

  const { slug } = params;
  const [ product, resp  ] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ]);
  const { ok, categories } = resp;

  if (!ok) {
    redirect("/admin/products");
  }

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  const title = ( slug === "new" ) ? 'Nuevo producto' : 'Editar producto';

  return (
    <>
      <Title title={ title }/>
      <ProductForm product={ product as Product ?? {} } categories={ categories }/>
    </>
  );
}
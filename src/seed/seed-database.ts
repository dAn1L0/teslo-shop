import { initialData } from "./seed";
import prisma from '../lib/prisma';
import bcryptjs from 'bcryptjs';
import { countries } from "./seed-countries";

async function main() {

  // 1. Truncado de datos
  await Promise.all([
    prisma.orderAddress.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.userAddress.deleteMany(),
    prisma.user.deleteMany(),
    prisma.country.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ])

  //! Cargamos la tabla Country
  await prisma.country.createMany({
    data: countries
  })
  //
  const { categories, products, users } = initialData;
  // 1.1 Para los usuarios
  users.forEach( async(user) => {
    const { password, ...rest } = user;
    await prisma.user.create({
      data: {
        ...rest,
        password: bcryptjs.hashSync(password, 10)
      }
    })
  })
  // 2. Crear categorías
  const categoriesData = categories.map( category => ({
    name: category
  }));
  await prisma.category.createMany({
    data: categoriesData
  });
  // 3. Crear productos
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[ category.name.toLowerCase() ] = category.id;
    return map
  }, {} as Record<string, string>); // <string=shirt, string=categoryId>
  // ! Para un producto
  // const { images, type, ...products1 } = products[0];
  // console.log(products1);
  // await prisma.product.create({
  //   data: {
  //     ...products1,
  //     categoryId: categoriesMap[type]
  //   }
  // })
  // * Para los productos
  products.forEach( async(product) => {
    const { images, type, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })
    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }))
    await prisma.productImage.createMany({
      data: imagesData
    })
  })


  console.log('Seed ejecutado exitosamente \u{1F49B}');
}

(() => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Seed no se puede ejecutar en producción.');
    return;
  }
  main();
})();
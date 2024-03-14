import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getProducts } from "./services/productCatalog";

const Home = async () =>  {

  const products = await getProducts(5);
  console.log('productus', products);
  
  return (
    <div>
      {/* Banner  */}
      <div className="bg-gray-900 h-72">
        <h1 className="text-white text-center text-5xl pt-20">Ecommerce Application is in progress</h1>
      </div>
      <div className="m-4 flex flex-wrap gap-2 shado">
        {
          products.data.map(item => <ProductCard item={item} />)
        }
      

      </div>
      <Link href='/products' className="inline-block text-orange-400 px-4 py-4 font-bold hover:underline">View All { '>'}</Link>
    </div>
  );
}

export default Home;

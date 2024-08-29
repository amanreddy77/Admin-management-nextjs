import { getProducts } from '@/dbConfig/products'; 
interface Product {
  id: string;
  title: string;
}

const ProfilePage = async () => {
  const products = await getProducts(); 

  return (
    <div>
      <h1>Profile</h1>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a href={`/product/${product.id}`}>{product.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;

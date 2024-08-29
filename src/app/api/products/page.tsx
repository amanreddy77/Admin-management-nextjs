import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ImageEditor from '@/components/ImageEditor'; 
import { fetchProduct, submitForReview } from '@/lib/api'; 
import { uploadImage } from '@/lib/firebase'; 
const ProductDetailPage = () => {
  const [product, setProduct] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { id } = router.query; 

  useEffect(() => {
    const loadProduct = async () => {
      if (typeof id === 'string') {
        const productData = await fetchProduct(id);
        if (productData) { 
          setProduct(productData);
          setTitle(productData.title);
        }
      }
    };
    loadProduct();
  }, [id]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleImageSave = async (file: File) => {
    setImageFile(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!product) return; 

    const updatedProduct = {
      ...product,
      title,
      imageUrl: imageFile ? await uploadImage(imageFile) : product.imageUrl,
    };

    await submitForReview(id as string, updatedProduct);
    router.push('/dashboard'); 
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <ImageEditor onSave={handleImageSave} />
        <button type="submit">Submit for Review</button>
      </form>
    </div>
  );
};

export default ProductDetailPage;

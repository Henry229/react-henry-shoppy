import { useState } from 'react';
import Button from '../components/ui/Button';
import { set } from 'firebase/database';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';
export default function NewProducts() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addNewProduct(product, url).then(() => {
          setSuccess('Product registered successfully');
          setTimeout(() => setSuccess(''), 4000);
        });
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <section className='container' onSubmit={handleSubmit}>
      <h2 className='my-4 text-2xl font-bold text-center'>
        Register New Products
      </h2>
      {success && <p className='my-2'>✅ {success}</p>}
      {file && (
        <img
          className='mx-auto mb-2 w-96'
          src={URL.createObjectURL(file)}
          alt='local file'
        />
      )}
      <form className='border-2 border-gray-300'>
        <div className='flex flex-col p-2'>
          <input
            type='file'
            accept='image/*'
            name='file'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='title'
            value={product.title ?? ''}
            placeholder='Product Name'
            required
            onChange={handleChange}
          />
          <input
            type='number'
            name='price'
            value={product.price ?? ''}
            placeholder='Price'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='category'
            value={product.category ?? ''}
            placeholder='Category'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='description'
            value={product.description ?? ''}
            placeholder='description'
            required
            onChange={handleChange}
          />
          <input
            type='text'
            name='options'
            value={product.options ?? ''}
            placeholder='Options(should be separated by comma'
            required
            onChange={handleChange}
          />
          <Button
            text={isUploading ? 'Uploading...' : 'Register Product'}
            disabled={isUploading}
          />
        </div>
      </form>
    </section>
  );
}

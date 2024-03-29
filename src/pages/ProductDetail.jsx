import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../components/context/AuthContext';
import { addOrUpdateToCart } from '../api/firebase';
import UseCart from '../\bhooks/useCart';

export default function ProductDetail() {
  // const { uid } = useAuthContext();
  const { addOrUpdateItem } = UseCart();
  const {
    state: {
      product: { id, title, description, category, price, image, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);

  const handleClick = () => {
    const product = { id, title, price, image, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('Added to cart successfully!');
        setTimeout(() => setSuccess(''), 3000);
      },
    });
    // addOrUpdateToCart(uid, product);
  };
  return (
    <>
      <p className='mx-12 mt-4 text-4xl font-bold text-gray-700'>{category}</p>
      <section className='flex flex-col p-4 md:flex-row '>
        <img className='w-full px-4 basis-7/12' src={image} alt={title} />
        <div className='flex flex-col w-full p-4 basis-5/12'>
          <h2 className='py-2 text-3xl font-semibold '>{title}</h2>
          <p className='py-2 text-2xl font-bold border-b border-gray-400'>
            ${price}
          </p>
          <p className='py-4 text-lg'>{description}</p>
          <div className='flex items-center'>
            <label className='font-bold text-brand' htmlFor='select'>
              options:
            </label>
            <select
              className='flex-1 p-2 m-4 border-2 border-dashed outline-none border-brand'
              onChange={handleSelect}
              id='select'
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          {success && <p className='my-2'>{success}</p>}
          <Button text='Add Cart' onClick={handleClick} />
        </div>
      </section>
    </>
  );
}

import { useAuthContext } from '../components/context/AuthContext';
import CartItem from '../components/CartItem';
import Button from '../components/ui/Button';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import UseCart from '../\bhooks/useCart';

const SHIPPING = 5;

export default function MyCart() {
  const { uid } = useAuthContext();
  const {
    cartQuery: { isLoading, data: products },
  } = UseCart();

  if (isLoading) {
    <p>Loading...</p>;
  }

  const hasProducts = products && products.length > 0;

  const totalPrice =
    hasProducts &&
    products.reduce(
      (acc, product) => acc + parseInt(product.price) * product.quantity,
      0
    );

  return (
    <section className='flex flex-col p-8'>
      <p className='pb-4 text-2xl font-bold text-center border-b border-gray-300'>
        My Cart
      </p>
      {!hasProducts && <p>Your cart is empty</p>}
      {hasProducts && (
        <>
          <ul className='px-4 mb-8 border-b border-gray-300'>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className='flex items-center justify-between px-2 mb-6 md:px-8 lg:px-16'>
            <PriceCard text='Total Price' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='Shipping fee' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='Total Amount' price={totalPrice + SHIPPING} />
          </div>
          <Button text='Order Now' />
        </>
      )}
    </section>
  );
}

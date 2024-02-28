import { AiOutlineShoppingCart } from 'react-icons/ai';
import UseCart from '../\bhooks/useCart';

export default function CartStatus() {
  // const { uid } = useAuthContext();
  // const { data: products } = useQuery({
  //   queryKey: ['cart'],
  //   queryFn: () => getCart(uid),
  // });
  const {
    cartQuery: { data: products },
  } = UseCart();

  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-4xl' />
      {products && (
        <p className='absolute w-6 h-6 font-bold text-center text-white bg-purple-500 rounded-full -top-1 -right-3'>
          {products.length}
        </p>
      )}
    </div>
  );
}

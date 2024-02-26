import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';

export default function NavBar() {
  return (
    <header className='flex justify-between px-8 py-4 border-b border-gray-300'>
      <Link to='/' className='flex items-center gap-1 text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>
          <AiOutlineShoppingCart className='text-4xl' />
        </Link>
        <Link to='/products/new'>
          <BsFillPencilFill />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../../api/firebase';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      console.log('>>> user in useEffect: ', user);
      setUser(user);
    });
  }, []);

  const handleLogin = async () => {
    const user = await login();
    // setUser(user);
  };

  const handleLogout = async () => {
    const user = await logout();
    // setUser('');
  };

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
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}

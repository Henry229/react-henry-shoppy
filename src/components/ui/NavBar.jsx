import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './Button';
import { useAuthContext } from '../context/AuthContext';

export default function NavBar() {
  const { user, login, logout } = useAuthContext();
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   onUserStateChange((user) => {
  //     console.log('==== user in useEffect', user);
  //     setUser(user);
  //   });
  // }, []);

  const handleLogin = async () => {
    await login();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className='flex justify-between px-8 py-4 border-b border-gray-300'>
      <Link to='/' className='flex items-center gap-1 text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        {user && (
          <Link to='/carts'>
            <AiOutlineShoppingCart className='text-4xl' />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to='/products/new'>
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={handleLogin} />}
        {user && <Button text={'Logout'} onClick={handleLogout} />}
      </nav>
    </header>
  );
}

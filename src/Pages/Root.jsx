import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Category from '../Components/Category';



function RootLayout() {
  // const navigation = useNavigation();4

  return (
    <>
      <Navbar />
      
      <main className='px-10'>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

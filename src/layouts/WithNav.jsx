import { Outlet } from 'react-router-dom';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';

export default function WithNav() {
  return (
    <>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

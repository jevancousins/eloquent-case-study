import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const LOGO_URL = 'https://cdn.magicpatterns.com/uploads/oRFHntu9QHZNkPzpEjWU8i/image.png';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F9F6F0] font-sans">
      <Sidebar />
      <main className="md:ml-[280px] lg:ml-[300px] p-4 md:p-6 lg:p-8 pb-20">
        <div className="max-w-[1100px] mx-auto">
          <Outlet />
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 z-50 p-4">
        <a href="https://www.eloquentai.co/" target="_blank" rel="noopener noreferrer">
          <img src={LOGO_URL} alt="Eloquent AI" className="h-8 object-contain" />
        </a>
      </footer>
    </div>
  );
}

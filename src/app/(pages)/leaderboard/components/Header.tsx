import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const Header = () => {
  return (
    <header className="p-4">
      <Link href="/topics" className="inline-flex items-center text-white hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Topics
      </Link>
    </header>
  );
};

export default Header;

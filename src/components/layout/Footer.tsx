import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-text">
        <div className="mb-2 md:mb-0">
          © {new Date().getFullYear()} GloPick. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-primary">
            서비스 소개
          </Link>
          <Link to="/terms" className="hover:text-primary">
            이용약관
          </Link>
          <Link to="/privacy" className="hover:text-primary">
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm mb-6 text-gray-600">
          <Link to="/about" className="hover:text-blue-600 transition-colors">
            서비스 소개
          </Link>
          <Link to="/terms" className="hover:text-blue-600 transition-colors">
            이용약관
          </Link>
          <Link to="/privacy" className="hover:text-blue-600 transition-colors">
            개인정보처리방침
          </Link>
          <Link to="/faq" className="hover:text-blue-600 transition-colors">
            FAQ
          </Link>
        </div>

        {/* 저작권 */}
        <div className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} GloPick. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

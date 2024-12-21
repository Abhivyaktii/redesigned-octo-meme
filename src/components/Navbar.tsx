import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* <Link to="/" className="font-bold text-xl">Portfolio</Link> */}
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/experience" className="hover:text-blue-600 transition-colors">Experience</Link>
            {/* <Link to="/projects" className="hover:text-blue-600 transition-colors">Projects</Link> */}
            <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/Abhivyaktii" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/abhinav-743047196/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 hover:text-blue-600 transition-colors" />
            </a>
            <a href="mailto:findabhi8@gmail.com">
              <Mail className="w-5 h-5 hover:text-blue-600 transition-colors" />
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Home</Link>
            <Link to="/experience" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Experience</Link>
            {/* <Link to="/projects" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Projects</Link> */}
            <Link to="/blog" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Blog</Link>
            <Link to="/contact" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
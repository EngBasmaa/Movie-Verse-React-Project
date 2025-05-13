import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaImdb } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-zinc-950 text-white pt-16 pb-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <MdLocalMovies className="text-3xl text-pink-500" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                Movie-Verce
              </span>
            </div>
            <p className="text-gray-400">
              Your ultimate destination for movie magic. Discover, explore, and enjoy the world of cinema like never before.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <FaYoutube className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FaImdb className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-pink-500 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Movies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">TV Shows</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Trending</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Upcoming</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-pink-500 pb-2 inline-block">
              Categories
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Action</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Comedy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Thriller</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Horror</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Sci-Fi</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-pink-500 pb-2 inline-block">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new releases and special offers.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded hover:opacity-90 transition-opacity font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Movie-Verce. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Contact Us</a>
          </div>
        </div>
      </div>

      {/* Floating movie elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden h-20 pointer-events-none">
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-pink-500 rounded-full filter blur-xl opacity-20"></div>
        <div className="absolute bottom-0 right-10 w-16 h-16 bg-purple-500 rounded-full filter blur-xl opacity-20"></div>
        <div className="absolute bottom-5 left-1/4 w-12 h-12 bg-blue-400 rounded-full filter blur-xl opacity-15"></div>
      </div>
    </footer>
  );
}
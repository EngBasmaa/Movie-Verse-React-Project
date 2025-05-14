import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaImdb,
} from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";

export function Footer() {
  return (
    <footer className="bg-zinc-900/95 backdrop-blur-lg text-white pt-12 pb-8 px-4 sm:px-8 w-full border-t border-zinc-700/30">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Logo and Description */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <MdLocalMovies className="text-2xl text-pink-400/90" />
              <span className="text-xl font-semibold text-pink-400/90">
                Movie-Verce
              </span>
            </div>
            <p className="text-zinc-400/80 text-sm leading-relaxed">
              Your ultimate destination for movie magic. Discover, explore, and
              enjoy the world of cinema like never before.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, color: "text-blue-400/80" },
                { icon: FaTwitter, color: "text-sky-400/80" },
                { icon: FaInstagram, color: "text-rose-400/80" },
                { icon: FaYoutube, color: "text-red-500/80" },
                { icon: FaImdb, color: "text-amber-400/80" },
              ].map((SocialIcon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`${SocialIcon.color} hover:opacity-75 transition-opacity`}
                >
                  <SocialIcon.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-zinc-300/90">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {["Home", "Movies", "TV Shows", "Trending", "Upcoming"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-zinc-400/80 hover:text-pink-300/90 text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-zinc-300/90">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {["Action", "Comedy", "Thriller", "Horror", "Sci-Fi"].map(
                (category) => (
                  <li key={category}>
                    <a
                      href="#"
                      className="text-zinc-400/80 hover:text-pink-300/90 text-sm transition-colors"
                    >
                      {category}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-zinc-300/90">
              Newsletter
            </h3>
            <p className="text-zinc-400/80 text-sm mb-3 leading-relaxed">
              Subscribe to get updates on new releases and special offers.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-zinc-800/50 border border-zinc-700/30 text-white px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-pink-400/50 focus:border-pink-400/30 placeholder:text-zinc-500"
              />
              <button
                type="submit"
                className="bg-pink-400/80 hover:bg-pink-400/90 text-zinc-900 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-700/30 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-zinc-500/80 text-xs">
            © {new Date().getFullYear()} Movie-Verce. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-zinc-500/80 hover:text-pink-300/90 text-xs transition-colors"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

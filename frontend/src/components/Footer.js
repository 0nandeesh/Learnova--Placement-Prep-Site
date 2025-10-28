import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Github, Mail, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Resources': [
      { name: 'DSA Problems', href: '/dsa' },
      { name: 'SQL Materials', href: '/sql' },
      { name: 'OS Notes', href: '/os' },
      { name: 'About', href: '/about' },
    ],
    'Support': [
      { name: 'Contact', href: '/contact' },
      { name: 'GitHub', href: 'https://github.com/prepnexus' },
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'License', href: '#' },
    ]
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/prepnexus', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/prepnexus', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/prepnexus', icon: Linkedin },
    { name: 'Email', href: 'mailto:contact@prepnexus.com', icon: Mail },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">PrepNexus</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Your smart placement companion. Master DSA, SQL, and OS concepts 
              with our comprehensive collection of problems and resources.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} PrepNexus. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">
                Made with ❤️ for students
              </span>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

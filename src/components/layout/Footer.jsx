import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto px-4 md:px-12 py-20 text-gray-500">
      <div className="flex gap-6 mb-8 text-white">
        <Github className="cursor-pointer hover:text-gray-400 transition" />
        <Linkedin className="cursor-pointer hover:text-gray-400 transition" />
        <Mail className="cursor-pointer hover:text-gray-400 transition" />
        <Twitter className="cursor-pointer hover:text-gray-400 transition" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
        <ul className="space-y-3">
          <li className="hover:underline cursor-pointer">Audio Description</li>
          <li className="hover:underline cursor-pointer">Investor Relations</li>
          <li className="hover:underline cursor-pointer">Legal Notices</li>
        </ul>
        <ul className="space-y-3">
          <li className="hover:underline cursor-pointer">Help Center</li>
          <li className="hover:underline cursor-pointer">Jobs</li>
          <li className="hover:underline cursor-pointer">Cookie Preferences</li>
        </ul>
        <ul className="space-y-3">
          <li className="hover:underline cursor-pointer">Gift Cards</li>
          <li className="hover:underline cursor-pointer">Terms of Use</li>
          <li className="hover:underline cursor-pointer">Corporate Information</li>
        </ul>
        <ul className="space-y-3">
          <li className="hover:underline cursor-pointer">Media Center</li>
          <li className="hover:underline cursor-pointer">Privacy</li>
          <li className="hover:underline cursor-pointer">Contact Us</li>
        </ul>
      </div>

      <div className="border border-gray-600 inline-block px-2 py-1 mb-4 text-xs cursor-pointer hover:text-white transition">
        Service Code
      </div>

      <p className="text-xs">© 2026 Developer Portfolio - Built with Passion</p>
    </footer>
  );
};

export default Footer;
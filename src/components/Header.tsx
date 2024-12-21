import React from 'react';
import { Gift } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Gift size={32} className="text-white" />
            <h1 className="text-2xl font-bold">Secret Santa</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#create" className="hover:text-red-200 transition-colors">
                  Create Group
                </a>
              </li>
              <li>
                <a href="#join" className="hover:text-red-200 transition-colors">
                  Join Group
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
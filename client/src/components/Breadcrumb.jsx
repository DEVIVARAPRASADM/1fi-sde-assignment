import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs text-slate-500 flex items-center">
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li>
          <Link
            to="/products"
            className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </li>
        <li>
          <Link
            to="/products"
            className="text-slate-500 hover:text-indigo-600 transition-colors font-medium"
          >
            Products
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li className={isLast ? 'text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs' : ''}>
                {isLast || !item.to ? (
                  <span>{item.label}</span>
                ) : (
                  <Link to={item.to} className="text-slate-500 hover:text-indigo-600 transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

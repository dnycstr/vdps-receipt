import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const GrayBadge: React.FC<Props> = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
      {children}
    </span>
  );
};

export const RedBadge: React.FC<Props> = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
      {children}
    </span>
  );
};

export const YellowBadge: React.FC<Props> = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
      {children}
    </span>
  );
};

export const GreenBadge: React.FC<Props> = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
      {children}
    </span>
  );
};

export const BlueBadge: React.FC<Props> = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
      {children}
    </span>
  );
};

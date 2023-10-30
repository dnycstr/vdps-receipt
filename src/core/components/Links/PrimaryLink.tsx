import { Link } from 'react-router-dom';

interface Props {
  to: string;
  children?: React.ReactNode;
}

export const PrimaryLink: React.FC<Props> = ({ to, children }) => {
  return (
    <Link to={to} className="text-sky-900 hover:text-sky-600">
      {children}
    </Link>
  );
};

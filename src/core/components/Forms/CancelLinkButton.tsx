import { Link } from 'react-router-dom';

interface Props {
  to: string;
}

export const CancelLinkButton: React.FC<Props> = ({ to }) => {
  return (
    <Link
      to={to}
      type="button"
      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Cancel
    </Link>
  );
};

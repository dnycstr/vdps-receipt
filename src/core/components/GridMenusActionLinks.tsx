import { Link } from 'react-router-dom';

interface Props {
  id: number;
  onClick: (paramId: number) => void;
  children?: React.ReactNode;
}

export const GridMenusActionLinks: React.FC<Props> = ({
  id,
  onClick,
  children,
  to,
}) => {
  return (
    <>
      <Link
        className="bg block pl-3 pr-16 py-1 text-sm text-gray-700 hover:text-gray-900 cursor-pointer hover:bg-gray-50"
        onClick={() => onClick(id)}
        to={to}
      >
        {children}
      </Link>
    </>
  );
};

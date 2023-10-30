interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export const SuccessBadge: React.FC<Props> = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-800">
      {children}
    </span>
  );
};

export const FailedBadge: React.FC<Props> = ({ children, onClick }) => {
  return (
    <span
      className="inline-flex items-center rounded-full bg-red-100 px-3 py-2 text-sm font-medium text-red-800"
      onClick={onClick}
    >
      {children}
    </span>
  );
};

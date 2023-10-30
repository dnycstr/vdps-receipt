interface Props {
  id: number;
  onClick: (paramId: number) => void;
  children?: React.ReactNode;
}

export const PrimaryActionLink: React.FC<Props> = ({
  id,
  onClick,
  children,
}) => {
  return (
    <span
      className="text-sky-900 hover:text-sky-600 cursor-pointer"
      onClick={() => onClick(id)}
    >
      {children}
    </span>
  );
};

interface Props {
  children?: React.ReactNode;
}

export const Table: React.FC<Props> = ({ children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">{children}</table>
  );
};

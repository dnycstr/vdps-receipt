interface Props {
  children?: React.ReactNode;
}

export const TableHeaderCenter: React.FC<Props> = ({ children }) => {
  return (
    <th
      scope="col"
      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    >
      {children}
    </th>
  );
};

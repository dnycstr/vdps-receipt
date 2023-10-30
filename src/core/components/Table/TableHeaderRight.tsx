interface Props {
  children?: React.ReactNode;
}

export const TableHeaderRight: React.FC<Props> = ({ children }) => {
  return (
    <th
      scope="col"
      className="relative py-3.5 pl-3 pr-6 text-sm font-semibold text-gray-900"
    >
      {children}
    </th>
  );
};

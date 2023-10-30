interface Props {
  children?: React.ReactNode;
}

export const TableHeaderLeft: React.FC<Props> = ({ children }) => {
  return (
    <th
      scope="col"
      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
    >
      {children}
    </th>
  );
};

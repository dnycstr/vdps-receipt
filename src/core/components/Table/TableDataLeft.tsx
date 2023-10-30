interface Props {
  children?: React.ReactNode;
}

export const TableDataLeft: React.FC<Props> = ({ children }) => {
  return (
    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
      {children}
    </td>
  );
};

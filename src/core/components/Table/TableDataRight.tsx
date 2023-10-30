interface Props {
  children?: React.ReactNode;
}

export const TableDataRight: React.FC<Props> = ({ children }) => {
  return (
    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium space-x-2">
      {children}
    </td>
  );
};

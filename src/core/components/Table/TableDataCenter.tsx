interface Props {
  children?: React.ReactNode;
}

export const TableDataCenter: React.FC<Props> = ({ children }) => {
  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      {children}
    </td>
  );
};

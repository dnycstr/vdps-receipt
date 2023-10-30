interface Props {
  children?: React.ReactNode;
}
/**
 * BoxBodyColumn is a full width component that organize the children in a column.
 */

export const BoxBodyColumn: React.FC<Props> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

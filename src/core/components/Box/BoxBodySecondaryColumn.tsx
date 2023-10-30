interface Props {
  children?: React.ReactNode;
}
/**
 * BoxBodySecondaryColumn is a narrow component that organize the children in a column.
 */

export const BoxBodySecondaryColumn: React.FC<Props> = ({ children }) => {
  return <div className="flex flex-col w-full lg:w-2/6">{children}</div>;
};

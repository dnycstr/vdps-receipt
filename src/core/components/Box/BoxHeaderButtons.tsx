interface Props {
  children?: React.ReactNode;
}

export const BoxHeaderButtons: React.FC<Props> = ({ children }) => {
  return (
    <div className="ml-4 mt-4 flex flex-shrink-0 space-x-3">{children}</div>
  );
};

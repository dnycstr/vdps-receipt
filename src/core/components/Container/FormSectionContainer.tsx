interface Props {
  children?: React.ReactNode;
}

export const FormSectionContainer: React.FC<Props> = ({ children }) => {
  return <div className="px-4 py-5 sm:px-6 space-y-6">{children}</div>;
};

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
}

export const PrimaryButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
    >
      {children}
    </button>
  );
};

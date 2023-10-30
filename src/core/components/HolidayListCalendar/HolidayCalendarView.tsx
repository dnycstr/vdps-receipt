interface Props {
  children?: React.ReactNode;
}

export const HolidayCalendarView: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="w-full bg-gray-50 px-4 py-4">{children}</div>
    </>
  );
};

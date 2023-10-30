import { XCircleIcon } from '@heroicons/react/20/solid';
import tw from 'tailwind-styled-components';

const BaseButton = tw.button`
relative -ml-px inline-flex items-center space-x-2 rounded-r-md border-hidden border-gray-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500
`;

interface Props {
  label?: string;
  onClick: () => void;
}

export const ComplexDeleteButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <BaseButton type="button" onClick={() => onClick()}>
      <XCircleIcon className="h-5 w-5 text-white-400" aria-hidden="true" />
      <span>{label}</span>
    </BaseButton>
  );
};

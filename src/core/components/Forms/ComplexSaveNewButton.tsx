import { PlusCircleIcon } from '@heroicons/react/20/solid';
import tw from 'tailwind-styled-components';

interface ButtonProps {
  disabled: boolean;
}

const BaseButton = tw.button<ButtonProps>`
relative -ml-px inline-flex items-center space-x-2 rounded-r-md border-hidden border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
${(props) => props.disabled && 'cursor-not-allowed'} 
`;

interface Props {
  label?: string;
  disabled: boolean;
}

export const ComplexSaveNewButton: React.FC<Props> = ({ label, disabled }) => {
  return (
    <BaseButton type="submit" disabled={disabled}>
      <PlusCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      <span>{label}</span>
    </BaseButton>
  );
};

import tw from 'tailwind-styled-components';

interface ButtonProps {
  disabled: boolean;
}

const BaseButton = tw.button<ButtonProps>`
ml-3 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm
${(props) =>
  !props.disabled &&
  'bg-primary-600  text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'} 
${(props) =>
  props.disabled &&
  'bg-gray-200 text-gray-400 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 cursor-not-allowed'} 
`;

interface Props {
  label: string;
  disabled: boolean;
}

export const SubmitButton: React.FC<Props> = ({ label, disabled }) => {
  return (
    <BaseButton type="submit" disabled={disabled}>
      {label}
    </BaseButton>
  );
};

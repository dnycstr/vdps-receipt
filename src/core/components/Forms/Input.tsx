import React from 'react';
import tw from 'tailwind-styled-components';

interface BaseInputProps {
  haserror: boolean;
  textalign: 'left' | 'center' | 'right';
}

const BaseInput = tw.input<BaseInputProps>`
block w-full rounded-md shadow-sm  bg-white sm:text-sm
${(props) => props.textalign === 'left' && 'text-left'} 
${(props) => props.textalign === 'center' && 'text-center'} 
${(props) => props.textalign === 'right' && 'text-right'} 
${(props) =>
  !props.haserror &&
  'border-gray-300 focus:border-primary-500 focus:ring-primary-500'} 
${(props) =>
  props.haserror && 'border-red-300 focus:border-red-500 focus:ring-red-500'} 
`;

type Props = {
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  textalign?: 'left' | 'center' | 'right';
  title?: string;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  label,
  placeholder,
  readonly,
  textalign = 'left',
  title,
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <BaseInput
          readOnly={readonly}
          type="text"
          haserror={false}
          placeholder={placeholder}
          textalign={textalign}
          title={title}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

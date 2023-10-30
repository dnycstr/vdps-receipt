import { useField, FieldHookConfig } from 'formik';
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & FieldHookConfig<string>;

export const FormikInput: React.FC<Props> = ({
  label,
  placeholder,
  readonly,
  textalign = 'left',
  // onChange,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <BaseInput
          {...field}
          readOnly={readonly}
          type="text"
          haserror={!!meta.error}
          placeholder={placeholder}
          textalign={textalign}
          // onChange={onChange}
        />
        {meta.error ? <div className="text-red-500">{meta.error}</div> : null}
      </div>
    </div>
  );
};

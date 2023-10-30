import { useField, FieldHookConfig } from 'formik';
import React from 'react';
import tw from 'tailwind-styled-components';

interface BaseTextAreaProps {
  haserror: boolean;
}

const BaseTextArea = tw.textarea<BaseTextAreaProps>`
block w-full rounded-md  shadow-sm  sm:text-sm
${(props) =>
  !props.haserror &&
  'border-primary-300 focus:border-primary-500 focus:ring-primary-500'} 
${(props) =>
  props.haserror && 'border-red-300 focus:border-red-500 focus:ring-red-500'} 
`;

type Props = {
  label?: string;
  rows?: number;
  readonly?: boolean;
  hideError?: boolean;
} & FieldHookConfig<string>;

export const TextArea: React.FC<Props> = ({
  label,
  rows,
  readonly,
  hideError,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <BaseTextArea
          {...field}
          readOnly={readonly}
          rows={rows}
          haserror={!!meta.error && !hideError}
        />
        {meta.error && !hideError ? (
          <div className="text-red-500">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

import { useController } from 'react-hook-form';
import { Checkbox, CheckboxProps } from '@mui/material';

interface SgCheckboxProps extends Omit<CheckboxProps, 'label'> {
  label: string;
  name: string;
  control: any;
  onChange?: (e: any) => void;
}

export const SgCheckbox = (props: SgCheckboxProps) => {
  const { label, name, control, onChange, defaultChecked } = props;

  console.log('defaultChecked:::::', defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (onChange) {
      onChange(checked);
    }
  };

  const { field } = useController({
    name,
    control,
    defaultValue: true,
  });

  return (
    <span>
      <Checkbox
        {...field}
        {...props}
        defaultChecked={defaultChecked}
        onChange={handleChange}
      />{' '}
      {label}
    </span>
  );
};

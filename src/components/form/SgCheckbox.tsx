import { useController } from 'react-hook-form';
import { Checkbox, CheckboxProps } from '@mui/material';

interface SgCheckboxProps extends Omit<CheckboxProps, 'label'> {
  label: string;
  name: string;
  control: any;
  onChange?: () => void;
}

export const SgCheckbox = (props: SgCheckboxProps) => {
  const { label, name, control, onChange } = props;
  const { field } = useController({
    name,
    control,
    defaultValue: true,
  });

  return (
    <span>
      <Checkbox {...field} {...props} defaultChecked={true} /> {label}
    </span>
  );
};

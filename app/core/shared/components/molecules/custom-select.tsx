import { cn } from '../../utils';
import { Select, SelectContent, SelectTrigger, SelectValue } from '../atoms';
import { SelectProps } from '../atoms/select';

interface CustomSelectProps extends SelectProps {
  placeholder?: string;
  hasError?: boolean;
  value?: string;
  triggerClassName?: string;
  onChange?: (value: string) => void;
}

export const CustomSelect = ({
  hasError,
  placeholder,
  ...props
}: CustomSelectProps) => {
  const { name, label } = props;
  return (
    <div className="flex flex-col gap-[0.5rem] w-full">
      {label && (
        <label htmlFor={name} className="text-[0.75rem] font-medium">
          {label}
        </label>
      )}
      <Select
        disabled={props.disabled}
        onValueChange={props.onChange}
        value={props.value}
      >
        <SelectTrigger
          className={cn(
            `h-[2.5rem] w-full ${props.value ? 'capitalize' : 'inherit'}`,
            { 'bg-tertiary/20 border-tertiary/20': hasError },
            props.triggerClassName
          )}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          {props.children}
        </SelectContent>
      </Select>
    </div>
  );
};

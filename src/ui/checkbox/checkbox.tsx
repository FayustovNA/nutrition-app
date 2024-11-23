import React from 'react';
import styles from './checkbox.module.css';

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: any;
  required: any;
  agree?: any;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  checked,
  onChange,
  value,
  required
}) => {
  return (
    <div className={styles.checkbox}>
      <label>
        <input
          name={name}
          className={styles.checkmark}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          value={value}
          required={required}
        />
        <span className={styles.cust} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;

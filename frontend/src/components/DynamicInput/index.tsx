import React, { useState } from 'react';
import { Input } from 'antd';

export type DynamicInputProps = {
  onInputChange?: (value: string) => void;
};

const DynamicInput: React.FC<DynamicInputProps> = (props) => {
  const { onInputChange, defaultValue } = props;
  const [inputValue, setInputValue] = useState(defaultValue);

  const inputStyle = {
    width: `${inputValue?.length * 18 + 5}px`,
  };

  return (
    <Input
      onChange={(e) => {
        setInputValue(e.target.value);
        onInputChange(e.target.value);
      }}
      value={inputValue}
      style={inputStyle}
      {...props}
    />
  );
};

export default DynamicInput;

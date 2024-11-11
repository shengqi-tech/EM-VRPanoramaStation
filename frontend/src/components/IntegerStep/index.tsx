import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import './index.less';

export type IntegerStepProps = {
  onChange?: (value?: number | string | null) => void;
  defaultValue?: any;
  value?: string;
};

const IntegerStep: React.FC<IntegerStepProps> = (props) => {
  const { defaultValue } = props;

  const [inputValue, setInputValue] = useMergedState<number | string | null>(defaultValue, {
    value: props.value,
    onChange: props.onChange,
  });

  const onChange = (newValue: number | string | null) => {
    setInputValue(newValue);
  };

  return (
    <Row className="IntegerStep" align="middle" justify="space-between">
      <Col span={16}>
        <Slider
          min={-25}
          max={25}
          step={0.01}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={6}>
        <InputNumber
          size="small"
          min={-25}
          max={25}
          formatter={(value) => `${Number(value)?.toFixed(2)}`}
          value={inputValue}
          step={0.01}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
export default IntegerStep;

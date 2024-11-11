import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import './index.less';

export type IntegerStepProps = {
  onChange?: (value?: number | string | null) => void;
  defaultValue?: any;
  value?: string;
  marks?: any;
  step?: number;
  min?: number;
  max?: number;
  leftLabel?: string;
  rightLabel?: string;
};

const InputSlider: React.FC<IntegerStepProps> = (props) => {
  const { defaultValue, min, max, marks, step, leftLabel, rightLabel } = props;

  const [inputValue, setInputValue] = useMergedState<any>(defaultValue, {
    value: props.value,
    onChange: props.onChange,
  });

  const onChange = (newValue: any) => {
    setInputValue(newValue);
  };

  return (
    <Col className="InputSlider">
      <Row style={{ width: '100%', marginBottom: '5px' }} justify="center">
        <Slider
          style={{ width: '98%' }}
          range
          marks={marks}
          step={step}
          min={min}
          max={max}
          defaultValue={defaultValue}
          onChange={onChange}
          value={inputValue}
        />
      </Row>
      <Row style={{ width: '100%' }} justify="space-between">
        <Col span={5}>
          <InputNumber
            bordered={false}
            size="small"
            min={min}
            max={max}
            step={step}
            value={inputValue[0]}
            onChange={(value) => {
              setInputValue([value, inputValue[1]]);
            }}
          />
          <div className="text">{leftLabel}</div>
        </Col>
        <Col span={5}>
          <InputNumber
            bordered={false}
            size="small"
            min={min}
            max={max}
            value={inputValue[1]}
            onChange={(value) => {
              setInputValue([inputValue[0], value]);
            }}
            step={step}
          />
          <div className="text">{rightLabel}</div>
        </Col>
      </Row>
    </Col>
  );
};
export default InputSlider;

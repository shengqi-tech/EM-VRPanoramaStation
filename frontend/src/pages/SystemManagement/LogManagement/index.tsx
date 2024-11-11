import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import IntroduceRow from './components/IntroduceRow';
import { visitData, salesData, visitData2, searchData } from './mock';
import { Col, Dropdown, Row } from 'antd';
import type dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import TopSearch from './components/TopSearch';
import type { TimeType } from './components/SalesCard';
import SalesCard from './components/SalesCard';
import { getTimeDistance } from './utils/utils';
import { useEffect, useState } from 'react';
import styles from './style.less';
type RangePickerValue = RangePickerProps<dayjs.Dayjs>['value'];

const loading = false;
const LogManagement = () => {
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance('year'),
  );
  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };
  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };
  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as dayjs.Dayjs, 'day') &&
      rangePickerValue[1].isSame(value[1] as dayjs.Dayjs, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };
  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: '操作一',
            },
            {
              key: '2',
              label: '操作二',
            },
          ],
        }}
        placement="bottomRight"
      >
        <EllipsisOutlined />
      </Dropdown>
    </span>
  );

  useEffect(() => {}, []);

  return (
    <PageContainer>
      <IntroduceRow loading={loading} visitData={visitData || []} />
      <SalesCard
        rangePickerValue={rangePickerValue}
        salesData={salesData || []}
        isActive={isActive}
        handleRangePickerChange={handleRangePickerChange}
        loading={loading}
        selectDate={selectDate}
      />
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <TopSearch
            loading={loading}
            visitData2={visitData2 || []}
            dropdownGroup={dropdownGroup}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};
export default LogManagement;

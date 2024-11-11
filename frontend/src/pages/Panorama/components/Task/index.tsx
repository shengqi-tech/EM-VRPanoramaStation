import { useModel } from 'umi';
import { Checkbox, Col, Row, Segmented } from 'antd';
import './index.less';
import { Button } from 'antd';
import { InfoCircleOutlined, CloseOutlined } from '@ant-design/icons';
import './index.less';
const Task = () => {
  const { isTaskShow, setIsTaskShow } = useModel('Panorama.data', (ret) => ({
    isTaskShow: ret.isTaskShow,
    setIsTaskShow: ret.setIsTaskShow,
  }));

  const onChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
  };

  return (
    <>
      <div className={`TaskBox ${isTaskShow ? 'showAnimation' : 'hideAnimation'}`}>
        <div className="btn">
          <Button type="ghost" icon={<InfoCircleOutlined />}>
            运维任务
          </Button>
          <CloseOutlined
            onClick={() => {
              setIsTaskShow(!isTaskShow);
            }}
            className="btn-close"
          />
        </div>
        <div className="content">
          <Segmented block options={['日', '周', '月', '季度', '年']} />
          <div className="taskList">
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
              <Row>
                <Col span={24}>
                  <Checkbox value="A">
                    <span className="taskName">
                      保持机房、实验室、监测用房《监控箱》的清洁，保持设备的清洁。
                    </span>
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="B">
                    <span className="taskName">对电源控制器、空调等辅助设备要进行经常性检查</span>
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </>
  );
};
export default Task;

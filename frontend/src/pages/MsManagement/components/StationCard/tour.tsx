import { useModel } from 'umi';
import Joyride from 'react-joyride';
import { useEffect } from 'react';
interface IProps {
  run: boolean;
  onSetStatus: any;
}

const Tour = (props: IProps) => {
  const { first, setFirst } = useModel('mobile', (ret) => ({
    first: ret.first,
    setFirst: ret.setFirst,
  }));
  const { run = true, onSetStatus } = props;
  const steps = [
    {
      target: '.tour-first',
      title: 'VR全景浏览',
      content:
        '通过VR全景浏览系统可以快速、便捷、简单、直观的浏览由VR全景编辑器软件设计编辑的生态环境监测站',
      disableBeacon: true,
      hideCloseButton: true,
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { action } = data;
    if (action == 'reset') {
      onSetStatus(false);
    }
  };

  useEffect(() => {
    return () => {
      setFirst(true);
    };
  }, []);

  return (
    <>
      {!first && (
        <Joyride
          steps={steps}
          continuous={true}
          locale={{ back: '返回', close: '关闭', last: '结束', next: '下一步', skip: '跳过' }}
          styles={{
            options: {
              primaryColor: '#2F54EB',
              textColor: '#000',
            },
          }}
          showSkipButton={true}
          disableOverlayClose={true}
          run={run}
          callback={handleJoyrideCallback}
        />
      )}
    </>
  );
};

export default Tour;

import { useEffect, useState, useRef } from 'react';
import { Common } from '@/utils/three/xThree';
import { useModel } from 'umi';
import QRCode from 'qrcode.react';
import { Modal, Space, Input, Button, message } from 'antd';
import {
  StopOutlined,
  createFromIconfontCN,
  InfoCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import './index.less';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});

const FuncBtns = () => {
  const { isMobile } = useModel('mobile', (ret) => ({
    isMobile: ret.isMobile,
  }));
  const { instanceConf } = useModel('Panorama.data', (ret) => ({
    instanceConf: ret.instanceConf,
  }));

  const synth = window.speechSynthesis;
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isAutoRotateOn, setIsAutoRotateOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workAddr, setWorkAddr] = useState('');
  const [iframeAddr, setIframeAddr] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /**
   * 开启/关闭 声音
   */
  const handleSoundClick = () => {
    setIsSoundOn(!isSoundOn);
  };

  /**
   * 开启/关闭 自动旋转
   */
  const handleAutoRotateClick = () => {
    setIsAutoRotateOn(!isAutoRotateOn);
    Common.autoRotate(!isAutoRotateOn);
  };

  /**
   * 进入/退出 全屏
   */
  const handleFullscreenClick = () => {
    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  /**
   * 进入全屏
   */
  const enterFullscreen = () => {
    if (document.fullscreenEnabled) {
      document.documentElement.requestFullscreen();
    }
    setIsFullscreen(true);
  };

  /**
   * 退出全屏
   */
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  /**
   * 复制文本到剪贴板
   */
  const handleCopy = (text) => {
    if (text) {
      const tempInput = document.createElement('input');
      tempInput.style.opacity = '0';
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      message.success('复制成功');
    }
  };

  useEffect(() => {
    let utterance;

    if (isSoundOn && synth) {
      utterance = new SpeechSynthesisUtterance();
      utterance.text = instanceConf?.des;
      synth.speak(utterance);
    } else {
      if (synth) {
        synth.cancel();
      }
    }

    // 组件卸载时取消语音合成
    return () => {
      if (synth) synth.cancel();
    };
  }, [isSoundOn]);

  useEffect(() => {
    const currentURL = window.location.href;
    setWorkAddr(currentURL);
    const iframUrl = `<iframe src=${currentURL} frameborder=no width=700 height=500>`;
    setIframeAddr(iframUrl);

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement ? true : false);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="icons">
      <span className="icon-autoRotate">
        <IconFont type="icon-dituxuanzhuanduiqi" className="icon" onClick={handleAutoRotateClick} />
        {isAutoRotateOn ? <StopOutlined className="icon-disableRotate" /> : null}
      </span>
      {!isMobile && (
        <>
          <IconFont
            type={isSoundOn ? 'icon-shengyinkai' : 'icon-shengyinguanbi'}
            className="icon sound"
            onClick={handleSoundClick}
          />
          {/* <InfoCircleOutlined className="icon" /> */}
          {isFullscreen ? (
            <FullscreenExitOutlined className="icon" onClick={handleFullscreenClick} />
          ) : (
            <FullscreenOutlined className="icon" onClick={handleFullscreenClick} />
          )}
        </>
      )}

      <ShareAltOutlined className="icon" onClick={showModal} />
      <Modal
        title="分享"
        open={isModalOpen}
        centered
        footer={false}
        width={isMobile ? 250 : 680}
        mask={false}
        onCancel={handleCancel}
      >
        <div style={{ width: '100%', display: 'flex', padding: ' 0 20px 20px 20px' }}>
          <QRCode value={workAddr} size={160} />
          {!isMobile && (
            <div
              style={{
                flex: 1,
                marginLeft: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <span>作品网址</span>
              <Space.Compact style={{ width: '100%' }}>
                <Input value={workAddr} style={{ width: '100%' }} />
                <Button
                  type="primary"
                  onClick={() => {
                    handleCopy(workAddr);
                  }}
                >
                  复制
                </Button>
              </Space.Compact>

              <span>嵌入网址</span>
              <Space.Compact style={{ width: '100%' }}>
                <Input value={iframeAddr} style={{ width: '100%' }} />
                <Button
                  type="primary"
                  onClick={() => {
                    handleCopy(iframeAddr);
                  }}
                >
                  复制
                </Button>
              </Space.Compact>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default FuncBtns;

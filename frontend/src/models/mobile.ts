import { useState } from 'react';

export default () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [first, setFirst] = useState(false);

  window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth <= 768);
  });

  return {
    isMobile,
    setIsMobile,
    first,
    setFirst,
  };
};

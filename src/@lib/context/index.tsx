import store from '@lib/redux/store';
import type { ThemeConfig } from 'antd';
import { ConfigProvider } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';

type TProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: TProps) => {
  const theme: ThemeConfig = {
    token: {
      fontFamily: 'var(--font-josefinSans)',
      fontSize: 16,
      colorPrimary: '#ac941f',
      colorPrimaryActive: '#5e5217',
      colorPrimaryBorder: '#ac941f',
      colorPrimaryHover: '#5e5217',
      colorLinkActive: '#5e5217',
      colorLinkHover: '#5e5217',
      screenXSMax: 639,
      screenSMMin: 640,
      screenSM: 640,
      screenMDMax: 1023,
      screenLGMin: 1024,
      screenLG: 1024,
      screenLGMax: 1279,
      screenXLMin: 1280,
      screenXL: 1280,
      screenXLMax: 1535,
      screenXXLMin: 1536,
      screenXXL: 1536,
    },
  };

  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </Provider>
  );
};

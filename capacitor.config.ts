import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: 'https://localhost:8100',
    cleartext: true
  }
};

export default config;

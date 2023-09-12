import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ng.plut.app',
  appName: 'plut',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;

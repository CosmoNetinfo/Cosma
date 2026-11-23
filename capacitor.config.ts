import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'info.cosmonet.cosma',
  appName: 'Cosma',
  webDir: 'www',
  server: { androidScheme: 'https', hostname: 'localhost' },
  android: { allowMixedContent: false, webContentsDebuggingEnabled: false },
  plugins: {
    SystemBars: { insetsHandling: 'css', initialViewportFitValueHint: 'cover', style: 'LIGHT' },
    SplashScreen: { launchAutoHide: true, launchShowDuration: 300, backgroundColor: '#7c3aed', showSpinner: false },
    LocalNotifications: { smallIcon: 'ic_stat_cosma', iconColor: '#7c3aed' },
    CapacitorSQLite: { androidIsEncryption: false }
  }
};

export default config;

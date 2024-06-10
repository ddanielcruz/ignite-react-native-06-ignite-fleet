import 'dotenv/config'

const { GOOGLE_CLIENT_ID_IOS } = process.env
if (!GOOGLE_CLIENT_ID_IOS) {
  throw new Error('GOOGLE_CLIENT_ID_IOS is not set')
}

const GOOGLE_CLIENT_ID_IOS_REVERSED = GOOGLE_CLIENT_ID_IOS.split('.')
  .reverse()
  .join('.')

module.exports = {
  expo: {
    name: 'ignite-react-native-06-ignite-fleet',
    slug: 'ignite-react-native-06-ignite-fleet',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#202024',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.danielcruz.ignitefleet',
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [GOOGLE_CLIENT_ID_IOS_REVERSED],
          },
        ],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#202024',
      },
      package: 'com.danielcruz.ignitefleet',
    },
    plugins: [
      'expo-font',
      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme: GOOGLE_CLIENT_ID_IOS_REVERSED,
        },
      ],
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            'Allow IgniteFleet to use your location.',
        },
      ],
    ],
  },
}

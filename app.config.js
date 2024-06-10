import 'dotenv/config'

const { GOOGLE_CLIENT_ID_IOS, GOOGLE_MAPS_API_KEY } = process.env
if (!GOOGLE_CLIENT_ID_IOS) {
  throw new Error('GOOGLE_CLIENT_ID_IOS is not set')
}

const GOOGLE_CLIENT_ID_IOS_REVERSED = GOOGLE_CLIENT_ID_IOS.split('.')
  .reverse()
  .join('.')

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('GOOGLE_MAPS_API_KEY is not set')
}

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
      config: {
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#202024',
      },
      package: 'com.danielcruz.ignitefleet',
      config: {
        googleMaps: {
          apiKey: GOOGLE_MAPS_API_KEY,
        },
      },
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

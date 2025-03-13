import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import each from 'lodash/each';

import AppImages from './theme/Images';
import AppSounds from './theme/Sounds';

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

function PreloadAssets({ Images, Fonts, Sounds, children }) {
  const [appIsReady, setAppIsReady] = useState(false);

  // Load any resources or data that you need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        const images: any[] = [];
        each({ ...AppImages, ...Images }, (value, key) => {
          images.push(value);
        });

        each({ ...AppSounds, ...Sounds }, (value, key) => {
          images.push(value);
        });

        const fonts = [MaterialIcons.font];

        each(Fonts, (value, key) => {
          fonts.push({
            [key]: value,
          });
        });

        const imageAssets = cacheImages([...images]);
        const fontAssets = cacheFonts([...fonts]);

        await Promise.all([...imageAssets, ...fontAssets]);
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.log('====================================');
        console.log('Error loading assets', e);
        console.log('====================================');
        console.warn(e);
      } finally {
        setAppIsReady(true);
        void SplashScreen.hideAsync();
      }
    }

    void loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={Images.Splash}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        />
      </View>
    );
  }

  return <>{children}</>;
}

export default PreloadAssets;

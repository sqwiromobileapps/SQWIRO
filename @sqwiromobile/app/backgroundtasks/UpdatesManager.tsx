import React, { useState, useEffect } from 'react';
import { Platform, Linking } from 'react-native';
import * as Updates from 'expo-updates';
import { Block, Button, useInterval, Text } from '@expocraft/core';
import BlockModal from '@expocraft/core/lib/modal/BlockModal';
import * as Application from 'expo-application';
import { colors, sizes } from '@cloudhubke/app/theme';

let DeviceInfo = {} as any;

try {
  DeviceInfo = require('react-native-device-info');
} catch (error) {
  //
}

const UpdatesManager = () => {
  const [updateavailable, setUpdateAvailable] = useState(false);
  const [updateFromGooglePlay, setUpdateFromGooglePlay] = useState(false);
  const [updateFromAppStore, setUpdateFromAppStore] = useState(false);

  const doUpdate = () => {
    Updates.reloadAsync();
    setUpdateAvailable(false);
  };

  const checkForUpdates = async () => {
    if (__DEV__) return;
    await Updates.checkForUpdateAsync();
  };

  const openApp = async () => {
    try {
      if (Platform.OS === 'android') {
        await Linking.openURL(
          `https://play.google.com/store/apps/details?id=com.labfoxx.app&hl=en&gl=US`
        );
      }

      if (Platform.OS === 'ios') {
        await Linking.openURL(
          `itms-apps://apps.apple.com/us/app/labfoxx/id1480000000'`
        );
      }
    } catch (error) {
      //
    }

    //
  };

  useInterval(() => {
    if (!__DEV__) {
      checkForUpdates();
    }
  }, 30000);

  useEffect(() => {
    const updatesEventListener = ({ type }) => {
      if (type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        setTimeout(() => {
          setUpdateAvailable(true);
        }, 10000);
      }
    };

    const updatesEvent = Updates.addListener(updatesEventListener);

    return () => {
      updatesEvent.remove();
    };
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      const version = `${Application.nativeApplicationVersion}`.split('.')[0];
      if (Number(version) < 7) {
        setUpdateFromGooglePlay(true);
      }
    }

    if (Platform.OS === 'ios') {
      if (DeviceInfo.getVersion && Number(DeviceInfo.getVersion()) < 9) {
        setUpdateFromAppStore(true);
      }
    }

    setTimeout(() => {
      checkForUpdates();
    }, 5000);
  }, []);

  return (
    <>
      <BlockModal
        onClose={doUpdate}
        isVisible={updateavailable}
        margin={sizes.margin}
        fill
        color="transparent"
      >
        <Block
          style={{
            justifyContent: 'center',
          }}
        >
          <Block
            padding={sizes.padding}
            flex={false}
            color={colors.milkyWhite}
            rounded
          >
            <Block flex={false} padding={sizes.padding}>
              <Text h4 primary>
                Update Available
              </Text>
            </Block>
            <Block
              flex={false}
              padding={[0, sizes.padding, sizes.padding, sizes.padding]}
            >
              <Text dark>
                For your improved experience, an update needs to be installed.
                Sorry for any inconvinience. 🙏🏼
              </Text>
              <Text dark style={{ marginTop: 10 }}>
                Please press the reload button
              </Text>
            </Block>

            <Block
              medium
              padding={[0, sizes.padding, sizes.padding, sizes.padding]}
              row
              flex={false}
            >
              <Button small rounded dark onPress={doUpdate}>
                <Text button h5 milkyWhite>
                  Reload
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </BlockModal>

      <BlockModal
        // onClose={() => setUpdateFromGooglePlay(false)}
        isVisible={updateFromGooglePlay}
        fill
        rounded
        margin={sizes.margin}
        swipeDirection="none"
        roundedTop
        roundedBottom
      >
        <Block center middle>
          <Block flex={false}>
            <Block padding={sizes.padding} flex={false} center>
              <Text
                small
              >{`Your app is version ${Application.nativeApplicationVersion}`}</Text>
              <Text h4 primary>
                {`Update now from Google Play`}
              </Text>
            </Block>
            <Block padding flex={false} center>
              <Text dark style={{ marginTop: 10 }}>
                A new version of the app is available on Google Play. Please
                update.
              </Text>
            </Block>

            <Block
              medium
              padding={[0, sizes.padding, sizes.padding, sizes.padding]}
              row
              flex={false}
              center
            >
              <Button small rounded dark onPress={openApp}>
                <Text button h5 milkyWhite>
                  Go to Google Play
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </BlockModal>

      <BlockModal
        // onClose={() => setUpdateFromGooglePlay(false)}
        isVisible={updateFromAppStore}
        fill
        rounded
        margin={sizes.margin}
        swipeDirection="none"
        roundedTop
        roundedBottom
      >
        <Block center middle>
          <Block flex={false}>
            <Block padding={sizes.padding} flex={false} center>
              <Text
                small
              >{`Your app is version ${Application.nativeApplicationVersion}`}</Text>
              <Text h4 primary>
                {`Update from the App Store`}
              </Text>
            </Block>
            <Block padding flex={false}>
              <Text dark style={{ marginTop: 10 }}>
                A new version of the app is available on App Store. Please
                update.
              </Text>
            </Block>

            <Block
              medium
              padding={[0, sizes.padding, sizes.padding, sizes.padding]}
              row
              flex={false}
              center
            >
              <Button small rounded dark onPress={openApp}>
                <Text button h5 milkyWhite>
                  Go to App Store
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </BlockModal>
    </>
  );
};

export default UpdatesManager;

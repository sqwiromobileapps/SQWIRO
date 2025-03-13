import React from 'react';
import ThemeProvider from '@expocraft/core/lib/theme/ThemeProvider';
import { colors, sizes, fonts, Images } from '@cloudhubke/app/theme';
import UpdatesManager from '@cloudhubke/app/backgroundtasks/UpdatesManager';
import AppHome from '@cloudhubke/app/AppHome';
import getConfig from '@cloudhubke/app/config/getConfig';
import PreloadAssets from '@cloudhubke/app/PreloadAssets';

require('./DismissWarnings');

const App = () => {
  const Fonts = {
    'clanpro-bold': require('./@cloudhubke/app/assets/fonts/clanpro/clanpro-bold.ttf'),
    'clanpro-black': require('./@cloudhubke/app/assets/fonts/clanpro/clanpro-black.ttf'),
    'clanpro-book': require('./@cloudhubke/app/assets/fonts/clanpro/clanpro-book.ttf'),
    'clanpro-thin': require('./@cloudhubke/app/assets/fonts/clanpro/clanpro-thin.ttf'),
  };

  return (
    <PreloadAssets Fonts={Fonts} Images={Images} Sounds={{}}>
      <ThemeProvider
        colors={colors}
        sizes={sizes}
        fonts={fonts}
        Images={Images}
        CONFIG={getConfig()}
      >
        <AppHome>
          <UpdatesManager />
        </AppHome>
      </ThemeProvider>
    </PreloadAssets>
  );
};

export default App;

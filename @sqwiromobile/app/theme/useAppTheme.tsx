import ThemeContext from '@expocraft/core/lib/theme/ThemeContext';
import AppImages from './Images';

import React from 'react';

const useAppTheme = () => {
  const { colors, fonts, sizes, Images, Sounds } =
    React.useContext(ThemeContext);

  return {
    colors,
    fonts,
    sizes,
    Images: { ...AppImages, ...Images } as typeof AppImages,
    Sounds,
  };
};

export default useAppTheme;

import { useEffect, useState } from 'react';
import { applyTheme, getSavedTheme, themes, type Theme } from '../styles/themes';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getSavedTheme);

  // Применяем тему при изменении
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  // Применяем сохраненную тему при загрузке
  useEffect(() => {
    const savedTheme = getSavedTheme();
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const changeTheme = (themeName: string) => {
    const theme = themes[themeName];
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return {
    currentTheme,
    changeTheme,
    availableThemes: Object.values(themes),
  };
};

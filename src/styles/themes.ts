// Система тем для приложения
export interface Theme {
  name: string;
  displayName: string;
  colors: {
    // Основные цвета
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    
    // Границы и разделители
    border: string;
    input: string;
    ring: string;
    
    // Состояния
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    
    // Семантические цвета
    destructive: string;
    destructiveForeground: string;
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
    
    // Приглушенные цвета
    muted: string;
    mutedForeground: string;
    
    // Поповеры и дропдауны
    popover: string;
    popoverForeground: string;
  };
}

// Текущая темная тема (сохраняем как есть)
export const darkTheme: Theme = {
  name: 'dark',
  displayName: 'Темная тема',
  colors: {
    background: 'hsl(224 71% 4%)',
    foreground: 'hsl(213 31% 91%)',
    card: 'hsl(224 71% 4%)',
    cardForeground: 'hsl(213 31% 91%)',
    
    border: 'hsl(216 34% 17%)',
    input: 'hsl(216 34% 17%)',
    ring: 'hsl(216 34% 17%)',
    
    primary: 'hsl(210 40% 98%)',
    primaryForeground: 'hsl(222.2 47.4% 11.2%)',
    secondary: 'hsl(222.2 84% 4.9%)',
    secondaryForeground: 'hsl(210 40% 98%)',
    accent: 'hsl(216 34% 17%)',
    accentForeground: 'hsl(210 40% 98%)',
    
    destructive: 'hsl(0 63% 31%)',
    destructiveForeground: 'hsl(210 40% 98%)',
    success: 'hsl(142 69% 58%)',
    successForeground: 'hsl(210 40% 98%)',
    warning: 'hsl(38 92% 50%)',
    warningForeground: 'hsl(210 40% 98%)',
    
    muted: 'hsl(223 47% 11%)',
    mutedForeground: 'hsl(215.4 16.3% 56.9%)',
    
    popover: 'hsl(224 71% 4%)',
    popoverForeground: 'hsl(215 20.2% 65.1%)',
  }
};

// Светлая профессиональная тема
export const lightTheme: Theme = {
  name: 'light',
  displayName: 'Светлая тема',
  colors: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 47.4% 11.2%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(222.2 47.4% 11.2%)',
    
    border: 'hsl(214.3 31.8% 91.4%)',
    input: 'hsl(214.3 31.8% 91.4%)',
    ring: 'hsl(221.2 83.2% 53.3%)',
    
    primary: 'hsl(221.2 83.2% 53.3%)',
    primaryForeground: 'hsl(210 40% 98%)',
    secondary: 'hsl(210 40% 96%)',
    secondaryForeground: 'hsl(222.2 47.4% 11.2%)',
    accent: 'hsl(210 40% 96%)',
    accentForeground: 'hsl(222.2 47.4% 11.2%)',
    
    destructive: 'hsl(0 84.2% 60.2%)',
    destructiveForeground: 'hsl(210 40% 98%)',
    success: 'hsl(142 76% 36%)',
    successForeground: 'hsl(210 40% 98%)',
    warning: 'hsl(38 92% 50%)',
    warningForeground: 'hsl(222.2 47.4% 11.2%)',
    
    muted: 'hsl(210 40% 96%)',
    mutedForeground: 'hsl(215.4 16.3% 46.9%)',
    
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(222.2 47.4% 11.2%)',
  }
};

// Теплая современная тема
export const warmTheme: Theme = {
  name: 'warm',
  displayName: 'Теплая тема',
  colors: {
    background: 'hsl(43 100% 98%)', // Кремовый фон
    foreground: 'hsl(25 25% 15%)', // Теплый темно-коричневый
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(25 25% 15%)',
    
    border: 'hsl(43 13% 85%)', // Теплый серый
    input: 'hsl(43 13% 85%)',
    ring: 'hsl(262 83% 58%)', // Индиго акцент
    
    primary: 'hsl(262 83% 58%)', // Индиго
    primaryForeground: 'hsl(0 0% 100%)',
    secondary: 'hsl(43 23% 92%)', // Очень светлый бежевый
    secondaryForeground: 'hsl(25 25% 15%)',
    accent: 'hsl(43 23% 92%)',
    accentForeground: 'hsl(25 25% 15%)',
    
    destructive: 'hsl(0 84% 60%)',
    destructiveForeground: 'hsl(0 0% 100%)',
    success: 'hsl(142 69% 45%)',
    successForeground: 'hsl(0 0% 100%)',
    warning: 'hsl(38 92% 50%)', // Янтарный
    warningForeground: 'hsl(25 25% 15%)',
    
    muted: 'hsl(43 23% 92%)',
    mutedForeground: 'hsl(25 15% 45%)',
    
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(25 25% 15%)',
  }
};

// Свежая tech тема
export const techTheme: Theme = {
  name: 'tech',
  displayName: 'Tech тема',
  colors: {
    background: 'hsl(210 20% 98%)', // Очень светло-серый
    foreground: 'hsl(215 25% 15%)', // Темно-серый
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(215 25% 15%)',
    
    border: 'hsl(214 15% 88%)',
    input: 'hsl(214 15% 88%)',
    ring: 'hsl(158 64% 52%)', // Изумрудный
    
    primary: 'hsl(158 64% 52%)', // Изумрудный
    primaryForeground: 'hsl(0 0% 100%)',
    secondary: 'hsl(210 20% 95%)',
    secondaryForeground: 'hsl(215 25% 15%)',
    accent: 'hsl(210 20% 95%)',
    accentForeground: 'hsl(215 25% 15%)',
    
    destructive: 'hsl(0 84% 60%)',
    destructiveForeground: 'hsl(0 0% 100%)',
    success: 'hsl(158 64% 52%)', // Изумрудный
    successForeground: 'hsl(0 0% 100%)',
    warning: 'hsl(262 83% 58%)', // Фиолетовый для разнообразия
    warningForeground: 'hsl(0 0% 100%)',
    
    muted: 'hsl(210 20% 95%)',
    mutedForeground: 'hsl(215 15% 50%)',
    
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(215 25% 15%)',
  }
};

// Все доступные темы
export const themes: Record<string, Theme> = {
  dark: darkTheme,
  light: lightTheme,
  warm: warmTheme,
  tech: techTheme,
};

// Функция для применения темы
export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  
  // Убираем все классы тем
  root.classList.remove('dark', 'light', 'warm', 'tech');
  
  // Добавляем класс текущей темы
  root.classList.add(theme.name);
  
  // Сохраняем выбранную тему в localStorage
  localStorage.setItem('selected-theme', theme.name);
};

// Функция для получения сохраненной темы
export const getSavedTheme = (): Theme => {
  const savedThemeName = localStorage.getItem('selected-theme');
  return themes[savedThemeName || 'dark'] || darkTheme;
};

// Функция для получения системной темы
export const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

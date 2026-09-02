export type OSType = 'mac' | 'windows' | 'linux' | 'other';

export const OS_DETECTION_MAP = [
  { check: (ua: string) => ua.includes('Mac'), value: 'mac' as const },
  { check: (ua: string) => ua.includes('Win'), value: 'windows' as const },
  { check: (ua: string) => ua.includes('Linux'), value: 'linux' as const },
 ] as const;

export const detectOS = (): OSType => {
  if (typeof navigator === 'undefined') return 'other';
  
  const userAgent = navigator.userAgent;
  
  return OS_DETECTION_MAP.find(({ check }) => check(userAgent))?.value || 'other';
};

export const OS_QUICK_SEARCH_HINTS: Record<OSType, string> = {
  mac: 'Нажмите Cmd+K для быстрого поиска',
  windows: 'Нажмите Ctrl+K для быстрого поиска',
  linux: 'Нажмите Ctrl+K для быстрого поиска',
  other: 'Нажмите Ctrl/Cmd+K для быстрого поиска',
};
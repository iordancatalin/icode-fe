export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

const darkTheme = {
  name: DARK_THEME,
  primary: '#1e1e1e',
  secondary: '#343a40',
  accent: '#dd5c71',
  foreground: {
    primary: '#fff',
    secondary: '#fff',
  },
  disabled: '#6c757d',
  outputBck: '#202124',
  signInLink: '#6c757d',
  layout: {
    background: 'rgb(103 108 113)',
    border: 'rgb(187, 180, 180)',
  },
  editor: {
    theme: 'dark',
    header: {
      background: '#202124',
      color: '#6c757d',
      borderColor: '#4a4545',
    },
  },
};

const lightTheme = {
  name: LIGHT_THEME,
  monacoTheme: 'light',
  primary: '#23a9ce',
  secondary: '#e8e8e8',
  accent: '#f07b3f',
  foreground: {
    primary: '#fff',
    secondary: '#000',
  },
  disabled: '#6c757d',
  signInLink: '#016986',
  outputBck: '#fff',
  layout: {
    background: '#adb5bd',
    border: '#fff',
  },
  editor: {
    theme: 'light',
    header: {
      background: '#fff',
      color: '#646464',
      borderColor: '#646464',
    },
  },
};

export const findTheme = (themeName) =>
  themeName === LIGHT_THEME ? lightTheme : darkTheme;

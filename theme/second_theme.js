import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFB74D', // Button primary color
    accent: '#FFF176',
    background: '#FFF3E0',
    surface: '#FFFFFF',
    text: '#3E2723',
    error: '#D32F2F',
    notification: '#FF9800',
    button: {
      background: '#FFB74D', // Background color for the button
      text: '#FFFFFF', // Text color for the button
    },
  },
  roundness: 8,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
    button: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold', // Bold font for the button
    },
  },
  components: {
    Button: {
      mode: 'contained', // Default mode for the button (contained, text, outlined)
      uppercase: true, // Uppercase text
      labelStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold', // Bold font for the button text
        fontSize: 14, // Font size for the button text
      },
      contentStyle: {
        paddingVertical: 8, // Vertical padding for the button
        paddingHorizontal: 16, // Horizontal padding for the button
      },
      style: {
        borderRadius: 8, // Border radius for the button
      },
    },
  },
};

export default theme;

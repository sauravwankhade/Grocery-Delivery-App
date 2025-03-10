import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    skyblue: '#87CEEB', // sky blue color
    primary: '#853159', // Purple color for a modern and elegant look #6200EE
    accent: '#c298ac', // Teal color for highlighting important elements
    background: '#F2F2F2', // White background for simplicity and elegance
    surface: '#F2F2F2', // Light gray surface for contrast with the background
    text: '#333333', // Dark gray text for readability
    error: 'red', // Dark red color for indicating errors
    notification: '#FFC107', // Yellow color for notifications
    success: '#00C853', // Green color for indicating success
    warning: '#FF9800', // Orange color for warnings
    divider: '#BDBDBD', // Light gray divider color for separating elements
    background1: "#F6E4B4",
    highlight: '#FFD700', // Gold color for highlighting text
  },
  roundness: 8, // Rounded corners for a modern look
  components: {
    Button: {
      mode: 'contained', // Default mode for buttons (contained, text, outlined)
      uppercase: false, // Keep button text in original case
      labelStyle: {
        fontFamily: 'san-medium',
        fontWeight: 'bold', // Bold font for button text
        fontSize: 16, // Font size for button text
      },
      contentStyle: {
        paddingVertical: 12, // Vertical padding for buttons
        paddingHorizontal: 20, // Horizontal padding for buttons
      },
      style: {
        borderRadius: 8, // Border radius for buttons
      },
    },
    Title: {
      fontFamily: 'san-bold',
      fontSize: 16, // Large font size for titles
    },
    Subtitle: {
      fontFamily: 'san',
      fontWeight: 'normal', // Regular font for subtitles
      fontSize: 12, // Normal font size for subtitles
    },
    Card: {
      borderRadius: 8, // Border radius for cards
      elevation: 4, // Shadow elevation for cards
    },
  },
};

export default theme;
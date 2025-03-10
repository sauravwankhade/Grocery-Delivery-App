import { DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#4CAF50', // Green color for representing freshness and nature
        accent: '#FF9800', // Orange color for highlighting important elements
        background: '#FFFFFF', // White background for cleanliness and simplicity
        surface: '#F5F5F5', // Light gray surface for contrast with the background
        text: '#333333', // Dark gray text for readability
        error: '#D32F2F', // Red color for indicating errors
        notification: '#FFC107', // Yellow color for notifications
        success: '#4CAF50', // Green color for indicating success
        warning: '#FF9800', // Orange color for warnings
        divider: '#BDBDBD', // Light gray divider color for separating elements
        button: {
            background: '#4CAF50', // Green background color for buttons
            text: '#FFFFFF', // White text color for buttons
        },
        header: {
            background: '#4CAF50', // Green background color for headers
            text: '#FFFFFF', // White text color for headers
        },
    },
    roundness: 6, // Slightly rounded corners for a softer look
    fonts: {
        ...DefaultTheme.fonts,
        regular: {
            fontFamily: 'Roboto-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Roboto-Medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'Roboto-Light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'Roboto-Thin',
            fontWeight: 'normal',
        },
        button: {
            fontFamily: 'Roboto-Medium',
            fontWeight: 'bold', // Bold font for buttons
        },
        header: {
            fontFamily: 'Roboto-Medium',
            fontWeight: 'bold', // Bold font for headers
        },
    },
    components: {
        Button: {
            mode: 'contained', // Default mode for buttons (contained, text, outlined)
            uppercase: false, // Keep button text in original case
            labelStyle: {
                fontFamily: 'Roboto-Medium',
                fontWeight: 'bold', // Bold font for button text
                fontSize: 16, // Font size for button text
            },
            contentStyle: {
                paddingVertical: 12, // Vertical padding for buttons
                paddingHorizontal: 20, // Horizontal padding for buttons
            },
            style: {
                borderRadius: 6, // Border radius for buttons
            },
        },
        Title: {
            style: {
                fontFamily: 'Roboto-Medium',
                fontWeight: 'bold', // Bold font for titles
                fontSize: 24, // Large font size for titles
            },
        },
        Subtitle: {
            style: {
                fontFamily: 'Roboto-Regular',
                fontWeight: 'normal', // Regular font for subtitles
                fontSize: 16, // Normal font size for subtitles
            },
        },
        Card: {
            style: {
                borderRadius: 6, // Border radius for cards
                elevation: 2, // Shadow elevation for cards
            },
        },
    },
};

export default theme;

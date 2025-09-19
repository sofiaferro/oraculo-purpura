import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ab90b9',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    color: '#fff',
                },
            },
        }
    }
});

export default theme;

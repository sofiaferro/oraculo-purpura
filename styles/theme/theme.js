import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ab90b9',
            label: '#fff'
        }
    },
    overrides: {
        MuiButton: {
            containedPrimary: {
                color: '#fff',
            },
        }
    }
});

export default theme;
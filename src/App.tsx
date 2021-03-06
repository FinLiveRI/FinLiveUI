import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { IntlProvider } from "react-intl";
import MomentUtils from "@date-io/moment";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import { AppBar } from "./components";
import { AuthProvider, UserConfigProvider } from "./context";
import Routes from "./routes";

function App() {
  const user: string | null = localStorage.getItem("user");
  const config: any | null = JSON.parse(
    localStorage.getItem("userConfig") || "{}"
  );

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale="en" defaultLocale="en">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AuthProvider user={user}>
            <UserConfigProvider config={config}>
              <BrowserRouter>
                <CssBaseline />
                <AppBar />
                <Routes />
              </BrowserRouter>
            </UserConfigProvider>
          </AuthProvider>
        </MuiPickersUtilsProvider>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;

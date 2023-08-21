import AppRoutes from "./routes/AppRoutes";
import './App.css';
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;


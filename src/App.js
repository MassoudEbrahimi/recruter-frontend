import {ToastContainers,} from './helpers';
import {ErrorBoundary} from 'react-error-boundary';
import {ErrorFallbackBoundary, OnErrorBoundary} from './configuration/error/errorFallbackBoundary';
import {LanguageProvider} from "./language/languageProvider";
import Routing from "./routes/routing";
import {BrowserRouter as Router} from "react-router-dom";
import "./css/main.scss"
import "font-awesome/css/font-awesome.min.css";
import "@mdi/font/css/materialdesignicons.min.css"
import "react-toastify/dist/ReactToastify.min.css"
import "font-awesome/css/font-awesome.css"
import {ThemeProvider} from "./context/theme/themeProvider";


function App() {

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallbackBoundary} onError={OnErrorBoundary}>
                <ThemeProvider>
                    <LanguageProvider>
                        <Router>
                            <ToastContainers id='A'/>
                            <Routing/>
                        </Router>
                    </LanguageProvider>
                </ThemeProvider>
            </ErrorBoundary>
        </>
    );
}

export default App;

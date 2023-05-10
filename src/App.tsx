import { Routes, Route } from "react-router-dom";
import IndexRoute from "./routes/Index";
import Layout from "./components/Layout";
import PlayRoute from "./routes/Play";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexRoute />} />
                <Route path="play" element={<PlayRoute />} />
            </Route>
        </Routes>
    );
}

App.displayName = "App";

export default App;

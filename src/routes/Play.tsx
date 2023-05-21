import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Game from "../components/Game";
import Levels from "../managers/LevelsManager";

const PlayRoute: FC = () => {
    const location = useLocation();

    const levelName = location.pathname.split("/")[2];

    const level = Levels.find((level) => level.name === levelName);

    if (!level) return <Navigate to="/" replace={true} />;

    return <Game level={level} />;
};

PlayRoute.displayName = "PlayRoute";

export default PlayRoute;

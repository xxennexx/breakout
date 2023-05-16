import { FC, useState } from "react";
import Level from "../types/Level";
import Simple from "../levels/Simple";
import Game from "../components/Game";

const levels = [Simple];

const PlayRoute: FC = () => {
    const [currentLevel, setCurrentLevel] = useState<Level | null>(null);

    if (currentLevel === null)
        return (
            <>
                <div>Select a level to play: </div>
                {levels.map((level) => (
                    <button
                        key={level.name}
                        onClick={() => setCurrentLevel(level)}
                    >
                        {level.name}
                    </button>
                ))}
            </>
        );

    return <Game level={currentLevel} />;
};

PlayRoute.displayName = "PlayRoute";

export default PlayRoute;

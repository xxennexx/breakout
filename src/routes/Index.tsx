import { Link } from "react-router-dom";
import buttonStyles from "../styles/button.module.scss";
import { FC } from "react";

const IndexRout: FC = () => {
    return (
        <>
            <h1>Breakout</h1>
            <br />
            <Link className={buttonStyles.button} to="/play">
                Play
            </Link>
        </>
    );
};

IndexRout.displayName = "IndexRoute";

export default IndexRout;

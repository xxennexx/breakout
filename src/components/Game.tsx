import { Component, createRef } from "react";
import gameStyles from "../styles/Game.module.scss";
import Level from "../types/Level";
import SettingsManager from "../managers/SettingsManager";
import Paused from "./overlay/Paused";
import GameOver from "./overlay/GameOver";
import GameWon from "./overlay/GameWon";

interface GameProps {
    level: Level;
}

interface GameState {
    gameState: "playing" | "paused" | "gameover" | "starting" | "gamewon";

    sliderPosition: number;
    sliderMoving: {
        left: boolean;
        right: boolean;
    };
    sliderVelocity: number;

    ballPosition: {
        x: number;
        y: number;
    };
    ballVelocity: {
        x: number;
        y: number;
    };

    blockMap: (number | null)[][];
}

export default class Game extends Component<GameProps, GameState> {
    static displayName = "Game";

    state: GameState = {
        gameState: "starting",

        sliderPosition: 0,
        sliderMoving: {
            left: false,
            right: false,
        },
        sliderVelocity: 0,

        ballPosition: {
            x: 0,
            y: 0,
        },
        ballVelocity: {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
        },

        blockMap: this.props.level.blockMap,
    };
    private sliderWrapperRef = createRef<HTMLDivElement>();
    private gameAreaRef = createRef<HTMLDivElement>();
    private ballRef = createRef<HTMLDivElement>();

    componentDidMount() {
        this.tick();
        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keyup", this.onKeyUp);
        window.addEventListener("mousemove", this.onMouseMove);
        setTimeout(
            () =>
                this.gameAreaRef.current?.addEventListener(
                    "click",
                    this.onClick,
                ),
            10,
        ); // prevent level select from triggering click
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.onKeyDown);
        window.removeEventListener("keyup", this.onKeyUp);
        window.removeEventListener("mousemove", this.onMouseMove);
        this.gameAreaRef.current?.removeEventListener("click", this.onClick);
    }

    render() {
        return (
            <div className={gameStyles.gameArea} ref={this.gameAreaRef}>
                <div className={gameStyles.blocksWrapper}>
                    {this.state.blockMap.map((row, i, rows) => (
                        <div className={gameStyles.row} key={i}>
                            {row.map((color, j) => (
                                <div
                                    style={
                                        color !== null
                                            ? {
                                                  backgroundColor:
                                                      "#" +
                                                      color
                                                          .toString(16)
                                                          .padStart(6, "0"),
                                              }
                                            : {}
                                    }
                                    className={
                                        color
                                            ? gameStyles.block
                                            : gameStyles.empty
                                    }
                                    key={j}
                                    id={"block" + (i * rows.length + j)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div
                    className={gameStyles.sliderWrapper}
                    ref={this.sliderWrapperRef}
                >
                    <div
                        style={{
                            left: this.state.sliderPosition,
                            width: SettingsManager.get<number>("sliderWidth"),
                        }}
                        className={gameStyles.slider}
                    />
                </div>
                <div
                    style={{
                        left: this.state.ballPosition.x,
                        bottom: this.state.ballPosition.y,
                        width: SettingsManager.get<number>("ballSize"),
                        height: SettingsManager.get<number>("ballSize"),
                    }}
                    className={gameStyles.ball}
                    ref={this.ballRef}
                />
                {this.getOverlay()}
            </div>
        );
    }

    getOverlay() {
        switch (this.state.gameState) {
            case "paused":
                return <Paused />;
            case "gameover":
                return <GameOver />;
            case "gamewon":
                return <GameWon />;
            default:
                return null;
        }
    }

    tick() {
        requestAnimationFrame(this.tick.bind(this));

        if (["paused", "gameover", "gamewon"].includes(this.state.gameState))
            return;

        if (this.state.blockMap.flat().filter(Boolean).length === 0)
            return this.setState({ gameState: "gamewon" });

        if (
            SettingsManager.get<"mouse" | "keyboard">("controlType") ===
            "keyboard"
        )
            this.moveSlider();

        this.animateBall();
        this.checkBlockCollision();
    }

    checkBlockCollision() {
        this.state.blockMap.forEach((row, i, rows) => {
            row.forEach((val, j) => {
                if (val === null) return;

                const block = document.getElementById(
                    "block" + (i * rows.length + j),
                );

                if (!block) return;

                const blockRect = block.getBoundingClientRect();
                const ballRect = this.ballRef.current?.getBoundingClientRect();
                if (!ballRect) return;

                const conditions = [
                    ballRect.x <= blockRect.x + blockRect.width, // right
                    ballRect.x + ballRect.width >= blockRect.x, // left
                    ballRect.y <= blockRect.y + blockRect.height, // bottom
                    ballRect.y + ballRect.height >= blockRect.y, // top
                ];

                if (!conditions.every((v) => v)) return;

                const ballCenterX = ballRect.x + ballRect.width / 2;
                const ballCenterY = ballRect.y + ballRect.height / 2;

                const deltaX =
                    ballCenterX - (blockRect.x + blockRect.width / 2);
                const deltaY =
                    ballCenterY - (blockRect.y + blockRect.height / 2);

                const intersectX =
                    Math.abs(deltaX) - ballRect.width / 2 - blockRect.width / 2;
                const intersectY =
                    Math.abs(deltaY) -
                    ballRect.height / 2 -
                    blockRect.height / 2;

                if (intersectX <= 0 && intersectY <= 0) {
                    if (Math.abs(intersectX) < Math.abs(intersectY))
                        this.setState((prevState) => ({
                            blockMap: prevState.blockMap.map((row, y) =>
                                y === i
                                    ? row.map((val, x) =>
                                          j === x ? null : val,
                                      )
                                    : row,
                            ),
                            ballVelocity: {
                                x: -prevState.ballVelocity.x,
                                y: prevState.ballVelocity.y,
                            },
                        }));
                    else
                        this.setState((prevState) => ({
                            blockMap: prevState.blockMap.map((row, y) =>
                                y === i
                                    ? row.map((val, x) =>
                                          j === x ? null : val,
                                      )
                                    : row,
                            ),
                            ballVelocity: {
                                x: prevState.ballVelocity.x,
                                y: -prevState.ballVelocity.y,
                            },
                        }));
                }
            });
        });
    }

    animateBall() {
        const ballSize = SettingsManager.get<number>("ballSize");

        if (this.state.gameState === "starting")
            return this.setState({
                ballPosition: {
                    x:
                        this.state.sliderPosition +
                        SettingsManager.get<number>("sliderWidth") / 2 -
                        ballSize / 2,
                    y: 35,
                },
            });

        const ballPosition = this.state.ballPosition;
        const ballSpeed = SettingsManager.get<number>("ballSpeed");
        const ballVelocity = this.state.ballVelocity;

        const gameArea = this.gameAreaRef.current;
        if (gameArea) {
            const gameAreaRect = gameArea.getBoundingClientRect();

            if (ballPosition.x + ballSize >= gameAreaRect.width)
                ballVelocity.x = -Math.abs(ballVelocity.x);
            else if (ballPosition.x <= 0)
                ballVelocity.x = Math.abs(ballVelocity.x);

            if (ballPosition.y + ballSize >= gameAreaRect.height)
                ballVelocity.y = -Math.abs(ballVelocity.y);
            else if (ballPosition.y <= 0)
                ballVelocity.y = Math.abs(ballVelocity.y);
        }

        const sliderWrapper = this.sliderWrapperRef.current;
        if (sliderWrapper) {
            const sliderWidth = SettingsManager.get<number>("sliderWidth");

            if (
                this.state.sliderPosition < ballPosition.x + ballSize &&
                this.state.sliderPosition + sliderWidth > ballPosition.x &&
                ballPosition.y <= 35
            ) {
                ballVelocity.y = Math.abs(ballVelocity.y);
                ballVelocity.x = Math.random() * 2 - 1 + ballVelocity.x * 0.5;
            }
        }

        ballPosition.x += ballVelocity.x * ballSpeed;
        ballPosition.y += ballVelocity.y * ballSpeed;

        if (ballPosition.y < 30)
            return this.setState({ gameState: "gameover" });

        this.setState({
            ballPosition,
            ballVelocity,
        });
    }

    moveSlider() {
        const { left, right } = this.state.sliderMoving;

        if (left === right) return;

        const direction = left ? -1 : 1;

        const sliderWrapper = this.sliderWrapperRef.current;
        if (sliderWrapper) {
            const wrapperWidth = sliderWrapper.getBoundingClientRect().width;

            const newSliderPosition =
                this.state.sliderPosition +
                SettingsManager.get<number>("sliderSpeed") * direction;

            const sliderWidth = SettingsManager.get<number>("sliderWidth");

            if (newSliderPosition < 0)
                this.setState({
                    sliderPosition: 0,
                    sliderVelocity: 0,
                });
            else if (newSliderPosition > wrapperWidth - sliderWidth)
                this.setState({
                    sliderPosition: wrapperWidth - sliderWidth,
                    sliderVelocity: 0,
                });
            else
                this.setState({
                    sliderPosition: newSliderPosition,
                });
        }
    }

    onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowLeft":
                this.setState((oldstate) => ({
                    sliderMoving: {
                        left: true,
                        right: oldstate.sliderMoving.right,
                    },
                }));
                break;
            case "ArrowRight":
                this.setState((oldstate) => ({
                    sliderMoving: {
                        left: oldstate.sliderMoving.left,
                        right: true,
                    },
                }));
                break;
        }
    };

    onKeyUp = (e: KeyboardEvent) => {
        if (
            SettingsManager.get<"mouse" | "keyboard">("controlType") === "mouse"
        )
            return;

        switch (e.key) {
            case "ArrowLeft":
                this.setState((oldstate) => ({
                    sliderMoving: {
                        left: false,
                        right: oldstate.sliderMoving.right,
                    },
                }));
                break;
            case "ArrowRight":
                this.setState((oldstate) => ({
                    sliderMoving: {
                        left: oldstate.sliderMoving.left,
                        right: false,
                    },
                }));
                break;
            case " ":
                switch (this.state.gameState) {
                    case "starting":
                        this.setState({
                            gameState: "playing",
                        });
                        break;
                    case "gamewon":
                    case "gameover":
                        this.setState({
                            gameState: "starting",
                            blockMap: this.props.level.blockMap,
                        });
                        break;
                    case "playing":
                        this.setState({
                            gameState: "paused",
                        });
                        break;
                    case "paused":
                        this.setState({
                            gameState: "playing",
                        });
                        break;
                }
                break;
        }
    };

    onMouseMove = (e: MouseEvent) => {
        if (
            SettingsManager.get<"mouse" | "keyboard">("controlType") !== "mouse"
        )
            return;
        if (!["playing", "starting"].includes(this.state.gameState)) return;

        const sliderWrapper = this.sliderWrapperRef.current;
        if (!sliderWrapper) return;

        const wrapperRect = sliderWrapper.getBoundingClientRect();

        const sliderWidth = SettingsManager.get<number>("sliderWidth");

        const newSliderPosition = e.clientX - wrapperRect.x - sliderWidth / 2;

        if (newSliderPosition < 0)
            this.setState({
                sliderPosition: 0,
                sliderVelocity: 0,
            });
        else if (newSliderPosition > wrapperRect.width - sliderWidth)
            this.setState({
                sliderPosition: wrapperRect.width - sliderWidth,
                sliderVelocity: 0,
            });
        else
            this.setState({
                sliderPosition: newSliderPosition,
            });
    };

    onClick = () => {
        if (
            SettingsManager.get<"mouse" | "keyboard">("controlType") !== "mouse"
        )
            return;

        switch (this.state.gameState) {
            case "starting":
                this.setState({
                    gameState: "playing",
                });
                break;
            case "gamewon":
            case "gameover":
                this.setState({
                    gameState: "starting",
                    blockMap: this.props.level.blockMap,
                });
                break;
            case "playing":
                this.setState({
                    gameState: "paused",
                });
                break;
            case "paused":
                this.setState({
                    gameState: "playing",
                });
                break;
        }
    };
}

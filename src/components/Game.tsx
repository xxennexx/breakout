import { Component, createRef } from "react";
import gameStyles from "../styles/Game.module.scss";
import Level from "../types/Level";
import SettingsManager from "../managers/SettingsManager";

interface GameProps {
    level: Level;
}

interface GameState {
    gameStarted: boolean;
    gamePaused: boolean;

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
        gamePaused: false,
        gameStarted: false,

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
            x: 0,
            y: 1, // TODO: remove/randomize
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
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.onKeyDown);
        window.removeEventListener("keyup", this.onKeyUp);
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
                    }}
                    className={gameStyles.ball}
                    ref={this.ballRef}
                />
                {this.state.gamePaused && (
                    <div className={gameStyles.paused}>Paused</div>
                )}
            </div>
        );
    }

    tick() {
        requestAnimationFrame(this.tick.bind(this));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        window.debug = {
            SettingsManager,
            moveBall: (x: number, y: number) =>
                this.setState({ ballPosition: { x, y } }),
            setVelocity: (x: number, y: number) =>
                this.setState({ ballVelocity: { x, y } }),
            moveSlider: (x: number) => this.setState({ sliderPosition: x }),
            state: this.state,
        };

        if (this.state.gamePaused) return;

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

                const ballSize = SettingsManager.get<number>("ballSize");

                const ballRect = this.ballRef.current?.getBoundingClientRect();

                if (!ballRect) return;

                if (blockRect.x + blockRect.width < ballRect.x) return;
                if (blockRect.x > ballRect.x + ballSize / 2) return;
                if (blockRect.y + blockRect.height < ballRect.y) return;
                if (blockRect.y > ballRect.y + ballSize / 2) return;

                this.setState((oldState) => {
                    const newBlockMap = oldState.blockMap;

                    newBlockMap[i][j] = null;

                    return {
                        blockMap: newBlockMap,
                        ballVelocity: {
                            x: oldState.ballVelocity.x,
                            y: -oldState.ballVelocity.y,
                        },
                    };
                });
            });
        });
    }

    animateBall() {
        const ballSize = SettingsManager.get<number>("ballSize");

        if (!this.state.gameStarted)
            return this.setState({
                ballPosition: {
                    x:
                        this.state.sliderPosition +
                        SettingsManager.get<number>("sliderWidth") / 2 -
                        ballSize / 2,
                    y: 30 + ballSize / 2,
                },
            });

        const { x, y } = this.state.ballPosition;

        const ballSpeed = SettingsManager.get<number>("ballSpeed");

        const ballVelocity = this.state.ballVelocity;
        const ballPosition = this.state.ballPosition;

        const gameArea = this.gameAreaRef.current;
        if (gameArea) {
            const gameAreaRect = gameArea.getBoundingClientRect();

            if (x + ballSize > gameAreaRect.width)
                ballVelocity.x = -Math.abs(
                    ballVelocity.x + (Math.random() * 2 - 1),
                );
            else if (x < 0)
                ballVelocity.x = Math.abs(
                    ballVelocity.x + (Math.random() * 2 - 1),
                );

            if (y + ballSize > gameAreaRect.height)
                ballVelocity.y = -Math.abs(
                    ballVelocity.y + (Math.random() * 2 - 1),
                );
            else if (y < 0)
                ballVelocity.y = Math.abs(
                    ballVelocity.y + (Math.random() * 2 - 1),
                );
        }

        const sliderWrapper = this.sliderWrapperRef.current;
        if (sliderWrapper) {
            const sliderWidth = SettingsManager.get<number>("sliderWidth");

            if (
                this.state.sliderPosition < x + ballSize &&
                this.state.sliderPosition + sliderWidth > x &&
                y <= 30 + ballSize / 2
            )
                ballVelocity.y = Math.abs(
                    ballVelocity.y + (Math.random() * 2 - 1),
                );
        }

        ballPosition.x += ballVelocity.x * ballSpeed;
        ballPosition.y += ballVelocity.y * ballSpeed;

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
            case " ":
                if (!this.state.gameStarted)
                    this.setState({
                        gameStarted: true,
                    });
                else
                    this.setState((oldState) => ({
                        gamePaused: !oldState.gamePaused,
                    }));
                break;
        }
    };

    onKeyUp = (e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowLeft":
                this.setState((oldstate) => ({
                    sliderMoving: {
                        left: false,
                        right: oldstate.sliderMoving.right,
                    },
                }));
                break;
            case "ArrowRight": {
                this.setState((oldstate) => ({
                    sliderMoving: {
                        left: oldstate.sliderMoving.left,
                        right: false,
                    },
                }));
                break;
            }
        }
    };
}

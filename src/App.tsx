import styles from "./App.module.scss";

function App() {
    return (
        <>
            <canvas className={styles.canvas} width={512} height={512} />
        </>
    );
}

export default App;

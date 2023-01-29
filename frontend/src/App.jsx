import QR from "./QR";
import classes from "./App.module.css";

const App = () => {
  return (
    <div className={classes.App}>
      <QR location={"Library"} />
      <QR location={"New Sports Complex"} />
      <QR location={"Main Building"} />
    </div>
  );
};

export default App;

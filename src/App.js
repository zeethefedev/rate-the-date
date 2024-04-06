import "./App.css";
import RatingForm from "./RatingForm";
import SetupForm from "./SetupForm";
import YesNoForm from "./YesNoForm";

function App() {
  return (
    <div className="App">
      <SetupForm />
      <RatingForm />
      <YesNoForm />
    </div>
  );
}

export default App;

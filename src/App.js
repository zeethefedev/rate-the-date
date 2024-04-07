import "./App.css";
import RatingInput from "./component/RatingInput";
import SetupForm from "./SetupForm";
import YesNoQuestion from "./component/YesNoQuestion";

function App() {
  return (
    <div className="App">
      <SetupForm />
      <RatingInput />
      <YesNoQuestion />
    </div>
  );
}

export default App;

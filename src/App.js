import "./App.css";
import { Route, Routes } from "react-router-dom";
import SetupForm from "./SetupForm";
import ResponseForm from "./ResponseForm";
import Landing from "./Landing";
import Error from "./Error";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="question" element={<SetupForm />} />
        <Route path="response/:id" element={<ResponseForm />} />
        <Route path="error" element={<Error />} />
        {/* push from new device */}
      </Routes>
    </div>
  );
}

export default App;

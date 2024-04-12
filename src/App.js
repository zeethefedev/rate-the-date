import "./App.css";
import SetupForm from "./SetupForm";
import ResponseForm from "./ResponseForm";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="question" element={<SetupForm />} />
        <Route path="response/:id" element={<ResponseForm />} />
      </Routes>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { Button } from "@carbon/react";
import { Login } from "./components/Login";

function App() {
  return (
    <div className="App">
      <Login />
      <Button>REGISTER</Button>
    </div>
  );
}

export default App;

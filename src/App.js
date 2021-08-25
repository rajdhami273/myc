import "./App.css";
import AppProvider from "./AppProvider";
import Router from "./core/Router";
import MainRoutes from "./core/MainRoutes";

function App() {
  return (
    <AppProvider>
      <Router routes={MainRoutes}></Router>
    </AppProvider>
  );
}
console.log(<h1>{"Hello"}</h1>);
export default App;

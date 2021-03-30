import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Views/layout";
import { Provider } from "react-redux";
import { store } from "./reducer/reducer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

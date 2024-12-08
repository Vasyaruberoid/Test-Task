import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.error("Root element not found!");
}

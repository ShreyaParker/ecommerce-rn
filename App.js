import StackNavigator from "./navigation/StackNavigator";
import {Provider} from "react-redux";
import store from "./store";

export default function App() {
  return (
      <>
          <Provider store={store}>
              <StackNavigator/>
          </Provider>
      </>
  );
}


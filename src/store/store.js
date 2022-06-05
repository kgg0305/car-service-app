import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, composeWithDevTools(middleware));

store.subscribe(() => {
  sessionStorage.setItem("token", JSON.stringify(store.getState().auth.token));
  sessionStorage.setItem(
    "headerMenuKey",
    JSON.stringify(store.getState().menu.headerMenu.key)
  );
  sessionStorage.setItem(
    "siderMenuKey",
    JSON.stringify(store.getState().menu.siderMenu.key)
  );
});

export default store;

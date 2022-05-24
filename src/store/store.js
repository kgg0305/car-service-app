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
    "sideMenuKey",
    JSON.stringify(store.getState().menu.sideMenu.key)
  );
});

export default store;

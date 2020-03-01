import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/reducer";

const middleware = applyMiddleware;
const store = createStore(reducer, middleware(thunk));
export default store;


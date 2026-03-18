import { createContext, useContext, useReducer } from "react";
const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthemticated: false,
};

function reducer(state, action) {
	switch (action.type) {
		case "login":
			return {
				...state,
				user: action.payload,
				isAuthemticated: true,
			};
		case "logout":
			return {
				...state,
				user: null,
				isAuthemticated: false,
			};
		default:
			throw new Error("Unknown action");
	}
}

const FAKE_USER = {
	name: "Jack",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
	const [{ user, isAuthemticated }, dispatch] = useReducer(
		reducer,
		initialState
	);
	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: "login", payload: FAKE_USER });
	}
	function logout() {
		dispatch({ type: "logout" });
	}
	return (
		<AuthContext.Provider value={{ user, isAuthemticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) console.log("FakeAuth wykonane w zlym miejscu");
	return context;
}

export { AuthProvider, useAuth };

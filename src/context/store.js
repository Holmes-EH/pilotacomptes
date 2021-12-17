import { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'

const AppContext = createContext()
AppWrapper.displayName = 'Store'

export function AppWrapper({ children }) {
	let initialState = {
		user: {},
		playerList: [],
		periodes: [],
		loading: false,
	}
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<AppContext.Provider value={[state, dispatch]}>
			{children}
		</AppContext.Provider>
	)
}

export function globalContext() {
	return useContext(AppContext)
}

export default function reducer(state, action) {
	switch (action.type) {
		case 'LIST_PLAYERS':
			return { ...state, playerList: action.payload }
		case 'LIST_PERIODES':
			return { ...state, periodes: action.payload }
		case 'USER_LOGIN':
			return { ...state, user: action.payload }
		case 'USER_LOGOUT':
			return { ...state, user: {} }
		case 'LOADING':
			return { ...state, loading: true }
		case 'DONE_LOADING':
			return { ...state, loading: false }
		case 'MESSAGE':
			return { ...state, message: action.payload }
		case 'CLEAR_MESSAGE':
			return { ...state, message: {} }
		default:
			throw new Error()
	}
}

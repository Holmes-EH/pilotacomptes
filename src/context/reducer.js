export default function reducer(state, action) {
	switch (action.type) {
		case 'LIST_PLAYERS':
			return { ...state, playerList: action.payload }
		case 'LIST_PERIODES':
			return { ...state, periodes: action.payload }
		case 'USER_LOGIN':
			return { ...state, user: action.payload }
		case 'LOADING':
			return { ...state, loading: true }
		case 'DONE_LOADING':
			return { ...state, loading: false }
		default:
			throw new Error()
	}
}

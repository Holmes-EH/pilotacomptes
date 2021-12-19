import { IoCloseCircleOutline } from 'react-icons/io5'
import styles from '@/styles/Toaster.module.css'

import { globalContext } from '@/context/store'

const Toaster = () => {
	const [state, dispatch] = globalContext()
	const { type, text } = state.message

	const closeMessage = () => {
		dispatch({ type: 'CLEAR_MESSAGE' })
	}
	return (
		<div className={`${styles.toasterContainer} ${type}`}>
			<IoCloseCircleOutline onClick={closeMessage} />
			{type === 'error' && (
				<>
					<h1>FALTA</h1>
					<p>{text}</p>
				</>
			)}
			{type === 'success' && (
				<>
					<h1>PASA</h1>
					<p>{text}</p>
				</>
			)}
		</div>
	)
}

export default Toaster

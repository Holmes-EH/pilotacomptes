import { useRouter } from 'next/router'
import { IoArrowForwardOutline } from 'react-icons/io5'
import styles from '@/styles/Periode.module.css'

import { globalContext } from '@/context/store'

const Periode = ({ periode }) => {
	const [state, dispatch] = globalContext()
	const { playerList } = state
	const { start, end, paid, playersPaid } = periode
	const router = useRouter()
	const dateToMonth = (date) => {
		return new Date(date).toLocaleDateString('fr-FR', {
			month: 'long',
			year: '2-digit',
		})
	}
	return (
		<div
			className={`${styles.periode} ${
				paid ? styles.paid : styles.unpaid
			}`}
			onClick={() => {
				dispatch({ type: 'LOADING' })
				router.push(`/admin/periode/${periode._id}`)
			}}
		>
			<div className={styles.date}>
				<p style={{ paddingRight: '5px' }}>
					{dateToMonth(start).charAt(0).toUpperCase() +
						dateToMonth(start).slice(1)}
				</p>
				<IoArrowForwardOutline />
				<p style={{ paddingLeft: '5px' }}>
					{dateToMonth(end).charAt(0).toUpperCase() +
						dateToMonth(end).slice(1)}
				</p>
			</div>
			<div className={styles.details}>
				<p>
					{playersPaid.length} joueurs ont payé sur{' '}
					{playerList.length}
				</p>
			</div>
		</div>
	)
}

export default Periode

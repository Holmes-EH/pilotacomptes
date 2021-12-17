import axios from 'axios'
import { globalContext } from '@/context/store'

import styles from '@/styles/Login.module.css'
import { useState } from 'react'

const Login = () => {
	const [state, dispatch] = globalContext()
	const [tel, setTel] = useState('')
	const [password, setPassword] = useState('')

	const formatTel = (input) => {
		return `+33${input.slice(1)}`
	}

	const login = async () => {
		dispatch({ type: 'LOADING' })
		try {
			const { data } = await axios.post('/api/players/login', {
				tel: formatTel(tel),
				password,
			})
			dispatch({ type: 'USER_LOGIN', payload: data })
			dispatch({ type: 'DONE_LOADING' })
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<fieldset className={styles.fieldset}>
					<label htmlFor='tel'>Tel</label>
					<input
						type='tel'
						name='tel'
						placeholder='0611223344'
						value={tel}
						onChange={(e) => setTel(e.target.value)}
					/>
				</fieldset>
				<fieldset className={styles.fieldset}>
					<label htmlFor='password'>Mot de passe</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</fieldset>
			</form>
			<button className={styles.login} onClick={login}>
				Dio !
			</button>
		</div>
	)
}

export default Login

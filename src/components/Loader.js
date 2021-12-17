import styles from '@/styles/Home.module.css'
import animations from '@/styles/Animations.module.css'

const Loader = () => {
	return (
		<main className={styles.main}>
			<div className={animations.animationContainer}>
				<div className={animations.ball}></div>
				<div className={animations.shadow}></div>
			</div>
			<h3>On s'échauffe ...</h3>
		</main>
	)
}

export default Loader

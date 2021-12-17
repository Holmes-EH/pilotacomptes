import Player from '@/models/playerModel'
import generateToken from '@/lib/generateToken'
import dbConnect from '@/lib/dbConnect'

dbConnect()

// @desc    Register a new user
// @route   POST /api/players
// @access  Public
const registerPlayer = async (req, res) => {
	const { name, tel, password } = req.body

	const userExists = await Player.findOne({ tel })

	if (userExists) {
		res.status(400).json({ message: 'Cet ulitilisateur existe déjà' })
	} else {
		const user = await Player.create({
			name,
			tel,
			password,
		})

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				tel: user.tel,
				token: generateToken(user._id),
			})
		} else {
			res.status(400).json({ message: 'Données utilisateur erronés' })
		}
	}
}

// @desc    Get all users
// @route   Get /api/players
// @access  Public
const getAllPlayers = async (req, res) => {
	const playerList = await Player.find({}, 'name tel')
	if (playerList.length > 0) {
		res.json(playerList)
	} else {
		res.status(404).json({ message: 'Aucun joueur trouvé ?' })
	}
}

// @desc    Auth user & get token
// @route   POST /api/players/login
// @access  Public
const authPlayer = async (req, res) => {
	const { tel, password } = req.body

	const user = await Player.findOne({ tel })

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			tel: user.tel,
			isAdmin: user.isAdmin,
			amap: user.amap,
			token: generateToken(user._id),
		})
	} else {
		res.status(401).json({ message: 'Email ou mot de passe erroné' })
	}
}

// @desc    Update user
// @route   PUT /api/players
// @access  Public
const updatePlayer = async (req, res) => {
	const player = await Player.findById(req.body._id)

	if (player) {
		player.name = req.body.name || player.name
		player.tel = req.body.tel || player.tel
		player.isAdmin = req.body.isAdmin ? true : false

		if (req.body.password) {
			player.password = req.body.password
		}

		const updatedPlayer = await player.save()
		res.json({
			_id: updatedPlayer._id,
			name: updatedPlayer.name,
			tel: updatedPlayer.tel,
			isAdmin: updatedPlayer.isAdmin,
			token: generateToken(updatedPlayer._id),
		})
	} else {
		res.status(404).json({ message: 'Utilisateur introuvable' })
	}
}

export { registerPlayer, authPlayer, updatePlayer, getAllPlayers }

/**
 * @const ApolloError [Permite implementar los errores definidos en 'apollo-server']
 */
const { ApolloError } = require('apollo-server')

/**
 * @const serverConfig [Permite implementar las URL declaradas en server.js']
 */
const serverConfig = require('../server')

/**
 * @const fetch [Permite crear una consulta al microservicio']
 */
const fetch = require('node-fetch')

/**
 *
 * @const authentication [Contiene los métodos y la lógiza para validar los usuarios y sus roles]
 * @returns [Dos objetos, el id del usuario autenticado y su rol]
 */
const authentication = async ({ req }) => {
	const token = req.headers.authorization || ''

	if (token == '') {
		return {
			userIdToken: null,
		}
	} else {
		try {
			let requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
				redirect: 'follow',
			}

			let response = await fetch(
				`${serverConfig.auth_api_url}verifyToken/`,
				requestOptions
			)

			if (response.status != 200) {
				console.log(response)
				throw new ApolloError(`SESION INACTIVA - ${401}` + response.status, 401)
			}

			const userIdToken = (await response.json()).UserId

			// Averiguando el rol

			const user = await fetch(
				`${serverConfig.auth_api_url}userPk/${userIdToken}/`
			)

			if (user.status != 200) {
				console.log(response)
				throw new ApolloError(
					`ERROR AL CONSULTAR LOS PERMISOS - ${401}` + response.status,
					401
				)
			}

			const { role } = await user.json()

			return { userIdToken, role }
		} catch (error) {
			throw new ApolloError(`TOKEN ERROR: ${500}: ${error}`, 500)
		}
	}
}

/**
 * @const {Object} authentication [exporta la constante para que pueda ser llamada]
 */
module.exports = authentication

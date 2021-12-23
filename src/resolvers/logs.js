/**
 * @summary [Resuleve los esquemas de logs.]
 */

/**
 * @const ApolloError [Permite implementar los errores definidos en 'apollo-server']
 */
const { ApolloError } = require('apollo-server')
const { json } = require('body-parser')

const admin = '1'
const user = '2'

/**
 * @constant userResolver Contiene todos los métodos para resolver
 *  los esquemas definidos en /typeDefs/logs.js.
 *  Es exportada en la última línea del código: module.exports = logsResolver;
 * @author seraleman
 */
const logsResolver = {
	/**
	 * Métodos que solucionan los campos establecidos
	 *  para Query en el esquema TypeDef logs.js.
	 *  Consultas.
	 */
	Query: {
		/**
		 * Obtiene todas las razones de logs_ms
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {Indicador} __ [Significa que no viene nada en los "args"]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {Objects} role [Informa el rol del usuario]
		 * @returns {Objects} [Devuelte todas las razones de la BD]
		 * Probado: Ok!
		 */
		getAllReasons: async (_, __, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					return (await dataSources.LogsAPI.getAllReasons()).data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},

		/**
		 * Obtiene determinada razón
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {String} reasonIdInput [Id del producto]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @returns {Object} [Devuelve la razón específica de acuerdo al id que se pasó
		 *  por argumento]
		 * Probado: Ok!
		 */
		getReasonById: async (_, { reasonIdInput }, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					return (await dataSources.LogsAPI.getReasonById(reasonIdInput)).data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},

		/**
		 * Obtiene todas las registros de logs_ms
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {Indicador} __ [Significa que no viene nada en los "args"]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {Objects} role [Informa el rol del usuario]
		 * @returns {Objects} [Devuelte todas los registros de la BD]
		 * Probado: !
		 */
		getAllLogs: async (_, __, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					return (await dataSources.LogsAPI.getAllLogs()).data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},

		/**
		 * Obtiene un registro en específico
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {Indicador} logIdInput [Id del registro]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {Objects} role [Informa el rol del usuario]
		 * @returns {Objects} [Devuelte el registro relacionado con el id que se pasa
		 * 	por parámetro]
		 * Probado: Ok!
		 */
		getLogById: async (_, { logIdInput }, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					return (await dataSources.LogsAPI.getLogById(logIdInput)).data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},

		/**
		 * Obtiene una lista de registros en específico filtrado por usuario
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {Indicador} UserIdInput [Id del usuario para filtrar]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {Objects} role [Informa el rol del usuario]
		 * @returns {Objects} [Devuelte una lista de registros relacionados con el id del usuario que se pasa
		 * 	por parámetro]
		 * Probado: Ok!
		 */
		getLogsByUser: async (_, { userIdInput }, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					return (await dataSources.LogsAPI.getLogsByUserId(userIdInput)).data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},

		/**
		 * Obtiene una lista de registros en específico filtrado por razón
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {Indicador} reasonIdInput [Id de la razón para filtrar]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {Objects} role [Informa el rol del usuario]
		 * @returns {Objects} [Devuelte una lista de registros relacionados con el id de la razón que se pasa
		 * 	por parámetro]
		 * Probado: Ok!
		 */
		getLogsByReason: async (_, { reasonIdInput }, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					return (await dataSources.LogsAPI.getLogsByReasonId(reasonIdInput))
						.data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},

		/**
		 * Obtiene una lista de registros en específico filtrado por razón
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {Indicador} reasonIdInput [Id de la razón para filtrar]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {Objects} role [Informa el rol del usuario]
		 * @returns {Objects} [Devuelte una lista de registros relacionados con el id de la razón que se pasa
		 * 	por parámetro]
		 */
		getLogsByDate: async (_, { dateInput }, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					return (await dataSources.LogsAPI.getLogsByDate(dateInput)).data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},

		/**
		 * Obtiene una lista de registros en específico filtrado por razón y fecha
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {Indicador} reasonIdInput [Id de la razón para filtrar]
		 * @param {Indicador} dateInput [Fecha para filtrar]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {Objects} role [Informa el rol del usuario]
		 * @returns {Objects} [Devuelte una lista de registros relacionados con el id de la razón que se pasa
		 * 	por parámetro]
		 */
		getLogsByReasonAndDate: async (
			_,
			{ reasonIdInput, dateInput },
			{ dataSources, role }
		) => {
			if (role != null) {
				if (role == admin || role == user) {
					return (
						await dataSources.LogsAPI.getLogsByReasonIdAndDate(
							reasonIdInput,
							dateInput
						)
					).data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},
	},

	Log: {
		/**
		 * Filtra cada uno de los usarios
		 * @param {String} user [Id del usuario relacionado]
		 * @param {Indicador} __ [Significa que no viene nada en los "args"]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {Objects} users [Lista de todos los usuarios]
		 * @returns {Object} [Devuelte cada usuario relacionado]
		 * Probado: Ok!
		 */
		user: async ({ user }, __, { dataSources }) => {
			const users = await dataSources.AuthAPI.getAllUsers()
			return users.find((obj) => {
				return obj.id == user
			})
		},
	},
	Mutation: {
		/**
		 * Crea una razón
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {Object} reasonInput [Contiene todos lo campos para crear una razón]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {String} role [Informa el rol del usuario autenticado]
		 * @param {Object} reason [Estructura los campos para contruir lña razón]
		 * @returns {Object} [Devuelve la razón creada]
		 * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
		 * Probado: Ok!
		 */
		createReason: async (_, { reasonInput }, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					const reason = {
						name: reasonInput.name,
						description: reasonInput.description,
					}
					return (await dataSources.LogsAPI.createReason(reason)).data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},

		/**
		 * Actualiza determinada razón
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {string} reasonIdInput [Id de ña razón a actualizar]
		 * @param {Object} reasonInput [Objeto con los campos para actualizar la razón]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {String} role [Informa el rol del usuario autenticado]
		 * @param {Object} reason [Objeto donde se determinan los datos para actualizar la
		 *  razón]
		 * @returns {Object} [Devuelve la razón actualizada]
		 * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
		 * Probado: Ok!
		 */
		updateReason: async (
			_,
			{ reasonIdInput, reasonInput },
			{ dataSources, role }
		) => {
			if (role != null) {
				if (role == admin || role == user) {
					const reason = {
						name: reasonInput.name,
						description: reasonInput.description,
					}
					return (await dataSources.LogsAPI.updateReason(reasonIdInput, reason))
						.data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},
		/**
		 * Elimina determinada razón
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {string} reasonIdInput [Id de ña razón a actualizar]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {String} role [Informa el rol del usuario autenticado]
		 * @param {Objects} logs [Lista de registros]
		 * @returns {String} [Devuelve un mensaje]
		 * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
		 * Mejoras: Con el objetivo de hacerlo más eficiente, destinar un campo de la reason
		 * 	que indique si ha sido usada o no.
		 * Probado: Ok!
		 */
		deleteReasonById: async (_, { reasonIdInput }, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					const logs = (await dataSources.LogsAPI.getAllLogs()).data
					logs.forEach(({ reason }) => {
						if (reason.id == reasonIdInput)
							throw new ApolloError(
								`LA \'RAZÓN\' QUE INTENTA ELIMINAR ESTÁ ENLAZADA A ALGÚN REGISTRO: ${412}:`,
								412
							)
					})
					return (await dataSources.LogsAPI.deleteReasonById(reasonIdInput))
						.message
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},

		/**
		 * Crea un registro
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {Object} logInput [Contiene todos lo campos para crear un registro]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {String} role [Informa el rol del usuario autenticado]
		 * @param {Object} log [Estructura los campos para crear los registros]
		 * @returns {Object} [Devuelve el registro creado]
		 * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
		 * Probado: Ok!
		 */
		createLog: async (_, { logInput }, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					const log = {
						reason: logInput.reason,
						user: logInput.user,
					}
					return (await dataSources.LogsAPI.createLog(log)).data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},

		/**
		 * Actualiza determinado registro
		 * @param {Indicador} _ [Significa que no viene nada en el "parent"]
		 * @param {string} logIdInput [Id del registro a actualizar]
		 * @param {Object} logInput [Objeto con los campos para actualizar el registro]
		 * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
		 * @param {String} role [Informa el rol del usuario autenticado]
		 * @param {Object} log [Objeto donde se determinan los datos para actualizar el registro]
		 * @returns {Object} [Devuelve el registro actualizado]
		 * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
		 * Probado: Ok!
		 */
		updateLog: async (_, { logIdInput, logInput }, { dataSources, role }) => {
			if (role != null) {
				if (role == admin || role == user) {
					const log = {
						reason: logInput.reason,
						user: logInput.user,
					}
					return (await dataSources.LogsAPI.updateLog(logIdInput, logInput))
						.data
				} else {
					throw new ApolloError(`NO AUTORIZADO : ${403}:`, 403)
				}
			} else {
				throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
			}
		},
	},
}

module.exports = logsResolver

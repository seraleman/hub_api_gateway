/**
 * @const RESTDataSource @requires 'apollo-datasource-rest' [Para extender de RESTDataSource]
 */
const { RESTDataSource } = require('apollo-datasource-rest')

/**
 * @const ApolloError [Permite implementar los errores definidos en 'apollo-server']
 */
const { ApolloError } = require('apollo-server')

/**
 *@const serverConfig @requires '../server' [Para acceder a la URL del microservicio]
 */
const serverConfig = require('../server')

/**
 * @class AuthAPI [Contiene todos lo métodos para acceder a cada propiedad del microservicio]
 *   Es exportada en la última línea del código: module.exports = AuthAPI;
 */
class LogsAPI extends RESTDataSource {
	/**
	 * @constructor {object} baseURL [Enlaza la clase con la url declarada para
	 *  microservicio Auth_ms en server.js]
	 */
	constructor() {
		super()
		this.baseURL = serverConfig.logs_api_url
	}

	/**
	 * Devuelve todas las razones de la BD
	 * @returns {Objects} [Devuelve la ista de todos los productos]
	 */
	async getAllReasons() {
		return await this.get('api/ms/reasons/')
	}

	/**
	 * Devuelve una razón en específico
	 * @param {String} reasonId [Id de la razón que se va a consultar]
	 * @returns {Object} [Devuleve el objeto relacionado con el id pasdado como parámetro]
	 */
	async getReasonById(reasonId) {
		return await this.get(`api/ms/reasons/${reasonId}`)
	}

	/**
	 * Crea un producto
	 * @param {Object} productInput [Contiene el objeto con los campos para crear el producto]
	 * @returns {Object} [Devuelve el objeto creado]
	 */
	async createReason(reason) {
		return await this.post('api/ms/reasons/', reason)
	}

	/**
	 * Actualiza una determinada razón
	 * @param {String} reasonId [Id de la razón a actualizar]
	 * @param {Object} reason [Objeto con los campos para actualizar la razón]
	 * @returns {Object} [Devueleve el objeto actualizado]
	 */
	async updateReason(reasonId, reason) {
		return await this.put(`api/ms/reasons/${reasonId}`, reason)
	}

	/**
	 * Elimina una determinada razón
	 * @param {String} reasonId [Id de la razón a actualizar]
	 * @returns {String} [Devueleve un mensaje de confirmación]
	 */
	async deleteReasonById(reasonId) {
		return await this.delete(`api/ms/reasons/${reasonId}`)
	}

	/**
	 * Devuelve todas los registros de la BD
	 * @returns {Objects} [Devuelve la ista de todos los registros]
	 */
	async getAllLogs() {
		return await this.get('api/ms/logs/')
	}

	/**
	 * Devuelve un registro en específico
	 * @param {String} logId [Id del registro que se va a consultar]
	 * @returns {Object} [Devuleve el objeto relacionado con el id pasdado como parámetro]
	 */
	async getLogById(logId) {
		return await this.get(`api/ms/logs/${logId}`)
	}

	/**
	 * Devuelve una lista de registros en específico
	 * @param {String} userId [Id del usuario por el que se filtrará la búsqueda]
	 * @returns {Object} [Devuleve el objeto relacionado con el id pasdado como parámetro]
	 */
	async getLogsByUserId(userId) {
		return await this.get(`api/ms/logs/user/${userId}`)
	}

	/**
	 * Devuelve una lista de registros en específico
	 * @param {String} reasonId [Id de la razón por el que se filtrará la búsqueda]
	 * @returns {Object} [Devuleve el objeto relacionado con el id pasdado como parámetro]
	 */
	async getLogsByReasonId(reasonId) {
		return await this.get(`api/ms/logs/reason/${reasonId}`)
	}

	/**
	 * Devuelve una lista de registros en específico
	 * @param {String} date [Fecha para filtrar]
	 * @returns {Object} [Devuleve el objeto relacionado con la fecha pasada como parámetro]
	 */
	async getLogsByDate(date) {
		return await this.get(`api/ms/logs/date/${date}`)
	}

	/**
	 * Devuelve una lista de registros en específico
	 * @param {String} reasonId [Id de la razón pora filtrar]
	 * @param {String} date [Fecha para filtrar]
	 * @returns {Object} [Devuleve el objeto relacionado con el id de la razón y la fecha pasados como parámetros]
	 */
	async getLogsByReasonIdAndDate(reasonId, date) {
		return await this.get(`api/ms/logs/reason/${reasonId}/${date}`)
	}

	/**
	 * Crea un registro
	 * @param {Object} logInput [Contiene el objeto con los campos para crear el registro]
	 * @returns {Object} [Devuelve el objeto creado]
	 */
	async createLog(log) {
		return await this.post('api/ms/logs/', log)
	}

	/**
	 * Actualiza un determinado registro
	 * @param {String} logId [Id del registro a actualizar]
	 * @param {Object} log [Objeto con los campos para actualizar el registro]
	 * @returns {Object} [Devueleve el objeto actualizado]
	 */
	async updateLog(logId, log) {
		return await this.put(`api/ms/logs/${logId}`, log)
	}
}

/**
 * @const {Object} AuthAPI [exporta la constante para que
 *  sus métodos estén disponibles]
 */
module.exports = LogsAPI

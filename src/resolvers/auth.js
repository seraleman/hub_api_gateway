/**
 * @summary [Resuleve los esquemas de auth.]
 * @readonly *[En el futuro se le podría agregar validación de existencia
 *  de usuario y error en contraseña]
 *  [SI alcanza el tiempo, hacer un mutation para cambio de contraseña]
 */

/**
 * @const ApolloError [Permite implementar los errores definidos en 'apollo-server']
 */
const { ApolloError } = require('apollo-server')

const admin = '1'

/**
 * @constant sellingResolver Contiene todos los métodos para resolver
 *  los esquemas definidos en /typeDefs/auth.js.
 *  Es exportada en la última línea del código: module.exports = userResolver;
 * @author seraleman
 */
const userResolver = {
  /**
   * Métodos que solucionan los campos establecidos
   *  para Query en el esquema TypeDef auth.js.
   *  Consultas.
   */
  Query: {
    /**
     * Obtiene la información de un usuario
     * @access Usario autenticado relacionado - superusuario
     * @param {Indicador} _ [Significa que no viene nada en el "parent"]
     * @param {String} userIdInput [Id del usuario que llega desde el cliente]
     * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
     * @param {String} rol [Informa el rol del usuario autenticado]
     * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
     * @returns {Object} [Devuelve al usuario al que pertenece el id pasado como argumento]
     * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
     * Probado: Ok!
     */
    userDetailById: async (
      _,
      { userIdInput },
      { dataSources, role, userIdToken }
    ) => {
      if (userIdToken != null) {
        if (role == admin || userIdInput == userIdToken) {
          return await dataSources.AuthAPI.getUserId(userIdInput)
        } else {
          throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
        }
      } else {
        throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
      }
    },
  },
  /**
   * Métodos que solucionan los campos establecidos
   *  para Mutation en el esquema TypeDef auth.js.
   *  (Crear, modificar, eliminar)
   */
  Mutation: {
    /**
     * Inhabilita o habilita un usuario
     * @param {Indicador} _ [Significa que no viene nada en el "parent"]
     * @param {String} userIdInput [Id del usuario a inhabilitar]
     * @param {Object} userInput [Contiene los datos del usuario]
     * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
     * @param {String} rol [Informa el rol del usuario autenticado]
     * @param {Object} user [Almacena los valores para inhabilitar el usuario]
     * @returns {Object} [Retorna el usuario inhabilitado]
     * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
     * Probado: Ok!
     */
    disableUnableUser: async (
      _,
      { userIdInput, userInput },
      { dataSources, role }
    ) => {
      if (role != null) {
        if (role == admin) {
          const user = {
            date_of_birth: userInput.date_of_birth,
            document: userInput.document,
            document_type: userInput.document_type,
            email: userInput.email,
            enabled: userInput.enabled,
            entity: userInput.entity,
            full_name: userInput.full_name,
            password: userInput.password,
            phoneNumber: userInput.phoneNumber,
            position: userInput.position,
            role: userInput.role,
          }
          return await dataSources.AuthAPI.updateUser(userIdInput, user)
        } else {
          throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
        }
      } else {
        throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
      }
    },

    /**
     * Permite que un usuario existente se autentique en el sistema
     * @param {Indicador} _ [Significa que no viene nada en el "parent"]
     * @param {Object} credentialsInput [Son las credenciales para la autenticación]
     * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
     * @returns {Object} [Retorna el token y el access del usuario autenticado]
     * Probado: Ok!
     */
    logIn: async (_, { credentialsInput }, { dataSources }) => {
      return dataSources.AuthAPI.authRequest(credentialsInput)
    },

    /**
     * Permite que un usuario existente se autentique en el sistema
     * @param {Indicador} _ [Significa que no viene nada en el "parent"]
     * @param {Object} refreshInput [Es el refresh para renovar el token]
     * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
     * @returns {Object} [Retorna el acces para mantener sesión activa]
     * Probado: Ok!
     */
    refreshToken: (_, { refreshInput }, { dataSources }) => {
      return dataSources.AuthAPI.refreshToken(refreshInput)
    },

    /**
     * Crea un usuario
     * @param {Indicador} _ [Significa que no viene nada en el "parent"]
     * @param {Object} userInput [Usuario que viene desde el cliente para su creación]
     * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
     * @param {String} rol [Informa el rol del usuario autenticado]
     * @param {Object} user [Permite estructurar el objeto usuario para ser enviado a crear]
     * @returns {Object} [Devuelve el usuario creado por Auth_ms]
     * probado: Ok!
     */
    signUpUser: async (_, { userInput }, { dataSources, role }) => {
      if (role != null) {
        if (role == admin) {
          const user = {
            date_of_birth: userInput.date_of_birth,
            document: userInput.document,
            document_type: userInput.document_type,
            email: userInput.email,
            entity: userInput.entity,
            full_name: userInput.full_name,
            password: userInput.password,
            phoneNumber: userInput.phoneNumber,
            position: userInput.position,
            role: userInput.role,
          }
          return await dataSources.AuthAPI.createUser(user)
        } else {
          throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
        }
      } else {
        throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
      }
    },

    /**
     * Actualiza un usuario
     * @param {Indicador} _ [Significa que no viene nada en el "parent"]
     * @param {String} userIdInput [Id del usuario a actualizar]
     * @param {Object} userInput [Contiene los datos a actualizar del usuario]
     * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
     * @param {String} rol [Informa el rol del usuario autenticado]
     * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
     * @param {Object} user [Almacena los valores para actualizar el usuario]
     * @returns {Object} [Retorna el usuario actualizado]
     * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
     * Probado: Ok!
     */
    updateUser: async (
      _,
      { userIdInput, userInput },
      { dataSources, role, userIdToken }
    ) => {
      if (role != null) {
        if (role == admin || userIdToken == userIdInput) {
          const user = {
            date_of_birth: userInput.date_of_birth,
            document: userInput.document,
            document_type: userInput.document_type,
            email: userInput.email,
            entity: userInput.entity,
            full_name: userInput.full_name,
            password: userInput.password,
            phoneNumber: userInput.phoneNumber,
            position: userInput.position,
            role: userInput.role,
          }
          return await dataSources.AuthAPI.updateUser(userIdInput, user)
        } else {
          throw new ApolloError(`NO AUTORIZADO : ${403}: `, 403)
        }
      } else {
        throw new ApolloError(`NO AUTENTICADO: ${407}: `, 407)
      }
    },

    /**
     * Registra un usuario (temporal)
     * @param {Indicador} _ [Significa que no viene nada en el "parent"]
     * @param {String} userIdInput [Id del usuario a actualizar]
     * @param {Object} userInput [Contiene los datos a actualizar del usuario]
     * @param {Object} dataSources [Permite acceder a los métodos de los microservicios]
     * @param {String} rol [Informa el rol del usuario autenticado]
     * @param {String} userIdToken [Id del usuario autenticado (logedIn)]
     * @param {Object} user [Almacena los valores para actualizar el usuario]
     * @returns {Object} [Retorna el usuario actualizado]
     * @throws Devuelve error de no autorizado - Devuelve error de no autenticado
     * Probado: Ok!
     */
    registerUser: async (_, { userInput }, { dataSources }) => {
      const user = {
        date_of_birth: userInput.date_of_birth,
        document: userInput.document,
        document_type: userInput.document_type,
        email: userInput.email,
        entity: userInput.entity,
        full_name: userInput.full_name,
        password: 'yosoysena',
        phoneNumber: userInput.phoneNumber,
        position: userInput.position,
        role: '3',
      }
      return await dataSources.AuthAPI.createUser(user)
    },
  },
}

/**
 * @const {Object} userResolver [exporta la constante para que
 *  sus métodos estén disponibles]
 */
module.exports = userResolver

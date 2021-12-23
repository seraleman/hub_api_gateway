/**
 * @constant gql @requires desde apollo-server [COnstante para poder declarar los type Defs]
 */
const { gql } = require('apollo-server')

/**
 * @constant logsTypeDefs [Lista de todos los type defs de auth]
 */
const logsTypeDefs = gql`
	type Reason {
		id: ID!
		name: String!
		description: String
	}

	type Log {
		id: ID!
		reason: Reason!
		user: User!
		dateTime: String!
		date: String!
	}

	input ReasonCreateInput {
		name: String!
		description: String
	}

	input ReasonUpdateInput {
		name: String!
		description: String!
	}

	input ReasonLogCreateInput {
		id: ID!
		name: String!
		description: String
	}

	input LogCreateInput {
		reason: ReasonLogCreateInput!
		user: ID!
	}

	input ReasonLogUpdateInput {
		id: ID!
		name: String!
		description: String
	}

	input LogUpdateInput {
		reason: ReasonLogUpdateInput!
		user: ID!
	}

	type Query {
		getAllReasons: [Reason!]
		getReasonById(reasonIdInput: ID!): Reason!

		getAllLogs: [Log!]
		getLogById(logIdInput: ID!): Log!
		getLogsByUser(userIdInput: ID!): [Log!]
		getLogsByReason(reasonIdInput: ID!): [Log!]
		getLogsByDate(dateInput: String!): [Log!]
		getLogsByReasonAndDate(reasonIdInput: ID!, dateInput: String!): [Log!]
	}

	type Mutation {
		createReason(reasonInput: ReasonCreateInput!): Reason!
		updateReason(reasonIdInput: ID, reasonInput: ReasonUpdateInput!): Reason!
		deleteReasonById(reasonIdInput: ID!): String!

		createLog(logInput: LogCreateInput!): Log!
		updateLog(logIdInput: ID!, logInput: LogUpdateInput!): Log!
	}
`

module.exports = logsTypeDefs

export const getSession = () => {
	const session = window.localStorage.getItem('session')
	if (session) return session
	return null
}

export const getTokens = () => {
	const tokens = window.localStorage.getItem('sb-abcxzy-qwerty-session-access-refresh-tokens')
	if (tokens) return tokens
	return null
}

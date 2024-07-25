import { signUpUser } from '@/db/supabase'
import type { User } from '@/interfaces/user'
import { useState } from 'react'

export function useSBSignUp() {
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const [sending, setSending] = useState(false)

	const signUp = async ({
		name,
		last_name,
		email,
		password,
		phone,
		church,
		shepherd,
		location,
	}: User) => {
		setSending(true)

		const { data, error } = await signUpUser({
			name,
			last_name,
			email,
			password,
			phone,
			church,
			shepherd,
			location,
		})

		if (error) {
			setError(true)
			setSuccess(false)
			setSending(false)
		} else {
			setError(false)
			setSuccess(true)
			setSending(false)
		}
	}

	return { error, setError, success, setSuccess, sending, setSending, signUp }
}

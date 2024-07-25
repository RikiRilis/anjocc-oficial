import { signInWithPassword } from '@/db/supabase'
import { useState } from 'react'

interface SignInProps {
	email: string
	password: string
}

export function useSBSignIn() {
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const [sending, setSending] = useState(false)

	const sigIn = async ({ email, password }: SignInProps) => {
		setSending(true)

		const { data, error } = await signInWithPassword({ email, password })

		if (error) {
			setSending(false)
			setError(true)
			setSuccess(false)
		} else {
			setSending(false)
			setError(false)
			setSuccess(true)
		}
	}

	return { error, setError, success, setSuccess, sending, setSending, sigIn }
}

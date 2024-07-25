import type { Email } from '@/interfaces/email'
import emailjs from '@emailjs/browser'
import { useState } from 'react'

export function useEmailjs() {
	const [sending, setSending] = useState(false)
	const [error, setError] = useState(false)

	const sendEmail = ({ user_name, user_email, message }: Email): boolean => {
		if (user_name?.trim() === '' || user_email?.trim() === '' || message?.trim() === '')
			return false
		if (user_email === 'anjocc@gmail.com') {
			window.toast({
				dismissible: true,
				title: 'Email incorrecto',
				location: 'bottom-center',
				type: 'error',
				icon: true,
			})
			return false
		}

		setSending(true)
		setError(false)

		try {
			emailjs.init({
				publicKey: import.meta.env.EMAILJS_KEY,
				blockHeadless: true,
				limitRate: {
					id: 'app',
					throttle: 120000,
				},
			})

			emailjs
				.send(import.meta.env.EMAILJS_SERVICE_ID, import.meta.env.EMAILJS_TEMPLATE_ID, {
					from_name: user_name,
					to_name: 'ANJOCC',
					from_email: user_email,
					subject: 'Email del formulario | ANJOCC Website',
					message: message,
				})
				.then(() => {
					setSending(false)
					window.toast({
						dismissible: true,
						title: 'Email enviado',
						location: 'bottom-center',
						type: 'success',
						icon: true,
					})
					return true
				})
				.catch((error) => {
					setSending(false)
					setError(true)
					window.toast({
						dismissible: true,
						title: 'Error al enviar',
						location: 'bottom-center',
						type: 'error',
						icon: true,
					})
					console.log(error)
					return false
				})
		} catch (e) {
			setSending(false)
			setError(true)
			window.toast({
				dismissible: true,
				title: 'Error al enviar',
				location: 'bottom-center',
				type: 'error',
				icon: true,
			})
			throw new Error('Error sending form.')
		}

		return false
	}

	return { sending, setSending, error, setError, sendEmail }
}

import type { User } from '@/interfaces/user'
import { getSession } from '@/utils/session'
import { createClient } from '@supabase/supabase-js'

export const supabase = () => {
	return createClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_ANON_KEY, {
		auth: {
			flowType: 'pkce',
			autoRefreshToken: false,
			detectSessionInUrl: false,
			persistSession: true,
		},
	})
}

export const insertUser = async ({
	uuid,
	name,
	last_name,
	email,
	phone,
	church,
	shepherd,
	location,
}: User) => {
	const { error } = await supabase().from('users').insert({
		uuid: uuid,
		name: name,
		last_name: last_name,
		email: email,
		phone: phone,
		church: church,
		shepherd: shepherd,
		location: location,
	})

	if (error) {
		window.toast({
			dismissible: true,
			title: 'Ocurrió un error',
			location: 'bottom-center',
			type: 'error',
			icon: true,
		})
		throw new Error(error.message)
	} else {
		window.localStorage.setItem(
			'session',
			JSON.stringify({
				uuid: uuid,
				name: name,
				last_name: last_name,
				email: email,
				phone: phone,
				church: church,
				shepherd: shepherd,
				location: location,
			})
		)
	}
}

export const signUpUser = async ({
	name,
	last_name,
	email,
	password,
	phone,
	church,
	shepherd,
	location,
}: User) => {
	const { data, error } = await supabase().auth.signUp({
		email,
		password,
	})

	if (error) {
		window.toast({
			dismissible: true,
			title: 'Ocurrió un error',
			location: 'bottom-center',
			type: 'error',
			icon: true,
		})
	} else {
		window.toast({
			dismissible: true,
			title: 'Usuario creado',
			location: 'bottom-center',
			type: 'success',
			icon: true,
		})

		if (data.user) {
			insertUser({
				uuid: data.user.id,
				name: name,
				last_name: last_name,
				email: email,
				password: password,
				phone: phone,
				church: church,
				shepherd: shepherd,
				location: location,
			})

			signInWithPassword({ email: email, password: password })
		}
	}

	return { data, error }
}

export const signInWithPassword = async ({ email = '', password = '' }) => {
	const { data, error } = await supabase().auth.signInWithPassword({
		email,
		password,
	})

	if (data.user) {
		saveSigInTokens({
			access_token: data.session.access_token,
			refresh_token: data.session.refresh_token,
		})

		window.location.href = '/registry'
	}

	if (error) {
		if (error.message === 'Email not confirmed') {
			window.toast({
				dismissible: true,
				title: '¡Confirma tu email!',
				location: 'bottom-center',
				type: 'warning',
				icon: true,
			})
		} else {
			window.toast({
				dismissible: true,
				title: 'Ocurrió un error',
				location: 'bottom-center',
				type: 'error',
				icon: true,
			})
		}
	}

	return { data, error }
}

export const signingWithGoogle = async () => {
	const { data, error } = await supabase().auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: '/registry',
		},
	})
}

export const signOut = async () => {
	const { error } = await supabase().auth.signOut()
	if (error) {
		window.toast({
			dismissible: true,
			title: 'Ocurrió un error',
			location: 'bottom-center',
			type: 'error',
			icon: true,
		})
		throw new Error(error.message)
	} else {
		window.toast({
			dismissible: true,
			title: '¡Sesión cerrada!',
			location: 'bottom-center',
			type: 'success',
			icon: true,
		})
		window.localStorage.removeItem('session')
		window.location.href = '/signin'
	}
}

const saveSigInTokens = ({
	access_token,
	refresh_token,
}: {
	access_token: string
	refresh_token: string
}) => {
	window.localStorage.setItem(
		'sb-abcxzy-qwerty-session-access-refresh-tokens',
		JSON.stringify({
			abcxyz_session_access_token: access_token,
			abcxyz_session_refresh_token: refresh_token,
		})
	)
}

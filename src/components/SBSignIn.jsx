import { useSBSignIn } from '@/hooks/useSBSignIn'
import { useRef } from 'react'

export function SBSignIn({ children }) {
	const { sending, sigIn } = useSBSignIn()
	const form = useRef()
	const googleForm = useRef()

	const handleFormSubmit = (event) => {
		event.preventDefault()
		if (sending) return

		const { email, password } = Object.fromEntries(new window.FormData(event.target))

		sigIn({ email, password })
	}

	return (
		<>
			<form
				onSubmit={handleFormSubmit}
				ref={form}
				className='flex w-full flex-col justify-center gap-6 sm:px-14 md:px-24 lg:px-36'
			>
				<label htmlFor='email' className='flex flex-col gap-2 text-sm font-medium text-highlighted'>
					Correo
					<input
						required
						id='email'
						type='email'
						name='email'
						autoComplete='email'
						className='h-10 rounded-lg border border-teal-950 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out autofill:!bg-yellow-200 focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
					/>
				</label>
				<label
					htmlFor='password'
					className='flex flex-col gap-2 text-sm font-medium text-highlighted'
				>
					Contraseña
					<input
						required
						id='password'
						type='password'
						name='password'
						className='h-10 rounded-lg border border-teal-950 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out autofill:!bg-yellow-200 focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
					/>
				</label>
				<button
					type='submit'
					className={`mt-4 flex w-full flex-row items-center justify-center gap-2 ${!sending ? 'cursor-pointer bg-accent text-highlighted' : 'cursor-not-allowed bg-teal-800 text-secondary'} ${sending ? '' : 'active:border-accent active:bg-transparent active:text-accent md:hover:border-accent md:hover:bg-transparent md:hover:text-accent'} rounded-xl border border-transparent px-3 py-2 text-lg font-bold transition`}
				>
					{sending && (
						<svg className='size-5' width='38' height='38' viewBox='0 0 38 38'>
							<defs>
								<linearGradient x1='8.042%' y1='0%' x2='65.682%' y2='23.865%' id='a'>
									<stop stopColor='currentColor' stopOpacity='0' offset='0%' />
									<stop stopColor='currentColor' stopOpacity='.631' offset='63.146%' />
									<stop stopColor='currentColor' offset='100%' />
								</linearGradient>
							</defs>
							<g fill='none' fillRule='evenodd'>
								<g transform='translate(1 1)'>
									<path
										d='M36 18c0-9.94-8.06-18-18-18'
										id='Oval-2'
										stroke='url(#a)'
										strokeWidth='2'
									>
										<animateTransform
											attributeName='transform'
											type='rotate'
											from='0 18 18'
											to='360 18 18'
											dur='0.9s'
											repeatCount='indefinite'
										/>
									</path>
									<circle fill='currentColor' cx='36' cy='18' r='1'>
										<animateTransform
											attributeName='transform'
											type='rotate'
											from='0 18 18'
											to='360 18 18'
											dur='0.9s'
											repeatCount='indefinite'
										/>
									</circle>
								</g>
							</g>
						</svg>
					)}
					Iniciar
				</button>
			</form>

			<form
				ref={googleForm}
				className='flex w-full flex-col justify-center sm:px-14 md:px-24 lg:px-36'
			>
				<div className='my-4 flex w-full items-center justify-center'>
					<hr className='h-0.5 w-full border-0 bg-gradient-to-r from-transparent via-teal-800 to-transparent' />

					<p className='mx-2 text-center text-secondary'>O</p>

					<hr className='h-0.5 w-full border-0 bg-gradient-to-r from-transparent via-teal-800 to-transparent' />
				</div>

				<button
					value='google'
					name='provider'
					type='submit'
					className='flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-xl border border-transparent bg-accent px-3 py-2 text-lg font-bold text-highlighted transition active:border-accent active:bg-transparent active:text-accent md:hover:border-accent md:hover:bg-transparent md:hover:text-accent'
				>
					{children}
					Iniciar con Google
				</button>

				<p className='mt-6 text-sm text-highlighted'>
					¿Aún no tienes cuenta?
					<a
						href='/signup'
						rel='noopener noreferrer'
						className='ml-2 font-medium text-accent underline underline-offset-2 transition-colors active:text-secondary md:hover:text-secondary'
					>
						Crear cuenta
					</a>
				</p>
			</form>
		</>
	)
}

import { useEmailjs } from '@/hooks/useEmailjs'
import { useRef } from 'react'

export const SendForm = () => {
	const { sending, sendEmail } = useEmailjs()
	const form = useRef()

	const handleClick = (event) => {
		event.preventDefault()
		if (sending) return

		const { user_name, user_email, message } = Object.fromEntries(new window.FormData(event.target))

		if (sendEmail({ user_name, user_email, message })) form.current.reset()
	}

	return (
		<form ref={form} onSubmit={handleClick} className='flex-1 pt-6 sm:w-full sm:pt-0'>
			<span className='text-sm italic text-secondary'>
				*Contáctanos directamente por aquí si prefieres.
			</span>

			<div className='mt-4 flex flex-col gap-2'>
				<label className='mb-1 flex flex-col font-semibold text-highlighted'>
					Nombre
					<input
						required
						autoComplete='name'
						className='h-10 rounded-lg border border-teal-950 bg-slate-200 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out focus:border-accent focus:bg-transparent focus:shadow-sm focus:outline-none placeholder:focus:invisible'
						type='text'
						name='user_name'
						placeholder='Darlying Scoffield'
					/>
				</label>

				<label className='mb-1 flex flex-col font-semibold text-highlighted'>
					Correo
					<input
						required
						autoComplete='email'
						className='h-10 rounded-lg border border-teal-950 bg-slate-200 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out autofill:!bg-yellow-200 focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
						type='email'
						name='user_email'
						placeholder='example@example.com'
					/>
				</label>

				<label className='mb-1 flex flex-col font-semibold text-highlighted'>
					Mensaje
					<textarea
						required
						className='h-28 rounded-lg border border-teal-950 bg-slate-200 bg-teal-950/50 px-2 py-1 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
						name='message'
						placeholder='Escribe tu mensaje...'
					></textarea>
				</label>
			</div>

			<button
				type='submit'
				className={`mt-4 flex w-full flex-row items-center justify-center gap-2 ${!sending ? 'cursor-pointer bg-accent text-highlighted' : 'cursor-not-allowed bg-teal-800 text-secondary'} ${sending ? '' : 'active:border-accent active:bg-transparent active:text-accent md:hover:border-accent md:hover:bg-transparent md:hover:text-accent'} rounded-xl border border-transparent px-3 py-2 text-lg font-bold transition`}
			>
				{!sending ? (
					<svg
						className='size-5'
						width='800px'
						height='800px'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
						<path d='M10 14l11 -11'></path>
						<path d='M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5'></path>
					</svg>
				) : (
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
								<path d='M36 18c0-9.94-8.06-18-18-18' id='Oval-2' stroke='url(#a)' strokeWidth='2'>
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
				Enviar
			</button>
		</form>
	)
}

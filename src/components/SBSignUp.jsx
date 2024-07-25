import { useRef } from 'react'
import { Consts } from '@/utils/const'
import { useSBSignUp } from '@/hooks/useSBSignUp'

const provinces = Consts.DR_PROVINCES

export const SBSignUp = () => {
	const { signUp, sending } = useSBSignUp()
	const form = useRef()

	const handleClick = (event) => {
		event.preventDefault()
		if (sending) return

		const { name, last_name, email, password, phone, church, shepherd, location } =
			Object.fromEntries(new window.FormData(event.target))

		signUp({ name, last_name, email, password, phone, church, shepherd, location })
	}

	return (
		<form
			ref={form}
			onSubmit={handleClick}
			className='flex w-full flex-col justify-center gap-6 sm:px-14 md:px-24 lg:px-36'
		>
			<div className='flex w-full flex-col gap-6 md:flex-row md:gap-2'>
				<label
					htmlFor='name'
					className='flex w-full flex-col gap-2 text-sm font-medium text-highlighted'
				>
					Nombre
					<input
						required
						id='name'
						type='text'
						autoComplete='given-name'
						autoCapitalize='words'
						name='name'
						className='h-10 rounded-lg border border-teal-950 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
					/>
				</label>
				<label
					htmlFor='last_name'
					className='flex w-full flex-col gap-2 text-sm font-medium text-highlighted'
				>
					Apellido
					<input
						required
						id='last_name'
						type='text'
						autoComplete='family-name'
						autoCapitalize='words'
						name='last_name'
						className='h-10 rounded-lg border border-teal-950 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
					/>
				</label>
			</div>
			<label htmlFor='email' className='flex flex-col gap-2 text-sm font-medium text-highlighted'>
				Correo
				<input
					required
					id='email'
					type='email'
					name='email'
					autoComplete='email'
					className='h-10 rounded-lg border border-teal-950 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
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
					className='h-10 rounded-lg border border-teal-950 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
				/>
			</label>
			<label htmlFor='phone' className='flex flex-col gap-2 text-sm font-medium text-highlighted'>
				Celular
				<input
					required
					pattern='[0-9]{10}'
					id='phone'
					type='tel'
					name='phone'
					autoComplete='tel'
					className='h-10 rounded-lg border border-teal-950 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
				/>
			</label>
			<label htmlFor='church' className='flex flex-col gap-2 text-sm font-medium text-highlighted'>
				Iglesia
				<input
					required
					id='church'
					type='text'
					name='church'
					autoCapitalize='words'
					className='h-10 rounded-lg border border-teal-950 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
				/>
			</label>
			<label
				htmlFor='shepherd'
				className='flex flex-col gap-2 text-sm font-medium text-highlighted'
			>
				Pastor/a
				<input
					required
					id='shepherd'
					type='text'
					name='shepherd'
					autoComplete='name'
					className='h-10 rounded-lg border border-teal-950 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
				/>
			</label>
			<label
				htmlFor='location'
				className='flex flex-col gap-2 text-sm font-medium text-highlighted'
			>
				Ubicación
				<select
					required
					name='location'
					id='location'
					autoComplete='address-line1'
					className='h-10 rounded-lg border border-teal-950 bg-teal-950/50 px-2 font-normal text-secondary placeholder-slate-500 transition-colors ease-in-out focus:border-accent focus:bg-transparent focus:outline-none placeholder:focus:invisible'
				>
					{provinces.map((province) => (
						<option key={province} className='bg-primary text-base text-secondary' value={province}>
							{province}
						</option>
					))}
				</select>
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
				Crear
			</button>

			<p className='text-sm text-highlighted'>
				¿Ya tienes cuenta?
				<a
					href='/signin'
					rel='noopener noreferrer'
					className='ml-2 font-medium text-accent underline underline-offset-2 transition-colors active:text-secondary md:hover:text-secondary'
				>
					Inciar sesión
				</a>
			</p>
		</form>
	)
}

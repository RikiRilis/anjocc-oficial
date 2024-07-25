/// <reference types="astro/client" />

import type { ToastOptions } from '@/lib/toast'

interface Window {
	toast({ ToastOptions }: ToastOptions): void
}

interface ImportMetaEnv {
	readonly EMAILJS_KEY: string
	readonly EMAILJS_SERVICE_ID: string
	readonly EMAILJS_TEMPLATE_ID: string
	readonly SUPABASE_URL: string
	readonly SUPABASE_ANON_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare global {
	interface Window {
		toast: function
	}
}

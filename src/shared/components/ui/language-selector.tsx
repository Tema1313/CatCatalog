import { useLanguage } from "@/i18n/hooks/useLanguage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { SUPPORTED_LANGS, type Language } from "@/i18n"

export const LanguageSelector = () => {
	const { setLanguage, language } = useLanguage()

	return (
		<Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
			<SelectTrigger
				aria-label="Language"
				className="h-9 w-[84px] gap-1.5 rounded-md border-border/60 bg-background/60 px-3 text-sm font-medium uppercase tracking-wide shadow-sm transition-colors hover:bg-accent/40 focus:ring-2 focus:ring-ring/40"
			>
				<SelectValue />
			</SelectTrigger>

			<SelectContent align="end" className="min-w-[84px] rounded-md border-border/60 p-1">
				{SUPPORTED_LANGS.map((lang) => (
					<SelectItem
						key={lang}
						value={lang}
						className="cursor-pointer justify-center rounded-sm py-1.5 text-sm font-medium uppercase tracking-wide"
					>
						{lang}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

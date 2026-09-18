import type { Language } from "@/i18n"
import type { ICat } from "../model"
import { catsByLocale } from "../testdata"

export const getCat = (id: number, language: Language): ICat | undefined => {
	const cats = catsByLocale[language]

	return cats.find((cat) => cat.id === id)
}

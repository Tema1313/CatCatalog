import { Button } from "@/shared/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CatForm } from "./CatForm"
import { useLanguage } from "@/i18n/hooks/useLanguage"

export const CreateCat = () => {
	const [open, setOpen] = useState<boolean>(false)
	const { t } = useLanguage()

	return (
		<Dialog
			modal
			open={open}
			onOpenChange={(open) => {
				setOpen(open)
			}}
		>
			<DialogTrigger className="cursor-pointer" asChild>
				<Button title={t("common.add")} variant="ghost" className=" green ">
					<Plus strokeWidth={4} size={24} color="#4082b7" />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px] w-full">
				<DialogHeader>
					<DialogTitle>{t("cats.add-cat")}</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<div className="-mx-4 px-4">
					<CatForm mode="Create" />
				</div>
			</DialogContent>
		</Dialog>
	)
}

import type { FC, PropsWithChildren } from "react"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog"
import { useLanguage } from "@/i18n/hooks/useLanguage"

interface IWarningProps {
	actionClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	cancelClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	actionTitle?: string
	description?: string
}

export const Warning: FC<PropsWithChildren<IWarningProps>> = (props) => {
	const { t } = useLanguage()

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{t("warning.are-you-sure")}</AlertDialogTitle>
					<AlertDialogDescription>
						{props.description !== undefined ? props.description : t("warning.this-action-can't-be-cancelled")}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={props.cancelClick}>{t("common.cancel")}</AlertDialogCancel>
					<AlertDialogAction onClick={props.actionClick}>
						{props.actionTitle ? props.actionTitle : t("common.save")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

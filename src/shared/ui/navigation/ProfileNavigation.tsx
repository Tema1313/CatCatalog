import { useLanguage } from "@/i18n/hooks/useLanguage"
import { useAuth } from "@/shared/auth/hooks/useAuth"
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu"
import { CircleUserRound, LogOut } from "lucide-react"
import type { FC } from "react"

interface IProfileNavigationProps {}

export const ProfileNavigation: FC<IProfileNavigationProps> = () => {
	const auth = useAuth()
	const { t } = useLanguage()

	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>
				<CircleUserRound className="me-1" size={18} />
				{auth.login}
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<NavigationMenuLink onClick={() => auth.resetLogin()} className="align-middle flex flex-row cursor-pointer ">
					<LogOut /> {t("navbar.exit")}
				</NavigationMenuLink>
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}

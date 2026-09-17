import type { FC } from "react"
import { CatalogNavigation } from "./CatalogNavigation"
import { ProfileNavigation } from "./ProfileNavigation"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/shared/components/ui/navigation-menu"
import { useNavigate } from "@tanstack/react-router"
import { useLanguage } from "@/i18n/hooks/useLanguage"

interface INavigationProps {}

export const Navigation: FC<INavigationProps> = () => {
	const navigate = useNavigate()
	const { t } = useLanguage()

	return (
		<div className="ms-auto flex gap-4 items-center">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuLink
							onClick={() => {
								navigate({ to: "/" })
							}}
							className="align-middle flex flex-row cursor-pointer font-medium"
						>
							{t("navbar.kitties")}
						</NavigationMenuLink>
					</NavigationMenuItem>
					<CatalogNavigation />
					<ProfileNavigation />
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}

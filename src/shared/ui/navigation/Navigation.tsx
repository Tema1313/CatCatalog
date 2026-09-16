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

interface INavigationProps {}

export const Navigation: FC<INavigationProps> = () => {
	const navigate = useNavigate()

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
							Котики
						</NavigationMenuLink>
					</NavigationMenuItem>
					<CatalogNavigation />
					<ProfileNavigation />
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}

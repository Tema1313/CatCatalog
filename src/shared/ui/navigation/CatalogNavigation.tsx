import { useLanguage } from "@/i18n/hooks/useLanguage"
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu"
import { useNavigate, type FileRoutesByPath } from "@tanstack/react-router"
import type { FC } from "react"

interface ICatalogNavigayionProps {}

export const CatalogNavigation: FC<ICatalogNavigayionProps> = () => {
	const navigate = useNavigate()
	const { t } = useLanguage()
	const menu: { title: string; url: keyof FileRoutesByPath }[] = [
		{ title: t("navbar.colors"), url: "/catalogs/colors" },
		{ title: t("navbar.breeds"), url: "/catalogs/breeds" },
		{ title: t("navbar.coats"), url: "/catalogs/coats" },
	]

	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>{t("navbar.catalogs")}</NavigationMenuTrigger>
			<NavigationMenuContent>
				{menu.map((item) => (
					<NavigationMenuLink
						key={item.url}
						className="align-middle flex flex-row  cursor-pointer"
						onClick={() => {
							navigate({ to: item.url })
						}}
					>
						<div>{item.title}</div>
					</NavigationMenuLink>
				))}
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}

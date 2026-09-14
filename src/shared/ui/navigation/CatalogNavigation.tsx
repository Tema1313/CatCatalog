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
	const menu: { title: string; url: keyof FileRoutesByPath }[] = [
		{ title: "Цвета", url: "/catalogs/colors" },
		{ title: "Породы", url: "/catalogs/breeds" },
		{ title: "Шёрстки", url: "/catalogs/coats" },
	]

	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>Каталоги</NavigationMenuTrigger>
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

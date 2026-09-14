import { useAuth } from "@/shared/auth/hooks/useAuth"
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu"
import { LogOut } from "lucide-react"
import type { FC } from "react"

interface IProfileNavigationProps {}

export const ProfileNavigation: FC<IProfileNavigationProps> = () => {
	const auth = useAuth()

	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>{auth.login}</NavigationMenuTrigger>
			<NavigationMenuContent>
				<NavigationMenuLink onClick={() => auth.resetLogin()} className="align-middle flex flex-row cursor-pointer ">
					<LogOut /> Выход
				</NavigationMenuLink>
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}

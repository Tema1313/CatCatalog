import { ThemeProvider } from "@/app/providers/theme-provider"
import type { Language } from "@/i18n"
import { FiltersSchema } from "@/pages/cats/ui/Filters"
import { Auth } from "@/shared/auth/ui/Auth"
import { AppLayout } from "@/shared/ui/layouts/AppLayout"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import z from "zod"

const RootLayout = () => {
	return (
		<ThemeProvider>
			<AppLayout>
				<Auth>
					<Outlet />
				</Auth>
			</AppLayout>
		</ThemeProvider>
	)
}

export const Route = createRootRoute({
	component: RootLayout,
	validateSearch: FiltersSchema.extend({
		locale: z.enum(["ru", "en"]).default((localStorage.getItem("e-cat-catalog-language") as Language) || "ru"),
	}),
})

import { USER_ROLE } from "@/constants/roles";
import { DrawerItem, UserRole } from "@/types";

// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const drawerItems = (role: UserRole) => {
	const roleMenus: DrawerItem[] = [];

	switch (role) {
		case USER_ROLE.ADMIN:
			roleMenus.push(
				{
					title: "Dashboard",
					path: `${role}`,
					icon: DashboardIcon,
				},
				{
					title: "User Management",
					path: `${role}/manage-users`,
					icon: ManageAccountsIcon,
				}
			);
			break;

		default:
			break;
	}

	return [...roleMenus];
};

import { Code } from "@/components/atoms/Code";
import { Flex } from "@/components/atoms/styles/Flex";
import { Typography } from "@/components/atoms/Typography";
import { Link } from "expo-router";

export default function HelpScreen() {
	return (
		<Flex column alignItems="stretch" padding={30} gap={20}>
			<Typography fontSize={30} fontWeight={"900"}>
				Connect Guide
			</Typography>
			<Typography fontSize={20}>
				1. You need to install django-admin-api to your project.
			</Typography>
			<Code copyOnPress>pip install django-admin-api</Code>
			<Typography fontSize={20}>
				2. Add django-admin-api to applications list.
			</Typography>
			<Code copyOnPress>
				INSTALLED_APPS = [{"\n"}
				{"    "}...{"\n"}
				{"    "}'django-admin-api',
				{"\n"}
				{"    "}...
				{"\n"}]
			</Code>
			<Typography fontSize={20}>3. Add django-admin-api urls.</Typography>
			<Code copyOnPress>
				urlpatterns = [{"\n"}
				{"    "}path("admin/", include('admin.site.urls')),{"\n"}
				{"    "}path("admin-api/", include('admin-api.urls')),{"\n    "}...
				{"\n"}]
			</Code>
			<Typography fontSize={20}>
				4. Make migrations and reload an app.
			</Typography>
			<Code copyOnPress>python manage.py migrate</Code>
			<Typography fontSize={20}>5. Done.</Typography>
			<Link
				style={{
					fontSize: 20,
					fontWeight: "bold",
					textDecorationLine: "underline",
				}}
				href="/connect"
			>
				Click here to connect!
			</Link>
		</Flex>
	);
}

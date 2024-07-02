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
				1. You need to install django-api-admin to your project.
			</Typography>
			<Code copyOnPress>pip install django-api-admin</Code>
			<Typography fontSize={20}>
				2. Add django-api-admin to applications list.
			</Typography>
			<Code copyOnPress>
				INSTALLED_APPS = [{"\n"}
				{"    "}...{"\n"}
				{"    "}'django.contrib.admin',{"\n"}
				{"    "}'rest_framework',{"\n"}
				{"    "}'django_api_admin',
				{"\n"}
				{"    "}...
				{"\n"}]
			</Code>
			<Typography fontSize={20}>3. Add django-api-admin urls.</Typography>
			<Code copyOnPress>
				urlpatterns = [{"\n"}
				{"    "}path("admin/", include('admin.site.urls')),{"\n"}
				{"    "}path("api_admin/", include('admin-api.urls')),{"\n    "}...
				{"\n"}]
			</Code>

			<Typography fontSize={20}>4. Done.</Typography>
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

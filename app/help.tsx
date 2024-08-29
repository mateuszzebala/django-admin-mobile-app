import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { ROUTES } from "./routes";
import { Code, Flex, Typography } from "@/components/atoms";

export default function HelpScreen() {
  return (
    <Flex column alignItems="stretch" padding={30} gap={20}>
      <Typography fontSize={30} fontWeight={"900"}>
        Connect Guide
      </Typography>
      <Typography fontSize={20}>
        1. You need to install extension to your project.
      </Typography>
      <Link
        style={{ fontWeight: "bold", textDecorationLine: "underline" }}
        href={"https://pypi.org/project/django-admin-page-api/"}
      >
        https://pypi.org/project/django-admin-page-api/
      </Link>
      <Code copyOnPress>pip install django-admin-page-api</Code>
      <Typography fontSize={20}>
        2. Add django_admin_page_api to applications list. After
        'django.contrib.admin' app.
      </Typography>
      <Code copyOnPress>
        INSTALLED_APPS = [{"\n"}
        {"    "}...{"\n"}
        {"    "}'django.contrib.admin',{"\n"}
        {"    "}'django_admin_page_api',
        {"\n"}
        {"    "}...
        {"\n"}]
      </Code>
      <Typography fontSize={20}>
        3. Include app in urls on route admin-api/
      </Typography>
      <Code copyOnPress>
        from django_admin_page_api import sites {"\n"}
        {"\n"}
        urlpatterns = [{"\n"}
        {"    "}path("admin-api/", sites.urls),{"\n    "}...
        {"\n"}]
      </Code>

      <Typography fontSize={20}>
        4. After this actions you can use this app to connect.
      </Typography>

      <Link
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textDecorationLine: "underline",
          color: Colors.django.primary,
        }}
        href={ROUTES.CONNECT()}
      >
        Click here to connect!
      </Link>
    </Flex>
  );
}

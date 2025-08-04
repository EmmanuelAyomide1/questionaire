import { Outlet, useNavigation } from "react-router";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && <Outlet />}
    </div>
  );
}

export default AppLayout;

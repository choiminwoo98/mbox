import useUser, { UserWithAccount } from "@libs/client/useUser";
import type { NextPage } from "next";

export interface BaseProps {
  user: UserWithAccount | undefined;
}

interface LayoutProps {
  FC: React.FC<BaseProps>;
}

const Layout: NextPage<LayoutProps> = ({ FC }) => {
  const { user } = useUser();
  return (
    <div className="flex">
      <FC user={user} />
    </div>
  );
};

export default Layout;

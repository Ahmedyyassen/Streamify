import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

type Props = {
  showSidebar?: boolean;
  children: React.ReactNode;
};
const Layout = ({ children,showSidebar = false }: Props) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout
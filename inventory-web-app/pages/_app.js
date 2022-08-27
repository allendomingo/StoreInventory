import { useState } from "react"
import { useRouter } from 'next/router'
import 'styles/globals.css'
import { Layout } from 'antd';
import Sidebar from 'components/shell/Sidebar';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Add pages we want the sidebar displayed here
  const pagesWithSidebar = ['/'];
  const currentPage = router.pathname;
  const hasSidebar = pagesWithSidebar.includes(currentPage);

  return (
    <>
      <Layout className="flex justify-center" hasSider={hasSidebar}>
        <Sidebar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        <div style={{ paddingLeft: !sidebarCollapsed ? "15%" : "5%" }}>
          <Component {...pageProps} />
        </div>
      </Layout>
    </>
  )
}

export default MyApp

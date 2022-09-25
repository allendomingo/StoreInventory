import { useRouter } from 'next/router'
import 'styles/globals.css'
import { Layout } from 'antd';
import Sidebar from 'components/shell/Sidebar';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Add pages we want the sidebar displayed here
  const pagesWithoutSidebar = ['/login'];
  const currentPage = router.asPath;
  const hasSidebar = !pagesWithoutSidebar.includes(currentPage);

  // Placeholder user object.
  // Replace this when integrating login API
  const user = {
    firstName: "John",
    lastName: "Doe",
    role: "user"
  }

  return (
    <>
      <Layout>
        {hasSidebar && <Sidebar user={user} />}
        <div className="w-full h-screen flex flex-col justify-center items-center overflow-y-scroll pt-40">
          <Component {...pageProps} />
        </div>
      </Layout>
    </>
  )
}

export default MyApp

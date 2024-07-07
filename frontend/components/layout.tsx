import Header from './Header'

function Layout({ children }:any) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout;

import Layout from "./Layout"
import App from "./App"
import Contact from './Pages/Contact'
import Gallery from './Pages/Gallery'
import Sponsorship from './Pages/Sponsorship'
import TeamHistory from './Pages/TeamHistory'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'gallery',
        element: <Gallery />
      },
      {
        path: 'sponsorship',
        element: <Sponsorship />
      },
      {
        path: 'teamhistory',
        element: <TeamHistory />
      }
    ]
  }
]

export default routes;
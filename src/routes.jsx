import Layout from "./Layout"
import App from "./App"
import ContactPage from './Pages/ContactPage'
import GalleryPage from './Pages/GalleryPage'
import SponsorPage from './Pages/SponsorPage'
import TeamHistoryPage from './Pages/TeamHistoryPage'

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
        element: <ContactPage />
      },
      {
        path: 'gallery',
        element: <GalleryPage />
      },
      {
        path: 'sponsorship',
        element: <SponsorPage />
      },
      {
        path: 'teamhistory',
        element: <TeamHistoryPage />
      }
    ]
  }
]

export default routes;
import App from "./src/App"
import About from "./src/components/About/About"

const routes = [
  {
    path: '/',
    element: <App/>,
  },
  {
    path: 'about',
    element: <About/>
  }
]

export default routes;
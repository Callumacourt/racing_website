import App from "./src/App"
import About from "./src/About"

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
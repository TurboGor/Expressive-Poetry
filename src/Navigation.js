/* Styles */
import './styles/Navigation.css';
/* Components */
import PoemForm from './pages/PoemForm'
import HomePage from './pages/HomePage'
import PoemPage from './pages/PoemPage'
/* React router */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/newpoem">New Poem</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/newpoem">
              <NewPoem />
            </Route>
            <Route path="/poem/:id">
              <PoemPage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  )
}

function Home() {
  return <HomePage/>
}

function NewPoem() {
  return <PoemForm/>
}

export default App;

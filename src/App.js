import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Acceuil } from './component/acceuil/Acceuil';
import Gallerie from './component/gallerie/Gallerie';
import { Main } from './component/acceuil/Acceuil';
import Dashbord from './component/dashbord/Dashbord';

function App() {
  return (
    <Router>
      <>
        <Route path='/' exact render={() => (
          <>
            <div className="App">
              <Main />
              <div className='option-content'>
                <Acceuil />
              </div>
            </div>
          </>
        )} />
        <Route path='/Gallerie' component={Gallerie} />
        <Route path='/Dashbord' component={Dashbord} />
      </>
    </Router>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Acceuil } from './component/acceuil/Acceuil';
import Gallerie from './component/gallerie/Gallerie';
import Dashbord from './component/dashbord/Dashbord';
import Catalogue from './component/catalogue/Catalogue';
import Souscrire from './component/souscrire/Souscrire';
import AdminLogin from './component/admin/AdminLogin';
import Oldcommand from './component/dashbord/commande/OldCommand';
import InputForms from './component/order/InputForms';
import MediaQuery from 'react-responsive';

function App() {
  return (
    <Router>
      <>
        <Route path='/' exact render={() => (
          <>
            <div className="App">
              {/* <div className='app-main'> */}
              <Acceuil />
              {/* </div> */}
              {/* <MediaQuery minWidth={587} maxWidth={20000}>
                <div className='option-content'>
                  <InputForms />
                </div>
              </MediaQuery> */}
            </div>
          </>
        )} />
        <Route path='/Gallerie' component={Gallerie} />
        <Route path='/Dashbord' component={Dashbord} />
        <Route path='/Admin' component={AdminLogin} />
        <Route path='/Catalogue' component={Catalogue} />
        <Route path='/Souscrire' component={Souscrire} />
        <Route path='/Anciennes-commandes' component={Oldcommand} />
        <MediaQuery minWidth={300} maxWidth={1024}>
          <Route path='/passer-une-commande' component={InputForms} />
        </MediaQuery>
      </>
    </Router>
  );
}

export default App;

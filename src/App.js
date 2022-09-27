import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SearchBus from "./pages/search/SearchBus";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import AvailBuses from "./pages/search/AvailBuses";
import Email from "./pages/EmailTicket/Email";
import Cancel from "./pages/CancelTicket/Cancel";
import Showticket from "./pages/showTicket/Showticket";
import Addbus from "./pages/Admin/Addbus";
import Addbusroute from "./pages/Admin/Addbusroute";
import { useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import Editbus from "./pages/Admin/EditBus/Editbus";
import Editroute from "./pages/Admin/EditRoute/Editroute";
import GMaps from "./pages/GMaps/GMaps";


function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  // on mount -> check role 
  // if role is admin -> allow all routes
  // else don't
  useEffect(() => {
    if(isAdmin !== localStorage.getItem('role')) {
      setIsAdmin(localStorage.getItem('role'))
    }
  })

  return (
    < >
      <BrowserRouter>
        <div >
          <Header />
          <div style={{marginTop: '100px'}}>
            <Switch>
            <Route exact path="/" component={SearchBus} />
              <Route  path="/login" component={Login} />
              
              
              <Route path="/signup" component={Register} />
              <Route path="/email" component={Email}/>
              <Route path="/cancel" component={Cancel}/>
              <Route path="/showticket" component={Showticket} />
              {isAdmin && <Route path="/Addbus" component={Addbus} />}
              {isAdmin && <Route path="/Addbusroute" component={Addbusroute} />}
              {isAdmin && <Route path="/EditBus" component={Editbus} />}
              {isAdmin && <Route path="/Editroute" component={Editroute} />}
              {isAdmin && <Route path="/GMaps" component={GMaps} />}
              
            </Switch>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

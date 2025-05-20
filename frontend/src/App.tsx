import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SuperMasterForm from './pages/admin/SuperMasterForm';
import Downline from './components/clientlist/Downline/Downline';
import LoginPage from './pages/Login';
import MasterForm from './pages/admin/MasterForm';
import Profile from './pages/Profile';
import ClientForm from './pages/admin/ClientForm';
import MasterList from './components/clientlist/Downline/MasterList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Home />} />

        <Route path="/create-super-master" element={<SuperMasterForm />} />
         <Route path="/create-master" element={<MasterForm />} />
         <Route path="/create-client" element={<ClientForm />} />
         <Route path='/downline' element={<Downline/>}/>
         <Route path='/profile' element={<Profile/>}/>
        {/* <Route path="/downline" element={<Downline />} /> */}
        <Route path="/master/list" element={<MasterList />} />
      </Routes>
    </Router>
  );
}

export default App;
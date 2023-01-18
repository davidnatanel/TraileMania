
import { Route, Routes } from 'react-router';
import Home from './Pages/Home/Home';
import Landing from './Pages/Landing/Landing';

import Favorite from './Pages/Favorite/Favorite';
import DetailCard from './Pages/DetailCard/DetailCard';

function App() {


  return (
    <Routes>

      <Route path='/home' element={<div><Home /></div>} exact />

      <Route index path='/' element={<Landing />} exact />
      <Route path='/favorite' element={<Favorite />} exact />
      <Route path='/detailtraile/:id' element={<DetailCard />} exact />

    </Routes>

  );
}




export default App;

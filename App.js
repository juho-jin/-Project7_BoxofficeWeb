import Boxmv from './components/Boxmv.jsx';
import Boxoffice from './components/Boxoffice.jsx';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Boxoffice />} />
        <Route path='/mv' element={<Boxmv />} />
      </Routes>
    </>
  );
}

export default App;
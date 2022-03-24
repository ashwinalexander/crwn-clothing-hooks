import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';

const Shop = () => {
  return (
    <div>
      <div>
        <h2>I am the shop component</h2>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path='shop' element={<Shop />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

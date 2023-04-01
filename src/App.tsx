import { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./hook";
import { fetchHeroes } from './store/slice/heroes';
import Routes from "./pages/routes";

function App() {

  const dispatch = useAppDispatch();


  useEffect(() => {
     dispatch(fetchHeroes())
  }, [])



  return (

        <BrowserRouter>
          <Routes />
        </BrowserRouter>
  )
}

export default App;

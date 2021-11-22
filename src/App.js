import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
// import Main from './ShopingCart/Main'
import { BrowserRouter } from 'react-router-dom';
import ToDo from './FullToDoList/ToDo';
function App() {
  return (
    <>
    
      {/* <BrowserRouter> */}
       {/* <Main/> */}
       <ToDo/>
    {/* </BrowserRouter> */}
    </>
  );
}

export default App;

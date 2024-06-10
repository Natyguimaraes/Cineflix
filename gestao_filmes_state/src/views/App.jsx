import '../views/styles/index.css'
import Topo from './components/Topo'
import FormCadastro from './components/CadastroFilme';
import ReadFilme from './components/readFilme';
import Home from './components/home';

function App() {

  return (
    <>
      <div>
       <Topo/>
       <Home />
      </div>
    </>
  );
}

export default App;

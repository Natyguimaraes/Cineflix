import '../views/styles/index.css'
import Topo from './components/Topo'
import FormCadastro from './components/CadastroFilme';
import ReadFilme from './components/readFilme';

function App() {

  return (
    <>
      <div>
       <Topo/>
       <FormCadastro />
       <ReadFilme />
      </div>
    </>
  );
}

export default App;

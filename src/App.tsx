import { BrowserRouter } from 'react-router-dom'
import Pages from './components/Pages'

const App = () => {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
}

export default App;

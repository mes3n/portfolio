import { BrowserRouter } from 'react-router-dom'
import Pages from './components/pages/Pages'

const App = () => {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
}

export default App;

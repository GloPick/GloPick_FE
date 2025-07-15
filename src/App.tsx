import Router from './router/Router';
import AuthModal from './components/auth/AuthModal';

function App() {
  return (
    <>
      <Router>
        <AuthModal />
      </Router>
    </>
  );
}

export default App;

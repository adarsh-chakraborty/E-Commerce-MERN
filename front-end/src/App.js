import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h2>Hello</h2>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;

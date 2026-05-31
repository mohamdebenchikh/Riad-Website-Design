import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Story from './sections/Story';
import FeaturedSuites from './sections/FeaturedSuites';
import Dining from './sections/Dining';
import Experiences from './sections/Experiences';
import BookingPlunge from './sections/BookingPlunge';
import GuestBook from './sections/GuestBook';
import Footer from './sections/Footer';

function App() {
  useLenis();

  return (
    <div>
      <Navigation />
      <Hero />
      <Story />
      <FeaturedSuites />
      <Dining />
      <Experiences />
      <BookingPlunge />
      <GuestBook />
      <Footer />
    </div>
  );
}

export default App;

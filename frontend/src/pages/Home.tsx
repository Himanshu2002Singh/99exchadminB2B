
import Header from '../components/Header';
import MarqueeBanner from '../components/MarqueeBanner';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-20 sm:pb-0">
      <Header/>
      <div className="text-center py-2 md:py-4">
        <h1 className="text-2xl font-bold">Home</h1>
      </div>
      <MarqueeBanner/>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default Home;
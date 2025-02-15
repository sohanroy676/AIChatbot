import Chatbot from "./Chatbot";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <Chatbot />
      </div>
      <Sidebar />
      <Footer />
    </div>
  );
}

export default App;

import { Toaster } from "react-hot-toast";
import Footer from "./Components/Footer/Footer";
import Form from "./Components/Form/Form";
function App() {
  return (
    <>
      <Form />
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;

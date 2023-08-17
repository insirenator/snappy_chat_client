import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SetAvatar from "./pages/SetAvatar";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import BuyAvatars from "./pages/BuyAvatars";
import PaymentSuccess from "./pages/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/setAvatar",
    element: <SetAvatar />
  },
  {
    path: "/buyAvatars",
    element: <BuyAvatars />
  },
  {
    path: "/chat",
    element: <Chat />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/paymentSuccess",
    element: <PaymentSuccess />
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App

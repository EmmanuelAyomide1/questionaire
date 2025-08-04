import { createBrowserRouter, RouterProvider } from "react-router";

import { QuestionProvider } from "./contexts/QuestionContext";
import Question, {
  loader as questionLoader,
} from "./features/questions/Question";
import Home from "./ui/Home";
import Loader from "./ui/Loader";
import NotFound from "./ui/NotFound";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    index: true,
    Component: Home,
  },
  {
    path: "questions",
    Component: Question,
    loader: questionLoader,
    hydrateFallbackElement: <Loader />,
    errorElement: <Error />,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

function App() {
  return (
    <QuestionProvider>
      <RouterProvider router={router} />
    </QuestionProvider>
  );
}

export default App;

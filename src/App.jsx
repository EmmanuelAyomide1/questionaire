import { createBrowserRouter, RouterProvider } from "react-router";

import { QuestionProvider } from "./contexts/QuestionContext";
import Question, {
  loader as questionLoader,
} from "./features/questions/Question";
import Home from "./ui/Home";
import Loader from "./ui/Loader";

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

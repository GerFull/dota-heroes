import { Routes, Route } from "react-router-dom";

import Error from "./Error";
import HomePage from "./homePage/homePage";
import HeroPage from "./heroPage/heroPage";




export default () => (
   <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<HeroPage />} />
      <Route path="*" element={<Error />} />
   </Routes>
)
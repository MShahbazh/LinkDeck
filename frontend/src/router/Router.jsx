import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import { Login, Main, Sign, Dashboard, Preview, Profile } from "../components";
import Protect from "./Protect";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />

      <Route path="/profile/:username" element={<Profile />} />
      <Route element={<Protect />}>
        <Route path="" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/preview" element={<Preview />} />
      </Route>
    </Route>,
  ),
);

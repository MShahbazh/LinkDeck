import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./Layout";
import { Login, Main, Sign, Dashboard, Preview, Profile } from "../components";
import Protect from "./Protect";

// 🪵 LOG 2: Inspect the imported component references
console.log("🗺️ ROUTER FILE: Routes are compiling.");
console.log("Is Profile component defined?", !!Profile);
console.log("Type of Profile:", typeof Profile);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route element={<Protect />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/preview" element={<Preview />} />
      </Route>
    </Route>,
  ),
);

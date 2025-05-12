"use client";
import { Element } from "react-scroll";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Profile from "./Profile";
import Events from "@/components/Events";

export default function HomePage() {
  return (
    <>
      <Header />
      <Profile />
      <Element name="events">
        <Events />
      </Element>
      <Footer />
    </>
  );
}

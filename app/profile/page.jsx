import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import Profile from "./Profile";
import Events from "@/components/Events";

export default function page() {
  return (
    <>
      <Header />
      <Profile />
      <Events />
      <Footer />
    </>
  );
}

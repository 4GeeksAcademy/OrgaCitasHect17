import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { HeroScroll } from "../components/HeroScroll";
import { HistoryScroll } from "../components/HistoryScroll";
import { LoginModal } from "../components/LoginModal";

export const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <HeroScroll />
      <HistoryScroll />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};
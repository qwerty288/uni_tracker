import React from 'react'
import Setup from "./components/Setup"
import Chart from "./components/Chart"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/chart/" element={<Chart />} />
      <Route path="/setup/" element={<Setup />} />
    </Routes>
  )
}

export default App    
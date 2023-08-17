import React from 'react';
import logo from './logo.svg';
import './App.css';
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import NominationBody from "./components/NominationBody";
import DirectionBody from './components/DirectionBody';
import Footer from "./components/Footer";
import { 
	Routes,
	Route,
	Link
 } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Wrapper>
					<Header />
						<Routes>
							<Route path="/" element={<DirectionBody />} />
							<Route path="/cultural" element={<NominationBody id={1}/>} />
							<Route path="/science" element={<NominationBody id={2}/>} />
							<Route path="/social" element={<NominationBody id={3}/>} />
							<Route path="/sport" element={<NominationBody id={4}/>} />
							<Route path="/educational" element={<NominationBody id={5}/>} />
						</Routes>
					<Footer />
				</Wrapper>
    </div>
  );
}

export default App;

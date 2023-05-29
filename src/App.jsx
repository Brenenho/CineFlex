import styled from "styled-components"
import axios from 'axios';
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";



export default function App() {

    axios.defaults.headers.common['Authorization'] = 'Kps7jJcX6bsjiTXoVfNJrPap';
    const [pedido, setPedido] = useState(undefined);
    const [sessao, setSessao] = useState(undefined);
    const [movie, setMovie] = useState(undefined);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");

    const [assentosSelecionados, setAssentosSelecionados] = useState([]);
    const [assentosIdSelecionados, setIdAssentosSelecionados] = useState([]);
    

    return (
        <>
           <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>

                <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/sessoes/:idFilme' element={<SessionsPage />} />
                <Route path='/assentos/:idSessao' element={<SeatsPage setPedido={setPedido} sessao={sessao} setSessao={setSessao} movie={movie} setMovie={setMovie} nome={nome} setNome={setNome} cpf={cpf} setCpf={setCpf} assentosSelecionados={assentosSelecionados} setAssentosSelecionados={setAssentosSelecionados} assentosIdSelecionados={assentosIdSelecionados} setIdAssentosSelecionados={setIdAssentosSelecionados} />} />
                <Route path='/sucesso' element={<SuccessPage setPedido={setPedido} sessao={sessao} setSessao={setSessao} movie={movie} setMovie={setMovie} nome={nome} setNome={setNome} cpf={cpf} setCpf={setCpf} assentosSelecionados={assentosSelecionados} setAssentosSelecionados={setAssentosSelecionados} assentosIdSelecionados={assentosIdSelecionados} setIdAssentosSelecionados={setIdAssentosSelecionados} />} /> 
                     
                     
                     
                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100vw;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`

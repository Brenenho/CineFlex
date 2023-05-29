import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function SuccessPage(props) {

    const navigate = useNavigate();

    const { pedido, setPedido } = props;
    const { sessao, setSessao } = props
    const { movie, setMovie } = props
    const { nome, setNome } = props
    const { cpf, setCpf } = props
    const { assentosSelecionados, setAssentosSelecionados } = props
    const { assentosIdSelecionados, setIdAssentosSelecionados } = props

    function voltar() {
        
        setSessao(undefined)
        setMovie(undefined)
        setNome("")
        setCpf("")
        setAssentosSelecionados([])
        setIdAssentosSelecionados([])
        navigate('/')
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{movie.title}</p>
                <p>{`${sessao.day.date} - ${sessao.name}`}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>


                {assentosSelecionados.map(assentos => (

                    <p>{`Assento ${assentos.name}`}</p>

                )
                )}

            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>{`Nome: ${nome}`}</p>
                <p>{`CPF: ${cpf}`}</p>
            </TextContainer>

            <button data-test="go-home-btn" onClick={voltar} >Voltar para Home</button>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    
    a {
        text-decoration: none;
        
    }
    button {
        margin-top: 50px;
        width: 225px;
        height: 42px;
        left: 74px;
        top: 622px;

        background: #E8833A;
        border-radius: 3px ;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content:center;
        text-align: center;
        letter-spacing: 0.04em;
        border:none;

        color: #FFFFFF;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }

    p {
        line-height: 0px
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 50px;
    strong {
        font-weight: bold;
        margin-bottom: 1px;
    }

    p {
        margin: 15px
    }
`
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


export default function SeatsPage(props) {
    const parametros = useParams();
    const navigate = useNavigate();
    console.log(parametros);

    const { sessao, setSessao } = props
    const { movie, setMovie } = props
    const { nome, setNome } = props
    const { cpf, setCpf } = props

    const { assentosSelecionados, setAssentosSelecionados } = props
    const { assentosIdSelecionados, setIdAssentosSelecionados } = props

    const handleAssentoClick = (assento) => {

        const isSelected = assentosSelecionados.includes(assento);
        if (assento.isAvailable == true) {

            if (isSelected) {

                setIdAssentosSelecionados(assentosIdSelecionados.filter(a => a !== assento.id));
                setAssentosSelecionados(assentosSelecionados.filter(a => a !== assento));
            } else {

                setIdAssentosSelecionados([...assentosIdSelecionados, assento.id]);
                setAssentosSelecionados([...assentosSelecionados, assento]);
                console.log(assentosIdSelecionados)
            }
        } else {
            alert("O assento não está disponível")
        }
    }


    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`;

        const promise = axios.get(url);

        promise.then(resposta => {
            console.log(resposta.data);
            setSessao(resposta.data)
            setMovie(resposta.data.movie)

        });
        promise.catch(erro => console.log(erro.response.data));

    }, []);

    if (movie === undefined) {
        return <div>Carregando.....</div>
    }

    function addPedido(e) {
        // prevenindo que o comportamento padrão ( default) atualizar a pagina não aconteça
        e.preventDefault();

        const novaImagem = { ids: assentosIdSelecionados, name: nome, cpf: cpf }

        const URL_API = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";

        const promise = axios.post(URL_API, novaImagem);

        promise.then(resposta => {

            navigate('/sucesso');
            console.log(resposta)

        });

        promise.catch(erro => {
            const { mensagem } = erro.response.data;
            alert(mensagem);
        });

    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>

                {sessao.seats.map(assentos => (

                    <SeatItem isAvailable={assentos.isAvailable} isSelected={assentosSelecionados.includes(assentos)} key={assentos.name} onClick={() => handleAssentoClick(assentos)}>{assentos.name}</SeatItem>

                )
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle status='selecionado' />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status='disponivel' />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status='indisponivel' />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>
            <form onSubmit={addPedido}>
                <FormContainer>
                    Nome do Comprador:
                    <input
                        placeholder="Digite seu nome..."
                        required
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    CPF do Comprador:
                    <input
                        placeholder="Digite seu CPF..."
                        required
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />

                    <button type="submit" disabled={assentosSelecionados.length > 0 ? false : true} >Reservar Assento(s)</button>

                </FormContainer>
            </form>
            <FooterContainer>
                <div>
                    <img src={movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movie.title}</p>
                    <p>{`${sessao.day.weekday} - ${sessao.name}`}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
        width: 225px;
        height: 42px;
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
        margin-top: 3px;
        color: #FFFFFF;
        border: none

        background: #E8833A;
        border-radius: 3px;
    }
    input {
        width: calc(100vw - 60px);
        
        height: 51px;
        left: 24px;
        top: 497px;
        

        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        font-family: 'Roboto';
        font-size: 18px;
        margin-bottom:10px;
        padding-left: 15px;
        box-sizing: border-box



        ::placeholder {
        font-family: 'Roboto';
        font-style: italic;
        
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;

        color: #AFAFAF;

    }

    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${({ status }) => status === 'selecionado' ? ' #0E7D71' : status === 'disponivel' ? '#7B8B99' : '#F7C52B'};;         // Essa cor deve mudar
    background-color: ${({ status }) => status === 'selecionado' ? ' #1AAE9E' : status === 'disponivel' ? '#C3CFD9' : '#FBE192'};;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => (props.isAvailable == false ? `#F7C52B` : props.isSelected ? `#0E7D71` : `#7B8B99`)};         // Essa cor deve mudar
    background-color: ${props => (props.isAvailable == false ? `#FBE192` : props.isSelected ? `#1AAE9E` : `#C3CFD9`)};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`


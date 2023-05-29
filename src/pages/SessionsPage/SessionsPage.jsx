import { useParams } from "react-router-dom"
import styled from "styled-components"
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";



export default function SessionsPage(props) {
    const parametros = useParams();
    console.log(parametros);

    const [sessao, setSessao] = useState(undefined);
    const [days, setDays] = useState(undefined);
    const [horarios, setHorarios] = useState(undefined);
    const {setPedido} = props;


    useEffect( () => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametros.idFilme}/showtimes`;
    
        const promise = axios.get(url);
        
        promise.then( resposta => {
          
          setSessao(resposta.data)
          setDays(resposta.data.days)
        });
        promise.catch( erro => console.log(erro.response.data));
      }, []);

      if ( days === undefined){
        return <div>Carregando.....</div>
      }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                

            

                {days.map(day => (
                    
                    <SessionContainer>
                    {`${day.weekday} - ${day.date}`}
                    
                    <ButtonsContainer>
        
                        {day.showtimes.map(horarios => ( 
                    <Link to={`/assentos/${horarios.id}`} key={horarios.id} >
                    <button>{horarios.name}</button>
                    </Link>
                    
                )
                )}
                    </ButtonsContainer>
                </SessionContainer>
                    
                )
                )}

                

                
            </div>



            <FooterContainer>
                <div>
                    <img src={sessao.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessao.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        width: 83px;
        height: 43px;
        left: 23px;
        top: 227px;font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content:center;
        border: none;
        text-align: center;
        letter-spacing: 0.02em;

color: #FFFFFF;


        background: #E8833A;
        border-radius: 3px;
    }
    a {
        text-decoration: none;
    }
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
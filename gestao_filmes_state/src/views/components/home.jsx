import { useState } from 'react';
import '../styles/home.css';
import { FaFilm } from 'react-icons/fa'; // ícone de filme

function Home() {


return(

<div>
   
        <>
        <div className="Container-home">
            <div className="texto-home">
                <span> Bem-vindo ao CINEFLIX! Organize seus filmes de uma maneira ainda mais simples e do seu jeito! 😉 </span>
            </div>
            <div className="img-home">
                <img src="/posterHome.png" alt="Imagem de capa"/>
            </div>
        </div>
        </>
    
</div>


);
}
export default Home;


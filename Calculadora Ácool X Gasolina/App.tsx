import { useState, FormEvent } from "react";
import "./App.css";
import logoImg from "./assets/logo.png";

interface resultadoProps{
  titulo: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [resultado, setResultado] = useState<resultadoProps>()

  function calcular(event: FormEvent) {
    event.preventDefault();
    let calculo = (alcoolInput / gasolinaInput);
    console.log(calculo);

    if(calculo <= 0.7) {
      setResultado({
        titulo: "Compensa usar álcool!",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      });
    }
    else {
      setResultado({
        titulo: "Compensa usar gasolina!",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      });
    } 
  }
  function formatarMoeda(valor: number) {
    let valorFormatado = valor.toLocaleString("pt-br", 
    {
      style: "currency",
      currency: "BRL"
    })
    return valorFormatado;
  }

  return (
    <div>
      <main className="container">
        <img 
          className="logo" 
          src={logoImg} 
          alt="Logo da calculadora de gasolina ou alcool"
        />
        <h1 className="titulo">Qual melhor opção</h1>

        <form className="formulario" onSubmit={calcular}>
          <label>Alcool (preço por litro):</label>
          <input 
            type="number"
            className="input" 
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={alcoolInput}
            onChange={ (e) => setAlcoolInput(Number(e.target.value)) }
          />
          <label>Gasolina (preço por litro):</label>
          <input 
            type="number"
            className="input" 
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={gasolinaInput}
            onChange={ (e) => setGasolinaInput(Number(e.target.value))}
          />

          <input className="botao" type="submit" value="Calcular"/>
        </form>

        {resultado && Object.keys(resultado).length > 0 && (
          <section className="resultado">
            <h2 className="titulo_resultado">{resultado.titulo}</h2>
            <span>Álcool {resultado.alcool}</span>
            <span>Gasolina {resultado.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

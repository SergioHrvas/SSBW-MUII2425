import './App.css'

import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

  //VERSION SIN COMPONENTES Y SIN TAILWIND (TAREA 9)

function App() {
  let number = Math.floor(Math.random() * 10) + 1
    
  let numero = 0

  function handleAcierto() {
    if (numero == number) {
      alert("Has acertado el número")
    } else if (numero < number) {
      alert("El número es mayor")
    } else if (numero > number) {
      alert("El número es menor")
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    numero = parseInt(event.target.value)
    console.log("El número es " + numero)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
                <div className="flex flex-row items-center space-x-4">
                <Input className="w-90" placeholder='Introduzca un número entre uno y 10' type="number" onChange={handleChange}></Input>
                <Button onClick={handleAcierto}>Adivinar</Button>
                </div>
      </div>
    </>
  )
}

export default App

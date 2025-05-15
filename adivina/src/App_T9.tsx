import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

function App() {
  const [count, setCount] = useState(0)

  let number = Math.floor(Math.random() * 10) + 1
  
  console.log(number + " es el número a adivinar")

  
  //numero de estado
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

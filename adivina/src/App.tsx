import { useState } from 'react'
import './App.css'

import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert'
import Confetti from 'react-confetti-boom';

/** 
 * * === APARECE ===
 * ! 0 = no aparece
 * ? 1 = el número es mayor
 * ! 1 = el número es menor
 * ? 2 = has acertado
**/
function AlertaComponent({ aparece }: { aparece: number }) {
  if (aparece === 0){
    return <></>
  }
  else if (aparece === 1) {
    return (
      <Alert className="w-2/12" variant="destructive">
        <AlertTitle>El número es mayor</AlertTitle>
        <AlertDescription className='justify-center-safe'>Prueba otra vez</AlertDescription>
      </Alert>
    )
  }
  else if (aparece === -1) {
    return (
      <Alert className="w-2/12" variant="destructive">
        <AlertTitle>El número es menor</AlertTitle>
        <AlertDescription className='justify-center-safe'>Prueba otra vez</AlertDescription>
      </Alert>
    )
  }
  else if (aparece === 2) {
    return (
      <>
      <Confetti shapeSize={30}/>
      <Alert className="w-2/12">
        <AlertTitle>¡Enhorabuena!</AlertTitle>
        <AlertDescription className='justify-center-safe'>Has acertado el número</AlertDescription>
      </Alert>
      </>
    )
  }
  else {
    return (
      <>
          Error
      </>
    )
  }
}

  const numero_secreto = Math.floor(Math.random() * 10)

  //VERSION CON COMPONENTES Y CON TAILWIND (TAREA 10)
function App() {
  const [alerta, setAlerta] = useState(0)


  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const numero = parseInt(value)

    // console.log("El número es: " + numero)
    // console.log("El número secreto es: " + numero_secreto)
    

    if (numero == numero_secreto) {
      setAlerta(2)
    } else if (numero < numero_secreto) {
      setAlerta(1)
    } else if (numero > numero_secreto) {
      setAlerta(-1)
    }

    setTimeout(() => {
      event.target.value = ""}, 300);
        

  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh space-y-3">
        <Label htmlFor="email" className='text-2xl'>Adivina el numerito</Label>
        <Input onChange={handleChange} type="number" className="w-2/12" placeholder="Un número entre 0 y 9" />
        <AlertaComponent aparece={alerta}/>
      </div>
    </>
  )
}

export default App

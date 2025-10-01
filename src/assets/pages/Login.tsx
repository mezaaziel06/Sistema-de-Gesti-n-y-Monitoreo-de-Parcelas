import { useState } from "react"
import agricultor from "../images/agricultor.jpg"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    console.log("Login con:", email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 to-emerald-300">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-5xl">
        <div className="md:w-1/2 w-full relative">
          <img
            src={agricultor}
            alt="Agricultor"
            className="h-full w-full object-cover brightness-90"
          />
        </div>

        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Inicio de sesión</h2>
          <div className="space-y-5">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="text-right mt-2">
            <a href="#" className="text-sm text-emerald-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-emerald-600 text-white py-3 mt-6 rounded-lg hover:bg-emerald-700 transition-colors">
            Iniciar sesión
          </button>

          <p className="text-center text-sm mt-4 text-green-700">
            ¿No tienes cuenta?{" "}
            <a href="register" className="text-emerald-500 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

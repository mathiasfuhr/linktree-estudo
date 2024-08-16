import { Input } from "../../components/Input" 
import { FormEvent, useState } from "react" // e FormEvent para tipar o evento do formulário
import { Link, useNavigate } from 'react-router-dom' // useNavigate para navegação após login

import { auth } from '../../services/firebaseConnection' // Firebase auth para autenticação
import { signInWithEmailAndPassword } from 'firebase/auth' // Método de login com email e senha do Firebase
import { Loading } from "../../components/Loading"

export const Login = () => {
  // Estados para armazenar email e senha digitados pelo usuário
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('')
  
  // Estado para controlar o estado de carregamento (loading) durante o processo de login
  const [loading, setLoading] = useState(false)
  
  // useNavigate é usado para redirecionar o usuário após o login bem-sucedido
  const navigate = useNavigate()

  // Função chamada ao enviar o formulário de login
  function handleSubmit(e: FormEvent) {
    e.preventDefault() // Previne o comportamento padrão do formulário, que seria recarregar a página

    // Verifica se os campos de email e senha estão preenchidos
    if (email === '' || password === '') {
      alert('Preencha todos os campos') // Exibe alerta se algum campo estiver vazio
      return // Interrompe a função se os campos não estiverem preenchidos
    }

    setLoading(true) // Define o estado de loading como true para mostrar o componente de carregamento

    // Tenta realizar o login com email e senha utilizando o Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Login bem-sucedido!") // Exibe uma mensagem no console em caso de sucesso
        navigate('/admin', { replace: true }) // Redireciona o usuário para a página de admin após o login
      })
      .catch((error) => {
        console.error("Erro ao fazer login: ", error) // Exibe o erro no console se algo der errado
        alert("Erro ao fazer login") // Mostra uma mensagem de erro para o usuário
      })
      .finally(() => {
        setLoading(false) // Sempre redefine o estado de loading como false, independentemente do sucesso ou falha
      })
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col relative">
      {/* Condicional: Se loading for true, o componente Loading será exibido na tela */}
      {loading && <Loading />}

      <Link to='/'>
        {/* Logo do site com estilo personalizado */}
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev<span className="bg-gradient-to-r from-yellow-500 to-orange-700 bg-clip-text text-transparent">Link</span>
        </h1>
      </Link>

      {/* Formulário de login */}
      <form className="w-full max-w-xl flex flex-col px-2" onSubmit={handleSubmit}>
        {/* Campo de input para email */}
        <Input
          placeholder="Digite o seu email..."
          type="email"
          value={email} // Estado controlado por React, valor do input é armazenado no estado
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado de email conforme o usuário digita
        />

        {/* Campo de input para senha */}
        <Input
          placeholder="Digite sua senha..."
          type="password"
          value={password} // Estado controlado por React, valor do input é armazenado no estado
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado de senha conforme o usuário digita
        />

        {/* Botão de login */}
        <button
          type="submit" // Define o tipo do botão como submit, para enviar o formulário
          className={`h-9 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 cursor-pointer'} rounded border-0 text-lg font-medium text-white`}
          disabled={loading}> {/* Desabilita o botão enquanto o loading está ativo para evitar cliques múltiplos */}
          {loading ? 'Carregando...' : 'Acessar'} {/* Muda o texto do botão para 'Carregando...' quando o loading está ativo */}
        </button>
      </form>
    </div>
  )
}

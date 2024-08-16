import { ReactNode, useState, useEffect } from 'react' // Importando ReactNode para tipar os filhos do componente, useState e useEffect para controle de estado e efeitos colaterais
import { auth } from '../services/firebaseConnection' // Importando o serviço de autenticação do Firebase
import { onAuthStateChanged } from 'firebase/auth' // Função do Firebase que monitora mudanças no estado de autenticação do usuário
import { Navigate } from 'react-router-dom' // Componente para navegação condicional

// Definindo a interface das props que o componente Private aceita, garantindo que `children` seja um ReactNode (componente filho)
interface PrivateProps {
    children: ReactNode
}

// Componente de rota privada
export function Private({ children }: PrivateProps): ReactNode {
    // Estados locais para gerenciar o carregamento e se o usuário está autenticado ou não
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    // useEffect para monitorar as mudanças no estado de autenticação do Firebase
    useEffect(() => {
        // `onAuthStateChanged` observa o estado de autenticação do usuário
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Se o usuário estiver autenticado, armazenamos os dados no localStorage
                const userData = {
                    uid: user.uid,
                    email: user.email
                }
                localStorage.setItem('@reactlinks', JSON.stringify(userData))

                // Atualizamos o estado para indicar que o carregamento terminou e o usuário está autenticado
                setLoading(false)
                setSigned(true)
            }
            else {
                // Se o usuário não estiver autenticado, atualizamos o estado para indicar isso
                setLoading(false)
                setSigned(false)
            }
        })

        // Limpeza do efeito: remove o observador de mudanças no estado de autenticação quando o componente é desmontado
        return () => unsub()
    }, [])

    // Enquanto o estado de carregamento for verdadeiro, exibimos uma mensagem de "Carregando"
    if (loading) {
        return <h1>Carregando....</h1>
    }

    // Se o usuário não estiver autenticado (signed é falso), redirecionamos para a página de login
    if (!signed) {
        return <Navigate to="/login" />
    }

    // Se o usuário estiver autenticado, renderizamos os componentes filhos
    return (
        <>{children}</>
    )
}

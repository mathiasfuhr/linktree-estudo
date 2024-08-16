import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
// Importa as funções necessárias do Firebase Firestore: 'doc' para criar uma referência a um documento,
// 'getDoc' para obter os dados desse documento e 'setDoc' para definir ou atualizar os dados no Firestore.
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

export const Networks = () => {
  // Estados para armazenar os links das redes sociais
  const [instagram, setInstagram] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  // Hook useEffect para carregar os dados do Firestore quando o componente é montado
  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, 'social', "link") // Referência ao documento do Firestore
      getDoc(docRef) // Obtém o documento do Firestore
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            // Atualiza os estados com os dados do documento
            setInstagram(snapshot.data()?.instagram)
            setLinkedin(snapshot.data()?.linkedin)
            setGithub(snapshot.data()?.github)
            setWhatsapp(snapshot.data()?.whatsapp)
          }
        })
        .catch((error) => {
          console.log(error); // Lida com possíveis erros ao obter os dados
        })
    }
    loadLinks()
  }, []) // Dependência vazia, o efeito será executado apenas uma vez, quando o componente for montado

  function handleRegister(e: FormEvent) {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    // Atualiza os dados do documento no Firestore
    setDoc(doc(db, 'social', "link"), {
      instagram: instagram,
      linkedin: linkedin,
      github: github,
      whatsapp: whatsapp
    })
      .then(() => {
        console.log('Cadastrado com sucesso'); // Mensagem de sucesso
      })
      .catch((error) => {
        console.log(error) // Lida com possíveis erros ao salvar os dados
      })
  }

  // JSX para renderizar o formulário
  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header /> {/* Componente de cabeçalho */}
      <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>
      <form className="flex flex-col max-w-xl w-full px-3" onSubmit={handleRegister}>

        {/* Input para o link do Instagram */}
        <label htmlFor="instagram" className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
        <Input id="instagram" type="url" placeholder="Digite a URL do Instagram"
          value={instagram} onChange={e => setInstagram(e.target.value)}
        />

        {/* Input para o link do LinkedIn */}
        <label htmlFor="linkedin" className="text-white font-medium mt-2 mb-2">Link do Linkedin</label>
        <Input id="linkedin" type="url" placeholder="Digite a URL do Linkedin"
          value={linkedin} onChange={e => setLinkedin(e.target.value)}
        />

        {/* Input para o link do GitHub */}
        <label htmlFor="github" className="text-white font-medium mt-2 mb-2">Link do GitHub</label>
        <Input id="github" type="url" placeholder="Digite a URL do GitHub"
          value={github} onChange={e => setGithub(e.target.value)}
        />

        {/* Input para o link do WhatsApp */}
        <label htmlFor="whatsapp" className="text-white font-medium mt-2 mb-2">Link do WhatsApp</label>
        <Input id="whatsapp" type="url" placeholder="Digite a URL do WhatsApp"
          value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
        />

        {/* Botão para submeter o formulário */}
        <button className="bg-green-500 rounded-md h-10 font-medium text-white mt-5" type="submit">Salvar</button>
      </form>
    </div>
  )
}

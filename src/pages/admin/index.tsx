import { FormEvent, useState, useEffect } from "react"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { FiTrash } from "react-icons/fi"

import { } from '../../services/firebaseConnection'
import { db } from "../../services/firebaseConnection"
import {
  addDoc, //adicona um Id aleátorio/cria novo documento
  collection, //
  onSnapshot, //
  query, //
  orderBy, //
  doc, //
  deleteDoc //
} from "firebase/firestore"

interface LinkProps {
  id: string,
  name: string,
  url: string,
  bg: string,
  color: string
}
// Componente Admin
export const Admin = () => {
  // Estados locais para gerenciar os valores dos inputs
  const [nameInput, setNameInput] = useState('') // Nome do link
  const [urlInput, setUrlInput] = useState('') // URL do link
  const [colorInput, setColorInput] = useState('#ffffff') // Cor do texto do link
  const [bgColorInput, setBgColorInput] = useState('#000000') // Cor de fundo do link

  const [links, setLinks] = useState<LinkProps[]>([])



  useEffect(() => {
    const linksRef = collection(db, "links")
    const queryRef = query(linksRef, orderBy("created", "asc"))

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinkProps[];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })
      setLinks(lista);
    })

    // Limpeza do efeito: remove o observador de mudanças no banco de dados quando o componente é desmontado
    return () => unsub()

  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos")
      return
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: bgColorInput,
      color: colorInput,
      created: new Date()
    })
      .then(() => {
        setNameInput('') // Limpa o campo de nome do link
        setUrlInput('') // Limpa o campo de URL do link
        console.log('Cadastrado com sucesso');

      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco" + error)
      })


  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      {/* Componente Header */}
      <Header />

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl px-3" onSubmit={handleRegister}>
        {/* Campo para o nome do link */}
        <label htmlFor="" className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        {/* Campo para a URL do link */}
        <label htmlFor="" className="text-white font-medium mt-2 mb-2">URL do Link</label>
        <Input
          type="url"
          placeholder="Digite a URL do link..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        {/* Seção para seleção de cores */}
        <section className="flex my-4 gap-5">
          {/* Seletor de cor para o fundo do link */}
          <div className="flex gap-3">
            <label htmlFor="" className="text-white font-medium mt-2 mb-2">Fundo do link</label>
            <input
              type="color"
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>

          {/* Seletor de cor para o texto do link */}
          <div className="flex gap-3">
            <label htmlFor="" className="text-white font-medium mt-2 mb-2">Cor do link</label>
            <input
              type="color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
          </div>
        </section>

        {/* Pré-visualização do link com as cores selecionadas */}
        {nameInput !== "" && (
          <div className='flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md'>
            <label htmlFor="" className="text-white font-medium mt-2 mb-3">
              Pré-visualização do link
            </label>
            <article
              style={{ backgroundColor: bgColorInput, color: colorInput }} // Aplica as cores selecionadas ao estilo do componente
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-700 rounded px-1 py-3 mb-2">
              <p className="font-medium">{nameInput}</p>
            </article>
          </div>
        )}


        <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">
        Meus Links
      </h2>
      {links.map((item) => (
        <article key={item.id} className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{
            backgroundColor: (item.bg),
            color: (item.color)
          }} // Aplica as cores selecionadas ao estilo do componente
        >
          <p>{item.name}</p>
          <div>
            <button className="border border-dashed p-1 rounded bg-gray-500" onClick={() => handleDeleteLink(item.id)}>
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

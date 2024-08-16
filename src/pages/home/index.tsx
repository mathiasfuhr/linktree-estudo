import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import Social from "../../components/Social"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

interface LinkProps {
  id: string,
  name: string,
  url: string,
  bg: string,
  color: string
}

interface SocialLinksProps {
  instagram: string,
  linkedin: string,
  github: string,
  whatsapp: string
}

export const Home = () => {
  const [links, setLinks] = useState<LinkProps[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

  useEffect(() => {
    function loadLinkd() {
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      getDocs(queryRef)
        .then((snapshot) => {
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
          setLinks(lista)
        })
    }
    loadLinkd()
  }, [])

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setSocialLinks({
              instagram: snapshot.data()?.instagram,
              linkedin: snapshot.data()?.linkedin,
              github: snapshot.data()?.github,
              whatsapp: snapshot.data()?.whatsapp,
            })
          }
        })
    }
    loadSocialLinks()
  }, [])

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold text-white mt-20">Mathias Fuhr</h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((item) => (
          <section
            key={item.id}
            className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: item.bg,
              color: item.color
            }}>
            <a href={item.url} target="_blank">
              <p className="text-base md:text-lg">{item.name}</p>
            </a>
          </section>
        ))}


        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks?.github}>
              <FaGithub size={35} color="#fff" />
            </Social>
            <Social url={socialLinks?.linkedin}>
              <FaLinkedin size={35} color="#fff" />
            </Social>
            <Social url={socialLinks?.whatsapp}>
              <FaWhatsapp size={35} color="#fff" />
            </Social>
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color="#fff" />
            </Social>
          </footer>
        )}



      </main>

    </div>
  )
}

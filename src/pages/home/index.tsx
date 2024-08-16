import { FaGithub, FaLinkedin } from "react-icons/fa"
import Social from "../../components/Social"

export const Home = () => {
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold text-white mt-20">Mathias Fuhr</h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
          <a href="">
            <p className="text-base md:text-lg">Canal no Youtube</p>
          </a>
        </section>
        <footer className="flex justify-center gap-3 my-4">
          <Social url='https://github.com/mathiasfuhr'>
            <FaGithub size={35} color="#fff"/>
          </Social>
          <Social url='https://www.linkedin.com/in/mathias-g-fuhr/'>
            <FaLinkedin size={35} color="#fff"/>
          </Social>
        </footer>
      </main>

    </div>
  )
}

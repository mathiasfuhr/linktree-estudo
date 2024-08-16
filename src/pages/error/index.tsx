import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-6">A página que você está tentando acessar não existe.</p>
            <Link 
                to="/" 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
                Voltar para a página inicial
            </Link>
        </div>
    );
}

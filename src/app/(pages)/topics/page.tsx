'use client';

import {
  Search,
  ExternalLink,
  FlaskRoundIcon as Flask,
  Building2,
  Globe,
  Film,
  Music,
  ClubIcon as Football,
} from 'lucide-react';

export default function TopicSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0ECBC0] to-[#2D7EE8]">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-white text-2xl font-bold">Elige un Tema</h1>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white hover:underline">
            Perfil
          </a>
          <a href="#" className="text-white hover:underline">
            Ranking
          </a>
          <button className="flex items-center gap-1 text-white">
            <ExternalLink size={18} />
            <span>Salir</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar temas..."
            className="w-full py-3 pl-10 pr-4 bg-white rounded-lg focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ciencia */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#0ECBC0] flex items-center justify-center mb-3">
              <Flask className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">Ciencia</h2>
            <p className="text-gray-600">25 preguntas</p>
          </div>

          {/* Historia */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#F9A826] flex items-center justify-center mb-3">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">Historia</h2>
            <p className="text-gray-600">30 preguntas</p>
          </div>

          {/* Geografía */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#4CAF50] flex items-center justify-center mb-3">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">Geografía</h2>
            <p className="text-gray-600">20 preguntas</p>
          </div>

          {/* Películas */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#F44336] flex items-center justify-center mb-3">
              <Film className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">Películas</h2>
            <p className="text-gray-600">15 preguntas</p>
          </div>

          {/* Música */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#9C27B0] flex items-center justify-center mb-3">
              <Music className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">Música</h2>
            <p className="text-gray-600">22 preguntas</p>
          </div>

          {/* Deportes */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#FF9800] flex items-center justify-center mb-3">
              <Football className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1">Deportes</h2>
            <p className="text-gray-600">18 preguntas</p>
          </div>
        </div>
      </main>
    </div>
  );
}

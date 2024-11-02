export default function Home() {
  return (
    <div className="p-6 bg-gray-900 text-white">
      {/* Logo et Titre */}
      <header className="flex flex-col items-center my-16 md:flex-row md:justify-between">
        <img src="/img/logo_0xECE.png" alt="Logo" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 mb-4 md:mb-0" />
        <div className="text-center md:flex-1">
          <h1 className="text-4xl font-bold">Bienvenue chez 0xECE</h1>
          <p className="text-gray-400">Association de cybersécurité de l'ECE Paris</p>
        </div>
      </header>

      {/* Présentation de l'Association */}
      <section className="my-16 flex flex-col md:flex-row lg:mx-32">
        <div className="md:w-1/2 lg:w-2/5 p-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">Présentation de l'association</h2>
          <p className="text-gray-300 text-justify">
            L'association 0xECE regroupe des passionnés de cybersécurité qui participent à des CTFs et partagent leurs connaissances.
            Nous promouvons l'apprentissage, la collaboration et la sécurité informatique.
          </p>
        </div>
        <div className="md:w-1/2 lg:w-3/5 p-4">
          <img src="/img/ctf.png" alt="Image de l'association" className="rounded-lg shadow-lg w-full h-auto" />
        </div>
      </section>

      {/* Valeurs (Cybersécurité, Apprentissage, Collaboration) */}
      <section className="my-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <img src="/img/bouclier_cyber.png" alt="Cybersécurité" className="mx-auto h-20 w-20 mb-4" />
          <h3 className="text-xl font-bold text-blue-400">Cybersécurité</h3>
          <p className="text-gray-400">Protection et défense informatique</p>
        </div>
        <div className="text-center">
          <img src="/img/cerveau.png" alt="Apprentissage" className="mx-auto h-20 w-20 mb-4" />
          <h3 className="text-xl font-bold text-blue-400">Apprentissage</h3>
          <p className="text-gray-400">Formation continue en cybersécurité</p>
        </div>
        <div className="text-center">
          <img src="/img/serrage_main.png" alt="Collaboration" className="mx-auto h-20 w-20 mb-4" />
          <h3 className="text-xl font-bold text-blue-400">Collaboration</h3>
          <p className="text-gray-400">Travail d'équipe et partage de connaissances</p>
        </div>
      </section>

      {/* En Chiffres */}
      <section className="my-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">En Chiffres</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-400">50+</p>
            <p className="text-gray-400">CTFs</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-400">80+</p>
            <p className="text-gray-400">Membres Actifs</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-400">150+</p>
            <p className="text-gray-400">Write-ups</p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="my-16">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Témoignages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-lg italic text-gray-300">"Une expérience incroyable en cybersécurité!"</p>
            <p className="text-gray-400 mt-4 font-bold">Nom - Promo</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-lg italic text-gray-300">"L'association m'a permis de progresser rapidement."</p>
            <p className="text-gray-400 mt-4 font-bold">Nom - Promo</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-lg italic text-gray-300">"Les CTFs en équipe, c'est le top pour apprendre!"</p>
            <p className="text-gray-400 mt-4 font-bold">Nom - Promo</p>
          </div>
        </div>
      </section>
    </div>
  );
}

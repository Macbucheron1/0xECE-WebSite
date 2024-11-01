

export default function Home() {
  return (
    <div className="p-6">
    {/* Logo et Titre */}
    <header className="flex justify-between items-center my-6">
      <img src="/img/logo_0xECE.png" alt="Logo" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32" />
      <div className="text-center flex-1">
        <h1 className="text-4xl font-bold">Bienvenue chez 0xECE</h1>
        <p className="text-gray-600">Association de cybersécurité de l'ECE Paris</p>
      </div>
    </header>

      {/* Présentation de l'Association */}
      <section className="my-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Présentation de l'association</h2>
          <p className="text-gray-700">
            L'association 0xECE regroupe des passionnés de cybersécurité qui participent à des CTFs et partagent leurs connaissances.
            Nous promouvons l'apprentissage, la collaboration et la sécurité informatique.
          </p>
        </div>
        <div className="md:w-1/2 p-4">
          <img src="/img/ctf.png" alt="Image de l'association" className="rounded-lg shadow-lg w-full h-auto" />
        </div>
      </section>

      {/* Valeurs (Cybersécurité, Apprentissage, Collaboration) */}
      <section className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <img src="/img/bouclier_cyber.png" alt="Cybersécurité" className="mx-auto h-16 w-16 md:h-20 md:w-20 lg:h-30 lg:w-30 mb-4" />
          <h3 className="text-xl font-bold">Cybersécurité</h3>
          <p className="text-gray-600">Protection et défense informatique</p>
        </div>
        <div className="text-center">
          <img src="/img/cerveau.png" alt="Apprentissage" className="mx-auto h-16 w-16 md:h-20 md:w-20 lg:h-30 lg:w-30 mb-4" />
          <h3 className="text-xl font-bold">Apprentissage</h3>
          <p className="text-gray-600">Formation continue en cybersécurité</p>
        </div>
        <div className="text-center">
          <img src="/img/serrage_main.png" alt="Collaboration" className="mx-auto h-16 w-16 md:h-20 md:w-20 lg:h-30 lg:w-30 mb-4" />
          <h3 className="text-xl font-bold">Collaboration</h3>
          <p className="text-gray-600">Travail d'équipe et partage de connaissances</p>
        </div>
      </section>

      {/* En Chiffres */}
      <section className="my-8 text-center">
        <h2 className="text-2xl font-bold mb-4">En Chiffres</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <p className="text-3xl font-bold">50+</p>
            <p className="text-gray-600">CTFs</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <p className="text-3xl font-bold">80+</p>
            <p className="text-gray-600">Membres Actifs</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <p className="text-3xl font-bold">150+</p>
            <p className="text-gray-600">Write-ups</p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="my-8">
        <h2 className="text-2xl font-bold text-center mb-6">Témoignages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-lg italic">"Une expérience incroyable en cybersécurité!"</p>
            <p className="text-gray-700 mt-4 font-bold">Nom - Promo</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-lg italic">"L'association m'a permis de progresser rapidement."</p>
            <p className="text-gray-700 mt-4 font-bold">Nom - Promo</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-lg italic">"Les CTFs en équipe, c'est le top pour apprendre!"</p>
            <p className="text-gray-700 mt-4 font-bold">Nom - Promo</p>
          </div>
        </div>
      </section>

    </div>
  );
}

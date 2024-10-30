
export default function Article({ params }) {
  const { id } = params;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Article {id}</h1>
        <p className="text-lg text-gray-700">This is the content of article {id}.</p>
      </div>
    </div>
  );
}
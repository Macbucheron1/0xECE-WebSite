import Link from 'next/link';
import '../../styles/globals.css';

export default function Articles() {
  const articles = [
    { id: '1', title: 'My First Blog Post' },
    { id: '2', title: 'Understanding Next.js' },
  ];

  return (
    <div className="p-6 bg-blue-100 min-h-full">
      <h2 className="text-2xl font-bold mb-4">Articles</h2>
      <ul className="space-y-2">
        {articles.map((article) => (
          <li key={article.id} className="bg-white p-4 rounded shadow">
            <Link href={`/articles/${article.id}`} className="text-blue-500 hover:text-blue-800">
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
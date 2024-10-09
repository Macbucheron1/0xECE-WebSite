import Link from 'next/link';

export default function Articles() {
  const articles = [
    { id: '1', title: 'My First Blog Post' },
    { id: '2', title: 'Understanding Next.js' },
  ];

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

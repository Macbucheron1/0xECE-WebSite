export default function Article({ params }) {
    const { id } = params;
    return (
      <div>
        <h1>Article {id}</h1>
        <p>This is the content of article {id}.</p>
      </div>
    );
  }
  
import '../styles/globals.css';

export default function Home() {
  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h1 className="wt-title mb-6">Welcome to WebTech-101 project</h1>
      <p className="text-lg font-sans text-gray-700 mb-2">
        Currently discovering the world of web technologies.
      </p>
      <p className="text-lg text-gray-700">
        We are trying to make things cool here
      </p>
    </div>
  );
}
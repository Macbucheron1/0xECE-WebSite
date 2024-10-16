import '../../styles/globals.css';

export default function About() {
  return (
    <ul className="p-6">
      <li className="bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Project Information</h1>
        <p className="text-lg text-gray-700 mb-2">
          Welcome to our project! We are using this website to display the result of our lab / project.
        </p>
        <p className="text-lg text-gray-700">
          It is the result of numerous lab for the Web Technologies course at ECE Paris directed by Mr. Paul Farault
        </p>
      </li>
      <li className="mt-4">
        <ul className='flex gap-6'>
          <li className='bg-white p-6 rounded shadow flex-grow'>
            <h1 className="text-2xl font-bold mb-4">Nathan Deprat</h1>
            <p className="text-lg text-gray-700">
              Passionate about cybersecurity, I am looking for a 4 - 5 months internship pls help.
            </p>

          </li>
          <li className='bg-white p-6 rounded shadow flex-grow'>
            <h1 className="text-2xl font-bold mb-4">Ibrahim Diallo</h1>
            <p className="text-lg text-gray-700">
              Also looking for an internship in cybersecurity, however less intelligent than Nathan.
            </p>

          </li>
        </ul>
      </li>
    </ul>

  );
}
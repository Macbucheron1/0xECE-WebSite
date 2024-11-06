export default function About() {
  return (
    <ul className="p-6">
      <li className="card">
        <h1 className="p-blue text-xl font-bold mb-4">Project Information</h1>
        <p className="text-lg p-gray mb-2">
          Welcome to our project! We are using this website to display the result of our lab / project.
        </p>
        <p className="text-lg p-gray">
          It is the result of numerous lab for the Web Technologies course at ECE Paris directed by Mr. Paul Farault
        </p>
      </li>
      <li className="mt-4">
        <ul className='flex gap-6'>
          <li className='card flex-grow'>
            <h1 className="p-blue text-xl font-bold mb-4">Nathan Deprat</h1>
            <p className="text-lg p-gray">
              Passionate about cybersecurity, I am looking for a 4 - 5 months internship pls help.
            </p>
          </li>
          <li className='card flex-grow'>
            <h1 className="p-blue text-xl font-bold mb-4">Ibrahim Diallo</h1>
            <p className="text-lg p-gray">
              Also looking for an internship in cybersecurity (He is better than Nathan).
            </p>
          </li>
        </ul>
      </li>
    </ul>
  );
}
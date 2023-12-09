import { Link } from 'react-router-dom';

export const IndexPage = () => {
  return (
    <div className="flex flex-col h-screen bg-image-medicine items-center justify-center">
      <div className="flex flex-col items-center bg-white rounded-md shadow-md p-4 m-2 justify-center">
        <img
          src="images/esvyda_logo.png"
          width={300}
          className="logo"
          alt="Vite logo"
        />
        <h1 className="text-5xl font-bold mb-4 text-center">
          ¡Bienvenido a Esvyda My Doctor!
        </h1>
        <Link to="/login" className="text-blue-500 hover:underline">
          Ir a la página de inicio de sesión
        </Link>
      </div>
    </div>
  );
};

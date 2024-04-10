import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';

export const IndexPage = () => {
  return (
    <div className="flex flex-col h-screen bg-image-medicine items-center justify-center">
      <div className="flex flex-col items-center bg-white rounded-md shadow-md p-4 m-2 justify-center">
        <div
          className="rounded mb-2 pb-2 px-4 flex w-full justify-center"
          style={{ background: '#008054' }}
        >
          <img
            src="images/previ_logo.png"
            width={300}
            className="logo"
            alt="Vite logo"
          />
        </div>
        <h1 className="text-5xl font-bold my-10 text-center">
          ¡Bienvenido a la aplicación.!
        </h1>

        <ButtonGroup
          variant="outlined"
          aria-label="Loading button group"
          className="flex-1 w-full flex flex-row items-center"
        >
          <Button variant="outlined" className="flex-1">
            <Link to="/login" className="hover:underline flex-1">
              Iniciar sesión
            </Link>
          </Button>
          <Button variant="outlined" className="flex-1">
            <Link to="/turn" className="hover:underline flex-1">
              turnero
            </Link>
          </Button>
          <Button variant="outlined" className="flex-1">
            <Link to="/pre-turn" className=" hover:underline flex-1">
              pre turnos
            </Link>
          </Button>
        </ButtonGroup>
        {/* <div className="w-full flex flex-row items-center"> */}
        {/* </div> */}

        {/* <div className="flex flex-col items-center"> */}
        {/*   <Link to="/login" className="text-blue-500 hover:underline flex-1"> */}
        {/*     Ir a la página de inicio de sesión */}
        {/*   </Link> */}
        {/*   <Link to="/turn" className="text-blue-500 hover:underline flex-1"> */}
        {/*     Ir al turnero */}
        {/*   </Link> */}
        {/*   <Link to="/pre-turn" className="text-blue-500 hover:underline flex-1"> */}
        {/*     Ir al pre turnos */}
        {/*   </Link> */}
        {/* </div> */}
      </div>
    </div>
  );
};

import React, { lazy, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { textState } from "../Atom/Atom";


const Layout = lazy(() => import("../Components/Layout"));


const Login = () => {

  const [show_input, setshow_input] = useState(false);
  const [name, setname] = useRecoilState(textState);
  const [password, setpassword] = useState("");
  let navigate = useNavigate();


  const handleSubmit = (evt) => {
	evt.preventDefault();
	navigate("/private");
	alert(`Submitting Name ${name} and password ${password}`)
}

  return (
    <Layout title="Connexion">
      <div className="container h-100 d-flex justify-content-center">
        <form className="form-signin" onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-bold ">Connexion</h1>
          <p>
            Vous avez déjà un compte ?
            <a href="#" className="link-color ms-1">
              Inscription
            </a>
          </p>
          <input
            type="email"
            id="inputEmail"
            className="form-control mb-3"
            placeholder="Email"
            required=""
            autoFocus=""
			onChange={e => setname(e.target.value)}
          />

          <div className="relative">
            <input
              type={show_input ? "text" : "password"}
              id="inputPassword"
              className="form-control pe-5	"
              placeholder="Mot de passe"
              required=""
			  onChange={e => setpassword(e.target.value)}
            />
           
              <i
                className={show_input ? "bi bi-eye-slash i-login" : "bi bi-eye i-login"}
                onClick={() => setshow_input(!show_input)}
              ></i>
            
          </div>
          <p className="condition-utilisation-text mt-3">
            Bégaiement s'engage à respecter vos données. En continuant votre
            inscription, vous acceptez nos{" "}
            <a href="#" className="condition-utilisation-link">
              conditions générales
            </a>
            .{" "}
          </p>
        <button className="w-100 btn btn-lg btn-primary mt-3 " type="submit" disabled={!(name && password)}>
            Accéder à mon espace
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

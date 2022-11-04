import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import Alert from "../general/Alert";
import Button from "react-bootstrap/Button"

function LoginForm({login}){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await login(formData);
        if (result.success) {
          navigate("/pets");
        } else {
          setFormErrors(result.errors);
        }
      }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(formData => ({ ...formData, [name]: value }));
      }

    return(
        <div className="LoginForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">Sign In Here</h3>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <Button
                    variant="info"
                    type="submit"
                    onSubmit={handleSubmit}
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )

}

export default LoginForm

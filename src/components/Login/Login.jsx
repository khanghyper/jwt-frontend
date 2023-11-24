import FormInput from "../FormInput/FormInput";

const Login = () => {
  return (
    <div className="container">
      <div className="row ">
        <div className="col-6 ">test</div>
        <div className="col-6 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
          <form>
            <FormInput 
              title={"email"} 
              type={"text"} 
            />
            <FormInput 
              title={"password"} 
              type={'password'}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

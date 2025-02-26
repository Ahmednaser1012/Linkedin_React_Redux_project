import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { googleSignIn } from "../indexFunction";
import { useEffect } from "react";
// import { connect } from "react-redux";

const Login = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  const navgate = useNavigate();

  const login = () => {
    dispatch(googleSignIn(user));
  };
  useEffect(() => {
    if (user) {
      navgate("/home");
    }
  }, [user]);

  return (
    <>
      <Container>
        <Nav>
          <Link to="/">
            <img src="/images/login-logo.svg" alt="" />
          </Link>
          <div>
            <Join>Join now</Join>
            <SignIn>Sign in</SignIn>
          </div>
        </Nav>
        <Section>
          <Hero>
            <h1>Welcome to your professional community</h1>
            <img src="/images/login-hero.svg" alt="" />
          </Hero>
          <Form>
            <Google onClick={login}>
              <img src="/images/google.svg" alt="" />
              Sign in with Google
            </Google>
          </Form>
        </Section>
      </Container>
    </>
  );
};
const Container = styled.div`
  padding: 20px;
`;
const Nav = styled.nav`
  width: 100%;
  padding: 12px 14px 36px;

  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
  @media (max-width: 391px) {
    padding: 10 1px;
  }
`;
const Join = styled.a`
  font-size: 20px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
    cursor: pointer;
  }
  @media (max-width: 391px) {
    font-size: 10px;

    padding: 4px 10px;
  }
`;
const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 20px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
    cursor: pointer;
  }
  @media (max-width: 391px) {
    font-size: 10px;
    padding: 14px 10px;
  }
`;
const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 130px;
  padding-top: 40px;
  padding: 40px 0px;
  position: relative;
  flex-wrap: wrap;
  width: 80%;

  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;
const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 35px;
      width: 100%;
      line-height: 2;
    }
  }
  img {
    width: 300px;
    height: 300px;
    position: absolute;

    bottom: 400px;
    right: 0px;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;
const Form = styled.div`
  margin-top: 100px;
  width: 400px;
  @media (max-width: 768px) {
    margin-top: 30px;
    padding-left: 15%;
  }
  @media (max-width: 579px) {
    padding: 7 10px;
    width: 300px;
  }
  @media (max-width: 426px) {
    padding: 0 20px 1px;
    width: 250px;
  }
  @media (max-width: 391px) {
    padding: 0 1px;
    width: 300px;
  }
`;
const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 /0%),
    inset 0 0 0 1px rgb(0 0 0 / 0%);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
Login.propTypes = {
  SignIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
`;
// const mapStateToProps = (state) => {
//   return {
//     user: state.userState.user,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     signIn: () => dispatch(signIN()),
//   };
// };

export default Login;
// export default connect(mapStateToProps, mapDispatchToProps)(Login);

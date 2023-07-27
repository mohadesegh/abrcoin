import React from "react";
import { useState } from "react";
import tw from "twin.macro";
import { Link, NavLink } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

function Login(props) {
  const Section = tw.div`bg-gray-500 dark:bg-gray-900`;
  const Container = tw.div`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`;
  const Title = tw.a`flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white`;
  const Content = tw.div`w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`;
  const Subheading = tw.div`p-6 space-y-4 md:space-y-6 sm:p-8`;
  const Heading = tw.div`text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`;
  const Form = tw.form`space-y-4 md:space-y-6`;
  const Emaillabel = tw.label`block mb-2 text-sm font-medium text-gray-900 dark:text-white`;
  const Emailinput = tw.input`bg-gray-500 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;
  const BottomSection = tw.div`flex items-center justify-between`;
  const Subbottom = tw.div`flex items-start`;
  const Remember = tw.div`flex items-center h-5`;
  const Rememberinput = tw.input`w-4 h-4 border border-gray-300 rounded bg-gray-500  dark:bg-gray-700 dark:border-gray-600`;
  const Label = tw.div`ml-3 text-sm`;
  const Rememberlabel = tw.label`text-gray-500 dark:text-gray-300`;
  const Forgot = tw.a`text-gray-500 dark:text-gray-300`;
  const Button = tw.button`w-full text-white bg-primary-600 hover:bg-primary-700  focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700`;
  const Para = tw.p`text-sm font-light text-gray-500 dark:text-gray-400`;
  // const Apara = tw.NavLink`font-medium text-primary-600 hover:underline dark:text-primary-500`;

  const [error, setError] = useState("");
  const signIn = useSignIn();

  const onSubmit = async (values) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post(
        "https://api.trademix.ir/account/login",
        values
      );

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { username: values.username },
      });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const [data, setData] = useState({
      username: "",
      password: ""
    });

    const handleChange = (e) => {
      const value = e.target.value;
      setData({
        ...data,
        [e.target.name]: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        username: data.username,
        password: data.password
      };
      axios.post("https://api.trademix.ir/account/login", userData).then((response) => {
        console.log(response.status, response.data.token);
      });
    };

  return (
    <Section>
      <Container>
        <Title href="#">ثبت نام</Title>
        <Content>
          <Subheading>
            <Heading>ورود به پنل کاربری</Heading>
            <Form onSubmit={handleSubmit} action="#">
              <div>
                <Emaillabel for="email">نام کاربری</Emaillabel>
                <Emailinput
                  type="username"
                  name="username"
                  id="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="نام کاربری"
                  required=""
                />
              </div>
              <div>
                <Emaillabel
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  رمز عبور
                </Emaillabel>
                <Emailinput
                  type="password"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="*******"
                  required=""
                />
              </div>
              <BottomSection>
                {/* <Subbottom>
                          <Remember>
                            <Rememberinput id="remember" aria-describedby="remember" type="checkbox" required=""/>
                          </Remember>
                          <Label>
                            <Rememberlabel for="remember">Remember me</Rememberlabel>
                          </Label>
                      </Subbottom> */}
                <Forgot href="#">رمز عبور خود را فراموش کرده اید؟</Forgot>
              </BottomSection>
              <Button type="submit">ورود</Button>
              <Para>
                قبلا ثبت نام نکرده اید؟ <NavLink to="/signup">ثبت نام</NavLink>
              </Para>
            </Form>
          </Subheading>
        </Content>
      </Container>
    </Section>
  );
}

export default Login;

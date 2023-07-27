import React from "react";
import { useState } from "react";
import axios from "axios";
import tw from "twin.macro";
import { Link, NavLink, redirect } from "react-router-dom";

function SignUp() {
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

  const [phonenumber, setPhonenumber] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const getOtp = localStorage.getItem("otp");
  var bodyFormData = new FormData();
  bodyFormData.append("phone_number", phonenumber);

  var bodyFormDataSignup = new FormData();
  bodyFormDataSignup.append("phone_number", phonenumber);
  bodyFormDataSignup.append("otp", otp);
  bodyFormDataSignup.append("password", password);

  const handleInputChange = (e) => {
    setPhonenumber(e.target.value);
  };
  const handleSubmitButton = (e) => {
    if (phonenumber === "") {
      alert("لطفا شماره تلفن خود را وارد کنید!");
    } else if (phonenumber.length < 11) {
      alert("لطفا شماره تلفن خود را به طور صحیح وارد کنید!");
    } else {
      axios({
        method: "post",
        url: "https://api.trademix.ir/account/getOTP",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
          alert(response.data.message);
          localStorage.setItem("otp", true);
          window.location.reload();
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };
  const handleInputChangeOtp = (e) => {
    setOtp(e.target.value);
  };
  const handleInputChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmitButtonOtp = () => {
    alert(otp);
    axios({
      method: "post",
      url: "https://api.trademix.ir/account/signup",
      data: bodyFormDataSignup,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        redirect("/panel");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  if (getOtp === false) {
    return (
      <Section>
        <Container>
          <Title>ثبت نام</Title>
          <Content>
            <Subheading>
              <Heading>ثبت نام</Heading>
              <Form>
                <div>
                  <Emaillabel>شماره موبایل</Emaillabel>
                  <Emailinput
                    value={phonenumber}
                    onChange={handleInputChange}
                  />
                </div>
                <BottomSection></BottomSection>
                {/* <Button type="submit">ورود</Button> */}
                <Button
                  type="submit"
                  value="submit"
                  onClick={handleSubmitButton}
                >
                  دریافت پیامک تایید
                </Button>
                <Para>
                  قبلا ثبت نام کرده اید؟ <NavLink to="/login">ورود</NavLink>
                </Para>
              </Form>
            </Subheading>
          </Content>
        </Container>
      </Section>
    );
  } else {
    return (
      <Section>
        <Container>
          <Title>ثبت نام</Title>
          <Content>
            <Subheading>
              <Heading>پیامک دریافت شده</Heading>
              <Form>
                <div>
                  <Emaillabel for="otp">کد پیامک شده را وارد کنید</Emaillabel>
                  <Emailinput value={otp} onChange={handleInputChangeOtp} />
                </div>
                <div>
                  <Emaillabel for="password">رمز خود را وارد کنید</Emaillabel>
                  <Emailinput
                    value={password}
                    onChange={handleInputChangePassword}
                  />
                </div>
                <BottomSection></BottomSection>
                <Button
                  type="submit"
                  value="submit"
                  onClick={handleSubmitButtonOtp}
                >
                  تایید ثبت نام
                </Button>
                <Para>
                  قبلا ثبت نام کرده اید؟ <NavLink to="/login">ورود</NavLink>
                </Para>
              </Form>
            </Subheading>
          </Content>
        </Container>
      </Section>
    );
  }
}

export default SignUp;

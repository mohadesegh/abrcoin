import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import tw from "twin.macro";
import { Link , NavLink } from 'react-router-dom';

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



    const [data, setData] = useState({
        otp: "",
        otp: ""
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
          otp: data.otp,
          otp: data.otp
        };
        axios.post("https://api.abrcoin.ir/account/signup", userData).then((response) => {
          console.log(response.status, response.data.token);
        });
      };
    
      return (
        <Section>
  <Container>
      <Content>
          <Subheading>
              <Heading>
                کد دریافت شده 
              </Heading>
              <Form onSubmit={handleSubmit} action="#">
                  <div>
                      <Emaillabel for="otp">کد ارسال شده</Emaillabel>
                      <Emailinput type="number" name="otp" id="otp" value={data.otp}  onChange={handleChange} placeholder="09123456789" required=""/>
                  </div>
                  <BottomSection>
                  </BottomSection>
                  <Button type="submit" >تعیین رمز عبور</Button>
                  <Para>
                      قبلا ثبت نام کرده اید؟ <NavLink to="/login">ورود</NavLink>
                  </Para>
              </Form>
          </Subheading>
      </Content>
  </Container>
</Section>
      );
    };

export default SignUp;

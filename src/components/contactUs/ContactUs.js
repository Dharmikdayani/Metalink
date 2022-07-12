import React, { useState } from "react";
import "../../css/contactus.css";
import ManinHeader from "../Layout/ManinHeader";
import Footer from "../../components/Layout/Footer";

const Contactus = () => {
  document.title = "Contactus";
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [YourComments, setYourComments] = useState("");
  /*================ERROR MESSAGE============= */

  let errorsObj = {
    FirstName: "",
    LastName: "",
    email: "",
    YourComments: "",
  };
  const [errors, setErrors] = useState(errorsObj);

  const onSignInSubmit = (e) => {
    e.preventDefault();

    let error = false;

    errorsObj = { ...errorsObj };

    if (FirstName === "") {
      errorsObj.username = "*Username is required!";
      error = true;
    }
    if (LastName === "") {
      errorsObj.username = "*Username is required!";
      error = true;
    }

    if (email === "") {
      errorsObj.email = "*Email address is required!";
      error = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsObj.email = "*Email address is invalid!";
      error = true;
    }
    if (YourComments === "") {
      errorsObj.username = "*Username is required!";
      error = true;
    }
    setErrors(errorsObj);
    if (error) return;
    // SignUp();
  };
  return (
    <>
      <div className="mining-bg">
        {/* <!-- ------------------- MINING START ----------------- --> */}
        <ManinHeader />
        {/* <!-- ------------------- Contact_Us ----------------- -->     */}
        <section className="contact-us w-100 d-md-inline-block">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <h3 className="common-heading text-center mb-0">Contact Us</h3>
                <p className="platform-subtitle text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <form id="myform" autoComplete="off" autoCorrect="off">
                  <div className="profile-add w-100 d-inline-block">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group form-profile">
                          <div className="form-happy">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="First Name"
                              value={FirstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group form-profile">
                          <div className="form-happy">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group form-profile">
                      <div className="form-happy">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                    <div className="form-group form-profile">
                      <textarea
                        id="w3review"
                        name="w3review"
                        rows="4"
                        cols="50"
                        placeholder="Your Comments"
                      ></textarea>
                    </div>
                    <button className="btn-send text-center">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* <!--------------- Footer Start --------------> */}
        <Footer />
        {/* <!-- ------------------- CURRENT MINING RATE END ----------------- --> */}
      </div>
    </>
  );
};

export default Contactus;

import React, { useState } from "react";
import "../../css/contactus.css";
import ManinHeader from "../Layout/ManinHeader";
import Footer from "../../components/Layout/Footer";

const Contactus = () => {
  document.title = "Contactus";
  const [Data, setData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    YourComments: "",
  });

  /*================ERROR MESSAGE============= */
  const InputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
  };

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

    if (Data.FirstName === "") {
      errorsObj.FirstName = "*FirstName is required!";
      error = true;
    }
    if (Data.LastName === "") {
      errorsObj.LastName = "*LastName is required!";
      error = true;
    }

    if (Data.email === "") {
      errorsObj.email = "*Email address is required!";
      error = true;
    } else if (!/\S+@\S+\.\S+/.test(Data.email)) {
      errorsObj.email = "*Email address is invalid!";
      error = true;
    }
    if (Data.YourComments === "") {
      errorsObj.YourComments = "*Message is required!";
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
                <form
                  id="myform"
                  autoComplete="off"
                  autoCorrect="off"
                  onSubmit={(e) => onSignInSubmit(e)}
                >
                  <div className="profile-add w-100 d-inline-block">
                    <div className="row">
                      <div className="col-md-6">
                        <div
                          className={
                            errors.FirstName
                              ? "form-group-errorMsg "
                              : "form-group form-profile"
                          }
                        >
                          <div className="form-happy">
                            <input
                              type="text"
                              id="name"
                              name="FirstName"
                              placeholder="First Name"
                              onChange={InputChange}
                            />
                            {errors.FirstName && (
                              <div className="errorMsg-Contactus">
                                {errors.FirstName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className={
                            errors.LastName
                              ? "form-group-errorMsg "
                              : "form-group form-profile"
                          }
                        >
                          <div className="form-happy">
                            <input
                              type="text"
                              id="name"
                              name="LastName"
                              placeholder="Last Name"
                              onChange={InputChange}
                            />
                            {errors.LastName && (
                              <div className="errorMsg-Contactus">
                                {errors.LastName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        errors.email
                          ? "form-group-errorMsg "
                          : "form-group form-profile"
                      }
                    >
                      <div className="form-happy">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          onChange={InputChange}
                        />
                        {errors.email && (
                          <div className="errorMsg-Contactus">
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={
                        errors.YourComments
                          ? "form-group-errorMsg "
                          : "form-group form-profile"
                      }
                    >
                      <textarea
                        id="w3review"
                        name="YourComments"
                        rows="4"
                        cols="50"
                        placeholder="Your Comments"
                        onChange={InputChange}
                      />
                      {errors.YourComments && (
                        <div className="errorMsg-Contactus-textarea">
                          {errors.YourComments}
                        </div>
                      )}
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

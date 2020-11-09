import React from 'react';

export const AuthPage = ()=>{
    return(
        <div className="row justify-content-center align-items-center">
            <div className="col-6">
                <div className="card white darken-1">
                    <h1 className="lato-font text-center">Web-signature</h1>
                    <div className="card-content white-text">
                        <span className="card-title">authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="email" id="first_name" type="text" className="validate" />
                                <label htmlFor="first_name">email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="password" id="first_name" type="text" className="validate" />
                                <label htmlFor="first_name">password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4 mr-5">login</button>
                        <button className="btn grey lighten-1 black-text">registrstion</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


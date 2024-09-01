import React from 'react';
import './Chatbox.css'; // Ensure you have corresponding styles for the chatbox

const Chatbox = () => {
  return (
    <section>
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            {/* Buttons trigger collapse */}
            <a
              className="btn btn-info btn-lg btn-block"
              data-mdb-ripple-init
              data-mdb-collapse-init
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <div className="d-flex justify-content-between align-items-center">
                <span>Collapsible Chat App</span>
                <i className="fas fa-chevron-down"></i>
              </div>
            </a>

            {/* Collapsed content */}
            <div className="collapse mt-3" id="collapseExample">
              <div className="card" id="chat4">
                <div
                  className="card-body"
                  data-mdb-perfect-scrollbar-init
                  style={{ position: 'relative', height: '400px' }}
                >
                  <div className="d-flex flex-row justify-content-start">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                    <div>
                      <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                        Hi
                      </p>
                      <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                        How are you ...???
                      </p>
                      <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                        What are you doing tomorrow? Can we come up a bar?
                      </p>
                      <p className="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
                    </div>
                  </div>

                  <div className="divider d-flex align-items-center mb-4">
                    <p className="text-center mx-3 mb-0" style={{ color: '#a2aab7' }}>
                      Today
                    </p>
                  </div>

                  <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        Hiii, I'm good.
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        How are you doing?
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        Long time no see! Tomorrow office. will be free on sunday.
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:06
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                  </div>

                  <div className="d-flex flex-row justify-content-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                    <div>
                      <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                        Okay
                      </p>
                      <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                        We will go on Sunday?
                      </p>
                      <p className="small ms-3 mb-3 rounded-3 text-muted">00:07</p>
                    </div>
                  </div>

                  <div className="d-flex flex-row justify-content-end mb-4">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        That's awesome!
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        I will meet you Sandon Square sharp at 10 AM
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        Is that okay?
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:09
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                  </div>

                  <div className="d-flex flex-row justify-content-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                    <div>
                      <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                        Okay I will meet you on Sandon Square
                      </p>
                      <p className="small ms-3 mb-3 rounded-3 text-muted">00:11</p>
                    </div>
                  </div>

                  <div className="d-flex flex-row justify-content-end mb-4">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        Do you have pictures of Matley Marriage?
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:11
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                  </div>

                  <div className="d-flex flex-row justify-content-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                    <div>
                      <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                        Sorry I don't have. I changed my phone.
                      </p>
                      <p className="small ms-3 mb-3 rounded-3 text-muted">00:13</p>
                    </div>
                  </div>

                  <div className="d-flex flex-row justify-content-end">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        Okay then see you on Sunday!!
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:15
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      style={{ width: '45px', height: '100%' }}
                    />
                  </div>
                </div>
                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                    alt="avatar 3"
                    style={{ width: '40px', height: '100%' }}
                  />
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Type message"
                  />
                  <a className="ms-1 text-muted" href="#!">
                    <i className="fas fa-paperclip"></i>
                  </a>
                  <a className="ms-3 text-muted" href="#!">
                    <i className="fas fa-smile"></i>
                  </a>
                  <a className="ms-3 link-info" href="#!">
                    <i className="fas fa-paper-plane"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbox;

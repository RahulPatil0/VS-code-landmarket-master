// import React from 'react';

// const SideBar = () => {
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <div className="container mt-5">
//         <div className="row d-flex justify-content-center">
//           <div className="col-md-10">
//             <div className="card p-3 py-4">
//               <h5>An Easier way to find your Housing</h5>
//               <div className="row g-3 mt-2">
//                 <div className="col-md-3">
//                   <div className="dropdown">
//                     <button
//                       className="btn btn-secondary dropdown-toggle"
//                       type="button"
//                       id="dropdownMenuButton"
//                       data-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       Any Status
//                     </button>
//                     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                       <li><a className="dropdown-item" href="#">Rural</a></li>
//                       <li><a className="dropdown-item" href="#">Urban</a></li>
//                       <li><a className="dropdown-item" href="#">All</a></li>
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter address e.g. street, city and state or zip"
//                   />
//                 </div>

//                 <div className="col-md-3">
//                   <button className="btn btn-secondary btn-block">Search Results</button>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <a
//                   data-toggle="collapse"
//                   href="#collapseExample"
//                   role="button"
//                   aria-expanded="false"
//                   aria-controls="collapseExample"
//                   className="advanced"
//                 >
//                   Advance Search With Filters <i className="fa fa-angle-down"></i>
//                 </a>

//                 <div className="collapse" id="collapseExample">
//                   <div className="card card-body">
//                     <div className="row">
//                       <div className="col-md-4">
//                         <input type="text" placeholder="Property ID" className="form-control" />
//                       </div>
//                       <div className="col-md-4">
//                         <input type="text" className="form-control" placeholder="Search by MAP" />
//                       </div>
//                       <div className="col-md-4">
//                         <input type="text" className="form-control" placeholder="Search by Country" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Use this for navigation
import './UniqueSearchbar.css'; // Ensure this CSS file includes the necessary styles

const Searchbar = () => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const history = useHistory(); // Hook for navigation

  const handleSearch = () => {
    // Redirect to the properties page with search parameters
    history.push(`/properties?state=${state}&city=${city}&zipcode=${zipcode}`);
  };

  return (
    <div className="unique-searchbar-container1 d-flex vh-100">
      <div className="unique-searchbar-inner-container1 container">
        <div className="unique-searchbar-card card p-4">
          <h5 className="unique-searchbar-title text-center">Find Your Perfect Property</h5>
          <div className="row g-3 mt-3">
            <div className="col-md-4">
              <input
                type="text"
                className="unique-searchbar-input form-control"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="unique-searchbar-input form-control"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="unique-searchbar-input form-control"
                placeholder="Zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button className="unique-searchbar-button btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;

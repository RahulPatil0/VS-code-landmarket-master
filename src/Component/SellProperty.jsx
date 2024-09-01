

import React, { useState, useEffect } from 'react';
import './SellProperty.css';
import Layout from './Layout/Layout';

// Sample data
const statesAndCities = {
"Karnataka": [
    "Bengaluru (Bangalore)", "Mysuru (Mysore)", "Mangaluru (Mangalore)", "Hubli", "Dharwad", 
    "Belagavi (Belgaum)", "Kalaburagi (Gulbarga)", "Ballari (Bellary)", "Tumakuru (Tumkur)", 
    "Shivamogga (Shimoga)", "Chikkamagaluru (Chikmagalur)", "Kolar", "Udupi", "Chitradurga", 
    "Hassan", "Kodagu (Coorg)", "Bagalkote", "Bijapur (Vijayapura)", "Raichur", 
    "Dakshina Kannada (Mangalore district)", "Gadag", "Haveri", "Yadgir", "Koppal", "Mandya", 
    "Ramanagara", "Chikkaballapura (Chikballapur)", "Davangere", "Bidar"
  ],
  "Maharashtra": [
    "Colaba", "Fort", "Marine Drive", "Nariman Point", "Churchgate", "Kala Ghoda", "Girgaum", 
    "Dadar", "Parel", "Mahim", "Worli", "Lower Parel", "Bandra", "Juhu", "Andheri", 
    "Versova", "Malad", "Goregaon", "Borivali", "Dahisar", "Mumbai Suburban District", 
    "Navi Mumbai", "Thane", "Kalyan", "Dombivli", "Mira-Bhayandar", "Vasai-Virar", "Bhiwandi", 
    "Ulhasnagar", "Ambernath", "Badlapur", "Palghar"
  ],
  "Andhra Pradesh": [
    "Visakhapatnam (Vizag)", "Vijayawada", "Tirupati", "Guntur", "Kakinada", "Nellore", 
    "Kadapa (Cuddapah)", "Anantapur", "Rajahmundry", "Eluru", "Kurnool", "Chittoor", 
    "Srikakulam", "Vizianagaram", "Mahbubnagar", "Nizamabad", "Proddatur", "Tenali", 
    "Bhimavaram", "Kavali", "Peddaganjam", "Mangalagiri", "Narasaraopet", "Palnadu", 
    "Kothapeta", "Tadepalligudem", "Chilakaluripet", "Kandukur"
  ],
  "Bihar": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Saharsa", "Katihar", 
    "Bihar Sharif", "Samastipur", "Munger", "Begusarai", "Siwan", "Chhapra", "Nalanda", 
    "Arrah", "Buxar", "Kishanganj", "Supaul", "Jamui", "Lakhisarai", "Khagaria", 
    "Madhepura", "Gopalganj", "Sitamarhi", "Sheikhpura"
  ],
  "Goa": [
    "Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda", "Bicholim", "Mormugao", "Quepem", 
    "Curchorem", "Sanguem", "Canacona", "Valpoi", "Sanquelim", "Dharbandora"
  ],
  "Gujarat": [
    "Ahmedabad", "Gandhinagar", "Surat", "Vadodara (Baroda)", "Rajkot", "Bhavnagar", "Jamnagar", 
    "Junagadh", "Anand", "Nadiad", "Valsad", "Navsari", "Porbandar", "Kutch (Bhuj)", "Mehsana", 
    "Patan", "Dahod", "Bharuch"
  ],
  "Haryana": [
    "Faridabad", "Gurgaon (Gurugram)", "Ambala", "Hisar", "Rohtak", "Karnal", "Panipat", "Sonipat", 
    "Bhiwani", "Jhajjar", "Fatehabad", "Sirsa", "Mahendragarh", "Rewari", "Nuh", "Palwal", 
    "Yamunanagar", "Kurukshetra", "Panchkula", "Kaithal", "Jind"
  ]
};

const zipCodesByCity = {
  "Bengaluru (Bangalore)": ["560001", "560002", "560003", "560004", "560005", "560006", "560007", "560008", "560009"],
  "Mysuru (Mysore)": ["570001", "570002", "570003"],
  "Mangaluru (Mangalore)": ["575001", "575002", "575003"],
  "Hubli": ["580001", "580002", "580003"],
  "Dharwad": ["580004", "580005"],
  "Belagavi (Belgaum)": ["590001", "590002"],
  "Kalaburagi (Gulbarga)": ["585101", "585102"],
  "Ballari (Bellary)": ["583101", "583102"],
  "Tumakuru (Tumkur)": ["572101", "572102"],
  "Shivamogga (Shimoga)": ["577201", "577202"],
  "Chikkamagaluru (Chikmagalur)": ["577101", "577102"],
  "Kolar": ["563101", "563102"],
  "Udupi": ["576101", "576102"],
  "Chitradurga": ["577501", "577502"],
  "Hassan": ["573201", "573202"],
  "Kodagu (Coorg)": ["571201", "571202"],
  "Bagalkote": ["587101", "587102"],
  "Bijapur (Vijayapura)": ["586101", "586102"],
  "Raichur": ["584101", "584102"],
  "Dakshina Kannada (Mangalore district)": ["574001", "574002"],
  "Gadag": ["582101", "582102"],
  "Haveri": ["581110", "581111"],
  "Yadgir": ["585201", "585202"],
  "Koppal": ["583231", "583232"],
  "Mandya": ["571401", "571402"],
  "Ramanagara": ["562159", "562160"],
  "Chikkaballapura (Chikballapur)": ["562101", "562102"],
  "Davangere": ["577001", "577002"],
  "Bidar": ["585401", "585402"],

  "Colaba": ["400001"],
  "Fort": ["400001"],
  "Marine Drive": ["400020"],
  "Nariman Point": ["400021"],
  "Churchgate": ["400020"],
  "Kala Ghoda": ["400001"],
  "Girgaum": ["400004"],
  "Dadar": ["400014"],
  "Parel": ["400012"],
  "Mahim": ["400016"],
  "Worli": ["400030"],
  "Lower Parel": ["400013"],
  "Bandra": ["400050"],
  "Juhu": ["400049"],
  "Andheri": ["400053"],
  "Versova": ["400061"],
  "Malad": ["400064"],
  "Goregaon": ["400062"],
  "Borivali": ["400066"],
  "Dahisar": ["400068"],
  "Mumbai Suburban District": ["400097"],
  "Navi Mumbai": ["400614"],
  "Thane": ["400601"],
  "Kalyan": ["421301"],
  "Dombivli": ["421201"],
  "Mira-Bhayandar": ["401107"],
  "Vasai-Virar": ["401202"],
  "Bhiwandi": ["421302"],
  "Ulhasnagar": ["421003"],
  "Ambernath": ["421501"],
  "Badlapur": ["421503"],
  "Palghar": ["401404"],

  "Visakhapatnam (Vizag)": ["530001", "530002"],
  "Vijayawada": ["520001", "520002"],
  "Tirupati": ["517501", "517502"],
  "Guntur": ["522001", "522002"],
  "Kakinada": ["533001", "533002"],
  "Nellore": ["524001", "524002"],
  "Kadapa (Cuddapah)": ["516001", "516002"],
  "Anantapur": ["515001", "515002"],
  "Rajahmundry": ["533101", "533102"],
  "Eluru": ["534001", "534002"],
  "Kurnool": ["518001", "518002"],
  "Chittoor": ["517001", "517002"],
  "Srikakulam": ["532001", "532002"],
  "Vizianagaram": ["535001", "535002"],
  "Mahbubnagar": ["509001", "509002"],
  "Nizamabad": ["503001", "503002"],
  "Proddatur": ["516360", "516361"],
  "Tenali": ["522201", "522202"],
  "Bhimavaram": ["534202", "534203"],
  "Kavali": ["524201", "524202"],
  "Peddaganjam": ["521160"],
  "Mangalagiri": ["522503"],
  "Narasaraopet": ["522601"],
  "Palnadu": ["522201"],
  "Kothapeta": ["522237"],
  "Tadepalligudem": ["534101"],
  "Chilakaluripet": ["522616"],
  "Kandukur": ["523105"],

  "Patna": ["800001", "800002"],
  "Gaya": ["823001", "823002"],
  "Bhagalpur": ["812001", "812002"],
  "Muzaffarpur": ["842001", "842002"],
  "Darbhanga": ["846001", "846002"],
  "Purnia": ["854301", "854302"],
  "Saharsa": ["852201", "852202"],
  "Katihar": ["854105", "854106"],
  "Bihar Sharif": ["803101"],
  "Samastipur": ["848101", "848102"],
  "Munger": ["811201", "811202"],
  "Begusarai": ["851101", "851102"],
  "Siwan": ["841226", "841227"],
  "Chhapra": ["841301", "841302"],
  "Nalanda": ["803101"],
  "Arrah": ["802301"],
  "Buxar": ["802101"],
  "Kishanganj": ["855107"],
  "Supaul": ["852131"],
  "Jamui": ["811307"],
  "Lakhisarai": ["811311"],
  "Khagaria": ["851204"],
  "Madhepura": ["852113"],
  "Gopalganj": ["841428"],
  "Sitamarhi": ["843302"],
  "Sheikhpura": ["811105"],

  "Panaji": ["403001"],
  "Vasco da Gama": ["403802"],
  "Margao": ["403601"],
  "Mapusa": ["403507"],
  "Ponda": ["403401"],
  "Bicholim": ["403504"],
  "Mormugao": ["403803"],
  "Quepem": ["403705"],
  "Curchorem": ["403706"],
  "Sanguem": ["403704"],
  "Canacona": ["403702"],
  "Valpoi": ["403506"],
  "Sanquelim": ["403505"],
  "Dharbandora": ["403702"],

  "Ahmedabad": ["380001", "380002"],
  "Gandhinagar": ["382001", "382002"],
  "Surat": ["395001", "395002"],
  "Vadodara (Baroda)": ["390001", "390002"],
  "Rajkot": ["360001", "360002"],
  "Bhavnagar": ["364001", "364002"],
  "Jamnagar": ["361001", "361002"],
  "Junagadh": ["362001", "362002"],
  "Anand": ["388001", "388002"],
  "Nadiad": ["387001", "387002"],
  "Valsad": ["396001", "396002"],
  "Navsari": ["396445", "396446"],
  "Porbandar": ["360575"],
  "Kutch (Bhuj)": ["370001", "370002"],
  "Mehsana": ["384002"],
  "Patan": ["384265"],
  "Dahod": ["389151"],
  "Bharuch": ["392001"]
};
const getCityAndStateFromZipCode = (zipCode) => {
  for (const [city, zipCodes] of Object.entries(zipCodesByCity)) {
    if (zipCodes.includes(zipCode)) {
      const state = Object.keys(statesAndCities).find(state => statesAndCities[state].includes(city));
      return { city, state };
    }
  }
  return { city: '', state: '' };
};

const convertLandSize = (size, unit) => {
  switch (unit) {
    case 'Guntha':
      return {
        acres: size / 40,
        squareFeet: size * 101.17,
        squareMeters: size * 101.17,
      };
    case 'Acre':
      return {
        gunthas: size * 40,
        squareFeet: size * 43560,
        squareMeters: size * 4046.86,
      };
    case 'Square Feet':
      return {
        gunthas: size / 1089,
        acres: size / 43560,
        squareMeters: size * 0.092903,
      };
    default:
      return {};
  }
};

const SellProperty = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    propertyAddress: '',
    propertyCity: '',
    propertySize: '',
    propertyStatus: '',
    propertyState: '',
    propertyPrice: '',
    propertyZipCode: '',
    propertyImages: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [cities, setCities] = useState([]);
  const [states] = useState(Object.keys(statesAndCities));
  const [landSize, setLandSize] = useState('');
  const [landSizeUnit, setLandSizeUnit] = useState('Square Feet');
  const [conversionResults, setConversionResults] = useState({});

  useEffect(() => {
    if (formData.propertyState) {
      setCities(statesAndCities[formData.propertyState]);
      setFormData(prev => ({ ...prev, propertyCity: '' }));
    }
  }, [formData.propertyState]);

  useEffect(() => {
    if (formData.propertyCity) {
      setFormData(prev => ({ ...prev, propertyZipCode: zipCodesByCity[formData.propertyCity]?.[0] || '' }));
    }
  }, [formData.propertyCity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleZipCodeChange = (e) => {
    const zipCode = e.target.value;
    setFormData(prev => ({ ...prev, propertyZipCode: zipCode }));

    const { city, state } = getCityAndStateFromZipCode(zipCode);
    setFormData(prev => ({ ...prev, propertyCity: city, propertyState: state }));

    if (city) {
      setCities(statesAndCities[state] || []);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, propertyImages: files });

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const removeImage = (index) => {
    const updatedImages = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedImages);
    setFormData({
      ...formData,
      propertyImages: formData.propertyImages.filter((_, i) => i !== index),
    });
  };

  const handleLandSizeChange = (e) => {
    const size = e.target.value;
    setLandSize(size);

    const results = convertLandSize(size, landSizeUnit);
    setConversionResults(results);
  };

  const handleLandSizeUnitChange = (e) => {
    setLandSizeUnit(e.target.value);
    if (landSize) {
      const results = convertLandSize(landSize, e.target.value);
      setConversionResults(results);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    
    try {
      const url = `http://localhost:8080/api/v1/property/user-id/254`;
    
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log('Property registered successfully:', data);
        alert('Property registered successfully!');
      } else {
        // Improved error handling
        const errorData = await response.json();
        // console.error('Error in registration:', errorData); // Log full error data
        const errorMessage = errorData.message || 'Unknown error occurred';
        alert("Error in registration: " + errorMessage);
      }
    } catch (error) {
      console.error('Network error:', error); // Log network error details
      alert('Network error. Please try again later.');
    }
  };
  
  return (
    <Layout showFooter={!showForm}>
      <div className='sell'>
        <section className="sell-property-section">
          <div className="sell-property-options">
            <h3 className="sell-property-title">Sell Your Property</h3>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Close Form' : 'Post Your Property for Sale'}
            </button>
            
            {showForm && (
              <div className="sell-property-form-container">
                <h3 className="form-title">Property Registration</h3>
                <form className="sell-property-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="propertyAddress">Property Address</label>
                    <input 
                      type="text" 
                      name="propertyAddress" 
                      id="propertyAddress"
                      className="form-control" 
                      value={formData.propertyAddress} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="propertyState">State</label>
                    <select 
                      name="propertyState" 
                      id="propertyState"
                      className="form-control" 
                      value={formData.propertyState} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="propertyCity">City</label>
                    <select 
                      name="propertyCity" 
                      id="propertyCity"
                      className="form-control" 
                      value={formData.propertyCity} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="">Select City</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="propertyZipCode">Zip Code</label>
                    <input 
                      type="text" 
                      name="propertyZipCode" 
                      id="propertyZipCode"
                      className="form-control" 
                      value={formData.propertyZipCode} 
                      onChange={handleZipCodeChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="propertySize">Size</label>
                    <input 
                      type="text" 
                      name="propertySize" 
                      id="propertySize"
                      className="form-control" 
                      value={formData.propertySize} 
                      onChange={handleChange} 
                      required 
                    />
                    <div className="land-size-calculator">
                      <label htmlFor="landSize">Land Size</label>
                      <input 
                        type="number" 
                        id="landSize"
                        value={landSize}
                        onChange={handleLandSizeChange}
                        placeholder="Enter size"
                      />
                      <select value={landSizeUnit} onChange={handleLandSizeUnitChange}>
                        <option value="Square Feet">Square Feet</option>
                        <option value="Acre">Acre</option>
                        <option value="Guntha">Guntha</option>
                      </select>
                      <div className="conversion-results">
                        <p><strong>Conversion Results:</strong></p>
                        {landSizeUnit === 'Guntha' && (
                          <>
                            <p>Acres: {conversionResults.acres?.toFixed(2)}</p>
                            <p>Square Feet: {conversionResults.squareFeet?.toFixed(2)}</p>
                            <p>Square Meters: {conversionResults.squareMeters?.toFixed(2)}</p>
                          </>
                        )}
                        {landSizeUnit === 'Acre' && (
                          <>
                            <p>Gunthas: {conversionResults.gunthas?.toFixed(2)}</p>
                            <p>Square Feet: {conversionResults.squareFeet?.toFixed(2)}</p>
                            <p>Square Meters: {conversionResults.squareMeters?.toFixed(2)}</p>
                          </>
                        )}
                        {landSizeUnit === 'Square Feet' && (
                          <>
                            <p>Gunthas: {conversionResults.gunthas?.toFixed(2)}</p>
                            <p>Acres: {conversionResults.acres?.toFixed(2)}</p>
                            <p>Square Meters: {conversionResults.squareMeters?.toFixed(2)}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="propertyStatus">Status</label>
                    <select 
                      name="propertyStatus" 
                      id="propertyStatus"
                      className="form-control" 
                      value={formData.propertyStatus} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="propertyPrice">Price</label>
                    <input 
                      type="text" 
                      name="propertyPrice" 
                      id="propertyPrice"
                      className="form-control" 
                      value={formData.propertyPrice} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="propertyImages">Images</label>
                    <input 
                      type="file" 
                      name="propertyImages" 
                      id="propertyImages"
                      className="form-control" 
                      onChange={handleImageChange} 
                      multiple 
                      required
                    />
                    <div className="image-previews">
                      {imagePreviews.map((src, index) => (
                        <div key={index} className="image-preview">
                          <img src={src} alt={`Property Preview ${index + 1}`} />
                          <button type="button" onClick={() => removeImage(index)}>&times;</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button 
                    type="button" 
                    className="close-button" 
                    onClick={() => setShowForm(false)}
                  >
                    &times;
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SellProperty;


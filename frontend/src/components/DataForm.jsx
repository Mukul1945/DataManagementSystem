import React, { useState } from 'react';
import API from '../api'; // Import your Axios instance

const DataForm = ({ setDataList }) => {
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting data:', formData); // Log form data

        setLoading(true); // Set loading state

        // Make POST request to add data
        API.post('/data', formData)
            .then(response => {
                alert(response.data.message); // Show success message
                setFormData({ name: '', description: '' }); // Reset form fields
                setLoading(false); // Reset loading state

                // Re-fetch and update data
                API.get('/data')
                    .then(response => {
                        setDataList(response.data); // Update the list with new data
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        setError('Failed to load data');
                    });
            })
            .catch(error => {
                console.error('Error adding data:', error);
                setError('Failed to save data'); // Set error state
                setLoading(false); // Reset loading state
            });
    };

    return (
        <div>
            <h2>Add New Data</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Add'} {/* Show loading state */}
                </button>
            </form>
        </div>
    );
};

export default DataForm;



// import React, { useState, useEffect } from 'react';
// import API from '../api'; // Import Axios instance

// const DataForm = () => {
//     const [formData, setFormData] = useState({ name: '', description: '' });
//     const [dataList, setDataList] = useState([]); // State to store the list of data
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Fetch data when the component loads (only once on mount)
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await API.get('/data'); // Make GET request to fetch data
//                 setDataList(response.data); // Set the fetched data to the state
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setError('Failed to load data');
//             }
//         };

//         fetchData(); // Call fetchData when the component mounts
//     }, []); // Empty dependency array ensures this only runs once when the component mounts

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log('Submitting data:', formData);

//         setLoading(true); // Set loading state to true

//         try {
//             const response = await API.post('/data', formData); // Post new data to the backend
//             alert(response.data.message); // Show success message
//             setFormData({ name: '', description: '' }); // Reset form fields
//             setLoading(false); // Reset loading state

//             // Add new data to the list only if it's not already there
//             setDataList((prevList) => {
//                 if (!prevList.some(item => item._id === response.data.data._id)) {
//                     return [...prevList, response.data.data]; // Avoid duplicates
//                 }
//                 return prevList;
//             });
//         } catch (error) {
//             console.error('Error adding data:', error);
//             setError('Failed to save data');
//             setLoading(false); // Reset loading state
//         }
//     };

//     return (
//         <div>
//             <h2>Add New Data</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Name"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Description"
//                     required
//                 />
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Submitting...' : 'Add'} {/* Show loading state */}
//                 </button>
//             </form>

//             {/* Display Data List only if there is data */}
//             {dataList.length > 0 && (
//                 <>
//                     <h2>Data List</h2>
//                     <ul>
//                         {dataList.map((data) => (
//                             <li key={data._id}>{data.name}: {data.description}</li> // Display each item in the list
//                         ))}
//                     </ul>
//                 </>
//             )}

//             {/* Show message when no data is available */}
//             {dataList.length === 0 && <p>No data available.</p>}
//         </div>
//     );
// };

// export default DataForm;

// import React, { useState, useEffect } from 'react';
// import API from '../api'; // Import Axios instance

// const DataList = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         // Fetch data from backend
//         API.get('/data')
//             .then(response => {
//                 setData(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);

//     return (
//         <div>
//             <h2>Data List</h2>
//             <ul>
//                 {data.map(item => (
//                     <li key={item._id}>
//                         {item.name}: {item.description}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default DataList;
import React from 'react';

const DataList = ({ data }) => {
    return (
        <div>
            <h2>Data List</h2>
            <ul>
                {data.length > 0 ? (
                    data.map(item => (
                        <li key={item._id}>
                            {item.name}: {item.description}
                        </li>
                    ))
                ) : (
                    <p>No data available.</p> // Show message when no data
                )}
            </ul>
        </div>
    );
};

export default DataList;

import React, { useState, useEffect } from 'react';
import DataList from './components/DataList';
import DataForm from './components/DataForm';
import API from './api'; // Ensure you have the API instance configured

const App = () => {
    const [dataList, setDataList] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('/data');
                setDataList(response.data); // Set the data to state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(); // Fetch data initially
    }, []); // Empty dependency array means this will run only once when the component mounts

    return (
        <div>
            <h1>React-Backend Integration</h1>
            <DataForm setDataList={setDataList} /> {/* Pass setDataList to DataForm */}
            <DataList data={dataList} setDataList={setDataList} /> {/* Pass dataList and setDataList to DataList */}
        </div>
    );
};

export default App;

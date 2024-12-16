import React, { useState } from 'react';
import API from '../api'; // Ensure your axios instance is imported

const DataList = ({ data, setDataList }) => {
    const [editData, setEditData] = useState({ name: '', description: '', id: null });

    // Handle Edit button click
    const handleEdit = (item) => {
        setEditData({ name: item.name, description: item.description, id: item._id });
    };

    // Handle Delete button click
    const handleDelete = (id) => {
        API.delete(`/data/${id}`)
            .then(response => {
                alert(response.data.message);
                // Remove deleted item from the state without re-fetching data
                setDataList(prevData => prevData.filter(item => item._id !== id));
            })
            .catch(error => {
                console.error('Error deleting data:', error);
                alert('Failed to delete data');
            });
    };

    // Handle Save/Edit form submission
    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (!editData.name || !editData.description) return; // Ensure both fields are filled

        API.put(`/data/${editData.id}`, editData)
            .then(response => {
                alert(response.data.message);
                setEditData({ name: '', description: '', id: null }); // Clear edit form
                // Update data state to reflect the edit in the UI
                setDataList(prevData =>
                    prevData.map(item =>
                        item._id === editData.id ? { ...item, name: editData.name, description: editData.description } : item
                    )
                );
            })
            .catch(error => {
                console.error('Error updating data:', error);
                alert('Failed to update data');
            });
    };

    return (
        <div>
            <h2>Data List</h2>
            <ul>
                {data.length > 0 ? (
                    data.map(item => (
                        <li key={item._id}>
                            {item.name}: {item.description}
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </ul>

            {editData.id && (
                <div>
                    <h3>Edit Data</h3>
                    <form onSubmit={handleSaveEdit}>
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            placeholder="Name"
                            required
                        />
                        <input
                            type="text"
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            placeholder="Description"
                            required
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default DataList;

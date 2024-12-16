import React, { useState } from 'react';
import API from '../api';

const DataForm = ({ setDataList }) => {
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Validation: Check for empty fields
        if (!formData.name.trim() || !formData.description.trim()) {
            setError('Both fields are required.');
            return;
        }

        setLoading(true);
        API.post('/data', formData)
            .then((response) => {
                alert(response.data.message);
                setFormData({ name: '', description: '' });
                setLoading(false);
                API.get('/data').then((res) => setDataList(res.data));
            })
            .catch((err) => {
                console.error('Error adding data:', err);
                setError('Failed to save data.');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Add New Data</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    {loading ? 'Submitting...' : 'Add'}
                </button>
            </form>
        </div>
    );
};

export default DataForm;

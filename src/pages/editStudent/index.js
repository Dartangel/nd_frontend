import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
    const { id: studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState({
        passport: null,
        diplom: null,
        image: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://185.230.64.36:3000/students/${studentId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }

                const data = await response.json();
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student:', error);
                setMessage('Error fetching student data');
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files: newFiles } = e.target;
        setFiles({ ...files, [name]: newFiles[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        for (const key in student) {
            formData.append(key, student[key]);
        }
        for (const key in files) {
            if (files[key]) {
                formData.append(key, files[key]);
            }
        }

        try {
            const response = await fetch(`http://185.230.64.36:3000/students/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setMessage('Student updated successfully');
                navigate(`/students/${studentId}`); // Перенаправляем обратно на страницу студента
            } else {
                const errorData = await response.json();
                setMessage(`Failed to update student: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating student:', error);
            setMessage('Error occurred while updating student');
        }
    };

    if (message) {
        return <div>{message}</div>;
    }

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        name="surname"
                        value={student.surname}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="parentName">Parent's Name</label>
                    <input
                        type="text"
                        name="parentName"
                        value={student.parentName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="study">Study</label>
                    <input
                        type="text"
                        name="study"
                        value={student.study}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="prof">Profession</label>
                    <input
                        type="text"
                        name="prof"
                        value={student.prof}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="year">Year</label>
                    <input
                        type="number"
                        name="year"
                        value={student.year}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="serviceCost">Service Cost</label>
                    <input
                        type="number"
                        name="serviceCost"
                        value={student.serviceCost}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="servicePayed">Service Payed</label>
                    <input
                        type="number"
                        name="servicePayed"
                        value={student.servicePayed}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="annualCost">Annual Cost</label>
                    <input
                        type="number"
                        name="annualCost"
                        value={student.annualCost}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="annualPayed">Annual Payed</label>
                    <input
                        type="number"
                        name="annualPayed"
                        onChange={handleChange}
                        value={student.annualPayed}
                        style={styles.input}
                    />
                </div>
                <div style={styles.fileUpload}>
                    <label htmlFor="passport">Upload Passport:</label>
                    <input type="file" name="passport" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
                </div>
                <div style={styles.fileUpload}>
                    <label htmlFor="diplom">Upload Diplom:</label>
                    <input type="file" name="diplom" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
                </div>
                <div style={styles.fileUpload}>
                    <label htmlFor="image">Upload Image:</label>
                    <input type="file" name="image" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
                </div>

                <button type="submit" style={styles.submitButton}>Update Student</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
    },
    fileUpload: {
        marginBottom: '15px',
    },
    fileInput: {
        marginTop: '5px',
        padding: '10px',
    },
    submitButton: {
        padding: '10px 15px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default EditStudent;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StudentDetail = () => {
    const { id: studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [message, setMessage] = useState('');
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

    const handleBackClick = () => {
        navigate('/main'); // Возвращаемся на предыдущую страницу
    };

    if (message) {
        return <div>{message}</div>;
    }

    if (!student) {
        return <div>Loading...</div>;
    }

    const handleEditClick = () => {
        navigate(`/edit-student/${studentId}`); // Переход на страницу редактирования
    };

    return (
        <div style={styles.container}>
            <button onClick={handleBackClick} style={styles.backButton}>← Back</button>
            <h2>Student Details</h2>
            <div style={styles.detail}>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Surname:</strong> {student.surname}</p>
                <p><strong>Parent's Name:</strong> {student.parentName}</p>
                <p><strong>Study:</strong> {student.study}</p>
                <p><strong>Profession:</strong> {student.prof}</p>
                <p><strong>Mobile:</strong> {student.mobile}</p>
                <p><strong>Parent mobile:</strong> {student.parentMobile}</p>
                <p><strong>Service Cost:</strong> {student.serviceCost}</p>
                <p><strong>Service Paid:</strong> {student.servicePayed}</p>
                <p><strong>Year:</strong> {student.year}</p>
                <p><strong>Annual Cost:</strong> {student.annualCost}</p> {/* Отображаем годовую оплату */}
                <p><strong>Annual Payed:</strong> {student.annualPayed}</p> {/* Отображаем годовую оплату */}
                {student.passport && <p><strong>Passport:</strong> <a href={`http://185.230.64.36:3000/${student.passport}`} target="_blank" rel="noopener noreferrer">View Passport</a></p>}
                {student.diplom && <p><strong>Diplom:</strong> <a href={`http://185.230.64.36:3000/${student.diplom}`} target="_blank" rel="noopener noreferrer">View Diplom</a></p>}
                {student.image && <p><strong>Image:</strong> <a href={`http://185.230.64.36:3000/${student.image}`} target="_blank" rel="noopener noreferrer">View Image</a></p>}
            </div>
            <button onClick={handleEditClick} style={styles.button}>Edit Student</button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '5px 10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    detail: {
        margin: '10px 0',
    },
    button: {
        padding: '10px 15px',
        marginTop: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default StudentDetail;

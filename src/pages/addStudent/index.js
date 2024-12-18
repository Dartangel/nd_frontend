import React, { useState, useEffect } from 'react';

export default function AddStudent() {
    const [student, setStudent] = useState({
        name: '',
        surname: '',
        parentName: '',
        study: '',
        mobile: '',
        parentMobile: '',
        prof: '',
        payed: 0, // Оплаченная сумма
        year: 2024, // Год обучения
        annualCost: 0, // Стоимость обучения на год
        servicePayed: 0, // Оплата при вступлении
        serviceCost: 0, // Стоимость сервиса компании
        annualPayed: 0, // Годовая оплата
    });

    const [passportFile, setPassportFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [diplomFile, setDiplomFile] = useState(null);
    const [message, setMessage] = useState('');

    const currentYear = new Date().getFullYear(); // Получаем текущий год

    useEffect(() => {
        // Пример того, как обновить стоимость для нового учебного года
        // Если выбран текущий год, обновляем стоимость
        if (student.year === currentYear) {
            setStudent({
                ...student,
                annualCost: 0, // Стоимость обучения на год
                servicePayed: 0, // Оплата при вступлении
                serviceCost: 0, // Стоимость сервиса компании
                annualPayed: 0, // Годовая оплата
            });
        }
    }, [student.year, currentYear]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const formData = new FormData();
        Object.keys(student).forEach((key) => {
            formData.append(key, student[key]);
        });

        // Добавляем файлы, если они были выбраны
        if (passportFile) formData.append('passport', passportFile);
        if (diplomFile) formData.append('diplom', diplomFile);
        if (imageFile) formData.append('image', imageFile);

        try {
            const response = await fetch('http://185.230.64.36:3000/students', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setMessage('Student added successfully');
                setStudent({
                    name: '',
                    surname: '',
                    parentName: '',
                    study: '',
                    prof: '',
                    payed: 0, // Задолженность обнуляется
                    year: currentYear, // Новый учебный год
                    mobile: '',
                    parentMobile: '',
                    annualCost: 0, // Стоимость обучения на год
                    servicePayed: 0, // Оплата при вступлении
                    serviceCost: 0, // Стоимость сервиса компании
                    annualPayed: 0, // Годовая оплата
                });
                setPassportFile(null);
                setDiplomFile(null);
                setImageFile(null);
            } else {
                const errorData = await response.json();
                setMessage(`Failed to add student: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error adding student:', error);
            setMessage('Error occurred while adding student');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Add Student</h2>
                {message && <p style={styles.message}>{message}</p>}

                {/* Поля формы */}
                <div style={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={student.name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        name="surname"
                        id="surname"
                        value={student.surname}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="parentName">Parent's Name</label>
                    <input
                        type="text"
                        name="parentName"
                        id="parentName"
                        value={student.parentName}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="study">Study</label>
                    <input
                        type="text"
                        name="study"
                        id="study"
                        value={student.study}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="prof">Profession</label>
                    <input
                        type="text"
                        name="prof"
                        id="prof"
                        value={student.prof}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="annualCost">Annual Cost</label>
                    <input
                        type="number"
                        name="annualCost"
                        id="annualCost"
                        value={student.cost}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="annualPayed">Annual Payed</label>
                    <input
                        type="number"
                        name="annualPayed"
                        id="annualPayed"
                        value={student.annualFee}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="serviceCost">Service Cost</label>
                    <input
                        type="number"
                        name="serviceCost"
                        id="serviceCost"
                        value={student.serviceCost}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="servicePayed">Service Payed</label>
                    <input
                        type="number"
                        name="servicePayed"
                        id="servicePayed"
                        value={student.cost}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="year">Year</label>
                    <input
                        type="number"
                        name="year"
                        id="year"
                        value={student.year}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        value={student.mobile}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="parentMobile">Parent mobile</label>
                    <input
                        type="text"
                        name="parentMobile"
                        id="parentModile"
                        value={student.parentMobile}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="passport">Upload Passport</label>
                    <input
                        type="file"
                        name="passport"
                        id="passport"
                        onChange={(e) => handleFileChange(e, setPassportFile)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="diplom">Upload Diplom</label>
                    <input
                        type="file"
                        name="diplom"
                        id="diplom"
                        onChange={(e) => handleFileChange(e, setDiplomFile)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="image">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={(e) => handleFileChange(e, setImageFile)}
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.button}>Add Student</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    message: {
        marginBottom: '15px',
        color: 'green',
    },
};

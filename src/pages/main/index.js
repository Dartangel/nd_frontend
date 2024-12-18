import React, { useEffect, useState } from 'react';
import logo from '../../nf_logo.png'; // Обнови путь к изображению
import { useNavigate, Link } from 'react-router-dom'; // Импортируем useNavigate и Link

const titles = ['Adi', 'Soyad', 'Ata adi', 'Gebul oldugu yer', 'Fakulte', 'Servis odenishi'];
const key = ['name', 'surname', 'parentName', 'study', 'prof', 'serviceCost'];

export default function MainScreen() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Создаем переменную для навигации

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token'); // Получаем токен

      try {
        const response = await fetch('http://185.230.64.36:3000/students', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Отправляем токен в заголовке
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []); // Запускаем один раз при монтировании компонента

  const handleAddStudent = () => {
    navigate('/addStudent'); // Переход на экран добавления студента
  };

  // Функция для проверки задолженности
  const hasDebt = (student) => {
    return student.servicePayed < student.serviceCost || student.annualCost > student.annuaPayed;
  };

  if (loading) {
    return <div style={styles.loading}>Загрузка...</div>; // Индикатор загрузки
  }

  if (error) {
    return <div style={styles.error}>Ошибка: {error}</div>; // Отображаем ошибку
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to</h1>
        <img
          src={logo} // Используем импортированный логотип
          alt="Logo"
          style={styles.logo}
        />
        <button onClick={handleAddStudent} style={styles.addButton}>Add Student</button>
      </header>
      <table style={styles.table}>
        <thead>
          <tr>
            {titles.map((title, index) => (
              <th key={index} style={styles.headerCell}>
                {title}
              </th>
            ))}
            <th style={styles.headerCell}>Actions</th> {/* Добавляем заголовок для кнопок действий */}
          </tr>
        </thead>
        <tbody>
          {students.map((user) => (
            <tr key={user._id} style={hasDebt(user) ? styles.debtRow : {}}>
              {key.map((field, fieldIndex) => (
                <td key={fieldIndex} style={styles.cell}>
                  {typeof user[field] === 'boolean' ? (user[field] ? 'V' : 'X') : user[field]}
                </td>
              ))}
              <td style={styles.cell}>
                <Link to={`/students/${user._id}`}>
                  <button style={styles.viewButton}>View Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  logo: {
    height: '200px',
    objectFit: 'contain',
    marginBottom: '15px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  table: {
    borderCollapse: 'collapse',
    width: '80%',
  },
  headerCell: {
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  cell: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    marginTop: '20px',
  },
  error: {
    textAlign: 'center',
    marginTop: '20px',
    color: 'red',
  },
  viewButton: {
    padding: '5px 10px',
    backgroundColor: '#28A745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  debtRow: {
    backgroundColor: '#ffcccc', // Красный фон для студентов с задолженностью
  }
};

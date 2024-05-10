import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Yellow from './Yellow';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  async function fetch() {
    try {
      let authtoken = localStorage.getItem('authtoken');

      const headers = {
        'Content-Type': 'application/json',
        'auth-token': authtoken,
      };
      const response = await axios.get('http://localhost:8000/api/employee/getEmployee', { headers });

      setTableData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('No response:', error.request);
      } else {
        console.error('Axios error:', error.message);
      }
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      let authtoken = localStorage.getItem('authtoken');

      const headers = {
        'Content-Type': 'application/json',
        'auth-token': authtoken,
      };
      await axios.post('http://localhost:8000/api/employee/deleteEmployee', { id }, { headers });
      fetch();
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('No response:', error.request);
      } else {
        console.error('Axios error:', error.message);
      }
    }
  };

  const handleEdit = (data) => {
    navigate('/createemp', { state: data });
  };

  const handleSearch = () => {
    const searchTextLower = searchText.toLowerCase();

    const filtered = tableData.filter(
      (data) =>
        data.name.toLowerCase().includes(searchTextLower) ||
        data.email.toLowerCase().includes(searchTextLower) ||
        new Date(data.date).toDateString().toLowerCase().includes(searchTextLower)
    );

    setFilteredData(filtered);
  };

  return (
    <div>
      <Navbar />
      <div>
        <Yellow name="home" />
        <div className='flex justify-center pr-24 py-16 font-bold text-xl'>
          Welcome to Admin Panel
        </div>
        <div className="table">
          <div className='flex justify-center ' >

          <input className='border border-black' type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)} />
          <button className=' border border-black  ' onClick={handleSearch}>Search</button>
          </div>
          <div className='flex justify-center w-[100vw]'>

          {filteredData.length > 0 && (
            <table className=''>
              <thead>
                <tr className='p-3' >
                  <th >name</th>
                   <th className='p-2'>email</th>
                   <th className='p-2'>mobile</th>
                   <th className='p-2'>designation</th>
                   <th className='p-2'>course</th>
                   <th className='p-2'>gender</th>
                   <th className='p-2'>image</th>
                   <th className='p-2'>date</th>
                   <th className='p-2'>action</th>
                </tr>
              </thead>
              <tbody className='p-3 m-4  '>
                {filteredData.map((data, index) => (
                  <tr key={index} className='p-4'>
                    <td className='p-2'>{data.name}</td>
                     <td className='p-2'>{data.email}</td>
                     <td className='p-2'>{data.mobile}</td>
                     <td className='p-2'>{data.designation}</td>
                     <td className='p-2'>{data.course}</td>
                     <td className='p-2'>{data.gender}</td>
                     <td className='p-2'>
                      <img className='w-8 h-8' src={data.image} alt='' />
                    </td>
                     <td className='p-2'>{new Date(data.date).toDateString()}</td>
                    <td className='p-3' >
                      <span className='p-1 border border-black ' onClick={() => handleEdit(data)}>edit</span>{' '}
                      <span className='p-1 border border-black ' onClick={() => handleDelete(data._id)}>delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
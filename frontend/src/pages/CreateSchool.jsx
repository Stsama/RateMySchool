import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'

const CreateSchool = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [location, setLocation] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const {currentUser } = useContext(UserContext)
  const token = currentUser?.token

  // redirect user to login page if not logged in
  useEffect(() => {
    if(!token) { 
      navigate('/login')
    }
  })

  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = ['header', 'bold', 'italic', 'underline', 'list', 'link', 'image', 'video', 'code-block']

  const SCHOOL_CATEGORIES = ['Primary', 'Secondary', 'High School', 'University', 'Uncategorized']

  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('name', name);
    postData.set('category', category);
    postData.set('location', location);
    postData.set('address', address);
    postData.set('description', description);
    postData.set('phoneNumber', phoneNumber);
    postData.append('thumbnail', thumbnail);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/schools/`, postData, 
        {
    withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      if (response.status === 201) {
        navigate(`/schools/users/${currentUser?.id}`)
      }
    } catch (error) {
      setError(error?.response?.data?.message)
    }
  }

  
  return (
    <section className="create-post">
      <div className="container">
        <h2>Create a new school</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form" onSubmit={createPost}>
          <input type="text" placeholder='Enter school name' value={name} onChange={e => setName(e.target.value)} />
          <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
            {
              SCHOOL_CATEGORIES.map(category => <option key={category}>{category}</option>)
            }
          </select>
          <input type="text" placeholder='Enter school location' value={location} onChange={e => setLocation(e.target.value)}/>
          <input type="text" placeholder='Enter school The address' value={address} onChange={e => setAddress(e.target.value)}/>
          <input type="tel" placeholder='Enter school phone number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'/>
          <ReactQuill theme='snow' value={description} onChange={setDescription} modules={modules} formats={formats} placeholder='Enter school description' />
          <button type='submit' className='btn primary'>Create school</button>
        </form>
      </div>
    </section>
  )
}

export default CreateSchool
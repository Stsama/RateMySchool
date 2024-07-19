import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EditSchool = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [owner, setOwner] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const navigate = useNavigate()

  const {currentUser } = useContext(UserContext)
  const token = currentUser?.id

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

  
  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit a school</h2>
        <p className="form__error-message">
          This is an error message
        </p>
        <form className="form create-post__form">
          <input type="text" placeholder='Enter school name' name='name' value={name} onChange={e => setName(e.target.value)} />
          <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
            {
              SCHOOL_CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)
            }
          </select>
          <input type="text" placeholder='Enter school location' name='location' value={location} onChange={e => setLocation(e.target.value)}/>
          <input type="text" placeholder='Enter school Owner' name='owner' value={owner} onChange={e => setOwner(e.target.value)}/>
          <input type="tel" placeholder='Enter school phone number' name='phoneNumber' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
          <input type="file" name={thumbnail} onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'/>
          <ReactQuill theme='snow' value={description} onChange={setDescription} modules={modules} formats={formats} placeholder='Enter school description' />
          <button type='submit' className='btn primary'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditSchool
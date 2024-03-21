import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrashAlt, FaRegCopy, FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

    const [form, setForm] = useState({ website: "", username: "", password: "", id: "" })
    const [data, setData] = useState([])
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        if (editingItem !== null) {
            setForm(editingItem);
        }
    }, [editingItem]);


    useEffect(() => {
        const passData = localStorage.getItem('passData');
        if (passData) {
            setData(JSON.parse(passData));
        }
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedData;
        if (!form.id) {
            form.id = uuidv4();
            updatedData = [...data, form];
            toast.success('Password added successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            updatedData = data.map((item) => (item.id === form.id ? form : item));
            toast.success('Password updated successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setData(updatedData);
        localStorage.setItem("passData", JSON.stringify(updatedData));
        setForm({ website: "", username: "", password: "", id: "" });
        setEditingItem(null);
    }

    // console.log(data);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleEdit = (id) => {
        const itemToEdit = data.find((item) => item.id === id);
        if (itemToEdit) {
            setForm(itemToEdit);
        }
    }

    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        toast.success('Password deleted successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setData(updatedData);
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />

            <div className="container sm:mx-auto flex flex-col justify-center sm:w-2/3 gap-7">
                <div className='text-center'>
                    <h1 className='text-3xl font-bold text-blue-600 mt-7'>PassOp</h1>
                    <p>Your Own Password Manager</p>
                </div>

                <div className='w-full'>
                    <input name="website" type="text" required placeholder='Enter website URL' value={form.website} onChange={handleChange} minLength={3} className='border-2 border-green-800 w-full rounded-full px-4' />
                </div>

                <div className="w-full flex sm:flex-row flex-col sm:gap-12 gap-7">
                    <input name="username" type="text" required placeholder='Enter username' value={form.username} onChange={handleChange} minLength={3} className='border-2 border-green-800 sm:w-[75%] rounded-full px-4' />
                    <input name="password" type="text" required placeholder='Enter password' value={form.password} onChange={handleChange} minLength={3} className='border-2 border-green-800 sm:w-[20%] rounded-full px-4' />
                </div>

                <div className='flex justify-center'>
                    <button onClick={handleSubmit} disabled={form.website.length < 3 || form.username.length < 3 || form.password.length < 3} className='bg-green-500 p-8 py-3 rounded-full hover:bg-green-700' >Save</button>
                </div>

                <div className=''>
                    <h1 className='font-bold text-xl text-center sm:text-start'>Your Passwords</h1>
                </div>

                {/* <div className='w-full'>
                    <div className='w-full bg-green-900 rounded-t-md h-8 grid grid-cols-2 items-center justify-around text-white '>
                        <div className='text-center'>Site</div>
                        <div className='grid grid-cols-3 items-center justify-around'>
                            <div className='text-center'>Username</div>
                            <div className='text-center'>Password</div>
                            <div className="text-center">Actions</div>
                        </div>
                    </div>

                    {data.map((web, index) => (
                        <div key={index} className='w-full bg-green-200 h-8 grid grid-cols-2 items-center justify-around'>
                            <div className='text-center flex justify-center items-center'>{web.website}<span className='mx-2'><FaRegCopy /></span></div>
                            <div className='grid grid-cols-3 items-center justify-around'>
                                <div className='text-center'>{web.username}</div>
                                <div className='text-center'>{web.password}</div>
                                <div className="text-center">
                                    <button className='mx-2'><FaEdit /></button>
                                    <button><FaTrashAlt /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}

                <div className='w-full overflow-x-auto'>
                    <table className='w-full bg-green-900 rounded-md text-white'>
                        <thead>
                            <tr className='grid grid-cols-1 md:grid-cols-2'>
                                <th className='text-center py-2'>Site</th>
                                <th className='grid grid-cols-1 sm:grid-cols-3 items-center justify-around'>
                                    <div className='text-center'>Username</div>
                                    <div className='text-center'>Password</div>
                                    <div className="text-center">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((web, index) => (
                                <tr key={index} className='bg-green-200 text-black grid grid-cols-1 md:grid-cols-2'>
                                    <td className='text-center py-2 flex justify-center items-center'><a href={web.website} target='_blank'>{web.website}</a><span className='mx-2 cursor-pointer' onClick={() => { handleCopy(web.website) }}><FaCopy /></span></td>
                                    <td className='grid grid-cols-1 sm:grid-cols-3 items-center justify-around'>
                                        <div className='text-center flex justify-center items-center'>{web.username}<span className='mx-2 cursor-pointer' onClick={() => { handleCopy(web.username) }}><FaCopy /></span></div>
                                        <div className='text-center flex justify-center items-center'>{web.password}<span className='mx-2 cursor-pointer' onClick={() => { handleCopy(web.password) }}><FaCopy /></span></div>
                                        <div className="text-center">
                                            <button className='mx-2' onClick={() => { handleEdit(web.id) }}><FaEdit /></button>
                                            <button onClick={() => { handleDelete(web.id) }}><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>




            </div>
        </>
    )
}

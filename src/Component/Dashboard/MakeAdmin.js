import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
    // hook form
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const adminInfo = {
            name: data.name,
            email: data.email
        }
        // date send to server post method
        fetch('https://polar-woodland-95265.herokuapp.com/admin_list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminInfo)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    window.alert('Add admin successfully');
                }
            })
        reset();
    };

    return (
        <section>
            <div className='container-fluid d-flex justify-content-around align-items-center py-4 text-white' style={{ background: '#f0ad4e' }}>
                <h2 className='text-uppercase fw-bold my-0'>make an admin</h2>
                <h4 className='my-0'>dashboard/makeAdmin</h4>
            </div>

            <div style={{ marginTop: '100px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-5 p-5" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px' }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label className='text-uppercase mb-1'>
                                    <h6 className='fw-bold'>Admin Name</h6>
                                </label>
                                <input type="text" name="name" id="" {...register("name")} className='form-control rounded-0 py-3' placeholder='Enter Admin Name' />
                            </div>
                            <div className="form-group my-4">
                                <label className='text-uppercase mb-1'>
                                    <h6 className='fw-bold'>Admin Email</h6>
                                </label>
                                <input type="email" name="email" id="" {...register("email")} className='form-control rounded-0 py-3' placeholder='Enter Admin Email' />
                            </div>

                            <div className="form-group">
                                <input type="submit" id="" className='btn btn-outline-success rounded-0 py-2 px-5' value="SUBMIT" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAdmin;
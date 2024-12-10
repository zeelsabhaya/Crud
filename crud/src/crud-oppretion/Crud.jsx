import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

const Crud = () => {
    const getData = () => {
        return JSON.parse(localStorage.getItem('employee')) || []
    }
    const [inputForm, setInputForm] = useState({
        id: "",
        Number: "",
        firstName: "",
        Surname: "",
        Email: "",
        salary: "",
        Phone: "",
        Age: ""
    });
    const [isEdit, setIsEdit] = useState(false);
    const [storage, setStorage] = useState(getData());

    const handelChange = (e) => {
        const { name, value } = e.target;
        setInputForm({ ...inputForm, [name]: value });
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        if (!isEdit) {
            let id = Math.floor(Math.random() * 10000);
            setStorage([...storage, { ...inputForm, id: id }]);
        } else {
            const updateRec = storage.map((emp) => {
                if (emp.id === inputForm.id) {
                    return inputForm
                } else {
                    return emp;
                }
            })
            setStorage(updateRec);
            setIsEdit(false)
        }
        setInputForm({
            id: "",
            Number: "",
            firstName: "",
            Surname: "",
            Email: "",
            salary: "",
            Phone: "",
            Age: ""
        })
    }
    const handelEdit = (id) => {
        const empRec = (storage.find((emp) => emp.id == id));
        setInputForm(empRec);
        setIsEdit(true);
    }

    const handelDelete = (id) => {
        // console.log(id)
        const deleteRec = storage.filter((emp) => emp.id !== id)
        // console.log(deleteRec)
        setStorage(deleteRec)
    }
    useEffect(() => {
        localStorage.setItem('employee', JSON.stringify(storage));
    }, [storage])

    return (
        <>
            <Container className="pt-4">
                <div className="d-flex justify-content-center align-items-start">
                    <Col xs={5} className="me-4">
                        <form onSubmit={handelSubmit} className="border p-5 d-flex flex-column rounded-5 justify-content-center align-items-center bg-black text-white">
                            <h1 className="text-center mb-3 fw-bold text-white">Hospital Employer</h1>
                            <div className="mb-3">
                                <input type="text" className="d-none" name="id" value={inputForm.id} disabled />
                            </div>
                            <div className="mb-3">
                                <label className="">Employee Number :- </label>
                                <input type="text" name="Number" className="ms-2" value={inputForm.Number} onChange={handelChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="me-3">First Name :- </label>
                                <input type="text" name="firstName" className="ms-5" value={inputForm.firstName} onChange={handelChange}  required/>
                            </div>
                            <div className="mb-3">
                                <label className="me-4">Surname :- </label>
                                <input type="text" name="Surname" className="ms-5" value={inputForm.Surname} onChange={handelChange} required/>
                            </div>
                            <div className="mb-3">
                                <label className="me-5">Email :- </label>
                                <input type="email" name="Email" className="ms-5" value={inputForm.Email} onChange={handelChange} required/>
                            </div>
                            <div className="mb-3">
                                <label className="me-5">salary :- </label>
                                <input type="text" name="salary" className="ms-5" value={inputForm.salary} onChange={handelChange} required/>
                            </div>
                            <div className="mb-3">
                                <label className="me-5">Phone:- </label>
                                <input type="text" name="Phone" className="ms-5" value={inputForm.Phone} onChange={handelChange} required/>
                            </div>
                            <div className="mb-3">
                                <label className="me-5">Age :- </label>
                                <input type="text" name="Age" className="ms-5" value={inputForm.Age} onChange={handelChange} required/>
                            </div>
                            <button type="submit" className="w-25 mt-5 rounded bg-primary text-white p-2 fw-bold border-primary-subtle" >{isEdit ? "Update" : "Add"}</button>
                        </form>
                    </Col>

                    <Col xs={9} className="ms-4 overflow-auto" tbody >

                        <Table striped bordered hover>
                            <thead className="bg-black">
                                <tr>
                                    <th>index</th>
                                    <th>Employee Number</th>
                                    <th>First Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                    <th>salary</th>
                                    <th>Phone</th>
                                    <th>Age</th>
                                    <th>Edit</th>
                                    <th>Delete</th>

                                </tr>
                            </thead>
                            <tbody className="">
                                {
                                    storage.map((emp, index) => (
                                        <tr key={emp.id}>
                                            <td className="text-center">{++index}</td>
                                            <td className="text-center">{emp.Number}</td>
                                            <td className="text-center">{emp.firstName}</td>
                                            <td className="text-center">{emp.Surname}</td>
                                            <td className="text-center">{emp.Email}</td>
                                            <td className="text-center">{emp.salary}</td>
                                            <td className="text-center">{emp.Phone}</td>
                                            <td className="text-center">{emp.Age}</td>
                                            <td className="text-center"><button className="fw-bolder bg-success text-white rounded border border-secondary p-1 px-3" onClick={() => handelEdit(emp.id)}>Edit</button></td>
                                            <td className="text-center"><button className="fw-bolder bg-black text-white rounded p-1 px-3" onClick={() => handelDelete(emp.id)}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </div>


            </Container>

        </>

    )
};

export default Crud;
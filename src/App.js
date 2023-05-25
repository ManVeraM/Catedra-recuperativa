import React, { useState,useEffect } from "react";
import { Table, Button, Modal, Form, InputGroup } from "react-bootstrap";
import axios from "axios"

function App() {
  const url = "http://chatdoc.eastus.cloudapp.azure.com:8000/api/form/";
  const [users, SetUsers] = useState([]);
  const [show, SetShow] = useState(false);
  const[search, SetSearch] = useState("");
  const handleClose = () => SetShow(false);
  const handleShow = () => SetShow(true);

  const ShowData = async() =>{
    const response = await fetch(url)
    const data = await response.json()
    SetUsers(data)
  }

  const searcher = (e) => {
    SetSearch(e.target.value)   
}
const results = !search ? users : users.filter((dato)=> dato.code.toLowerCase().includes(search.toLocaleLowerCase()))
   useEffect( ()=> {
    ShowData()
  }, [])

const AgregarItem = async(e) =>{
  e.preventDefault();
  console.log("",2)
  const newItem = {
    code:"",
    name:"",
    description:""
  }

  await axios.post(url, newItem)
    .then(response => {
      console.log("elemento creado:" + response.data)
      ShowData();
    }).catch(error =>{
      console.error("error al crear elemento", error);
    })
}

const deleteItem = async(id) =>{
  console.log("",2)
  await axios.delete(url+id)
    .then(response => {
      console.log("elemento eliminado:" + response.data);
      ShowData()
    }).catch(error =>{
      console.error("error al eliminar elemento", error);
    })
}

const updateItem = async(id) =>{
  console.log("",2)
  const newItem = {
    code:"",
    name:"",
    description:""
  }

  await axios.put(url+id, newItem)
    .then(response => {
      console.log("elemento modificado:" + response.data)
      ShowData();
    }).catch(error =>{
      console.error("error al modificar elemento", error);
    })
}


  

  

  return (
    <>
    <div className="p-3">
    <h1 className="text-center mt-4 mb-4">Formularios</h1>
      <div class="row">
        <div class="col-2">
          <Button variant="primary" onClick={handleShow} className="mb-2">
            Añadir
          </Button>
        </div>
        <div class="col-10">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Buscar en formularios"
              aria-label="Buscar en formularios"
              aria-describedby="basic-addon2"
              value={search} onChange={searcher}
            />
            <Button variant="outline-secondary" id="button-addon2">
              Buscar
            </Button>
          </InputGroup>
        </div>
      </div>

      <Table striped bordered hover>
        <thead className="bg-secondary text-white">
          
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map( (user) => (
          <tr>
            <td>{user.code} </td>
            <td>{user.name} </td>
            <td>{user.description} </td>
            <td><Button variant="primary" onClick={handleShow} className="mb-2">Actualizar</Button>
            <Button variant="primary" onClick={()=>deleteItem(user.id)} className="mb-2">Borrar</Button></td>
          </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir nuevo formulario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AgregarItem}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control type="text" placeholder="Código" />
              <Form.Text className="text-muted">Error código</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" />
              <Form.Text className="text-muted">Error Nombre</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripcción</Form.Label>
              <Form.Control type="text" placeholder="Descripcción" />
              <Form.Text className="text-muted">Error Descripcción</Form.Text>
            </Form.Group>

            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    
    </>
  );
}

export default App;

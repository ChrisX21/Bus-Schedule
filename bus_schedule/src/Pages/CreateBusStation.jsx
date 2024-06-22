import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CreateBusStation() {
    const [stationName, setStationName] = useState('');
    const [buses, setBuses] = useState([{ busNumber: '', time: '' }]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddBus = () => {
        setBuses([...buses, { busNumber: '', time: '' }]);
    };

    const handleBusChange = (index, event) => {
        const newBuses = buses.map((bus, busIndex) => {
            if (index !== busIndex) return bus;
            return { ...bus, [event.target.name]: event.target.value };
        });
        setBuses(newBuses);
    };

    const handleRemoveBus = (index) => {
        setBuses(buses.filter((_, busIndex) => busIndex !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (stationName.trim() === '' || buses.some(bus => bus.busNumber.trim() === '' || bus.time.trim() === '')) {
            setError('Please fill out all fields.');
            return;
        }

        const busData = buses.reduce((acc, bus) => {
            acc[bus.busNumber] = parseInt(bus.time);
            return acc;
        }, {});

        const newStation = {
            name: stationName,
            buses: busData
        };

        try {
            const response = await fetch('http://localhost:3030/jsonstore/bus/businfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(newStation)
            });

            if (response.ok) {
                navigate('/');
            } 
            else {
                throw new Error('Failed to create new bus station');
            }
        } 
        catch (error) {
            setError('Failed to create new bus station');
        }
    };

    return (
        <FormContainer>
            <h2>Create New Bus Station</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <Label>Station Name:<Input type="text" value={stationName} onChange={(e) => setStationName(e.target.value)} /></Label>
                {buses.map((bus, index) => (
                    <BusInputGroup key={index}>
                        <Label>Bus Number:<Input type="text" name="busNumber" value={bus.busNumber} onChange={(e) => handleBusChange(index, e)} /></Label>
                        <Label>Time:<Input type="number" name="time" value={bus.time} onChange={(e) => handleBusChange(index, e)} /></Label>
                        <RemoveBusButton type="button" onClick={() => handleRemoveBus(index)}>Remove</RemoveBusButton>
                    </BusInputGroup>
                ))}
                <AddBusButton type="button" onClick={handleAddBus}>Add Another Bus</AddBusButton>
                <SubmitButton type="submit">Create Bus Station</SubmitButton>
            </Form>
        </FormContainer>
    );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const BusInputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const AddBusButton = styled.button`
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  background-color: #61dafb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #21a1f1;
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #61dafb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #21a1f1;
  }
`;

const RemoveBusButton = styled.button`
  padding: 0.5rem;
  margin-left: 1rem;
  background-color: red;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: darkred;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

export default CreateBusStation;

import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import fetchQuestions from '../store/actions/questions';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import {newUser} from "../store/actions/user";
import Test from './Test';
import './Mcq.css';

const Mcq = () => {
    const [name, setName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);


    const handleInput = (e) => {
        setName(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name) {
            dispatch(newUser(name));
            setIsSubmitted(!isSubmitted);
            setName('')
        }
    };

    if(isSubmitted) {
        return <Test/>
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' content='MCQ APP' color='teal' textAlign='center'/>
                <Form size='large'>
                    <Segment raised>
                        <Form.Input fluid icon='user' iconPosition='left'
                                    placeholder='Enter Your Name'
                                    onChange={handleInput}
                        />
                        <Button color='teal'
                                fluid size='large'
                                onClick={handleSubmit}
                                content='Submit'
                        />
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
};


export default Mcq;
import React from 'react';
import {connect} from 'react-redux';
import fetchQuestions from '../store/actions/questions';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import {newUser} from "../store/actions/user";
import Test from './Test';
import './Mcq.css';

class Mcq extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        isSubmitted: false
    }
  }

  componentDidMount() {
      this.props.fetchQuestions();
  }

    handleInput = (e) => {
        this.setState({name: e.target.value})
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.name) {
            this.props.newUser(this.state.name);
            await this.setState({isSubmitted: !this.state.isSubmitted, name: ""});
        }
    };

  render() {
      const {questions} = this.props;
      if(this.state.isSubmitted) {
          return <Test questions={questions} />
      }
      return (
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as='h1' content='MCQ APP' color='teal' textAlign='center'/>
                  <Form size='large'>
                      <Segment raised>
                          <Form.Input fluid icon='user' iconPosition='left'
                                      placeholder='Enter Your Name'
                                      onChange={this.handleInput}
                          />
                          <Button color='teal'
                                  fluid size='large'
                                  onClick={this.handleSubmit}
                                  content='Submit'
                          />
                      </Segment>
                  </Form>
              </Grid.Column>
          </Grid>
      )
  }
}


function mapStateToProps(state) {
  return {
    questions: state.questions
  }
}

export default connect(mapStateToProps,{fetchQuestions, newUser})(Mcq);

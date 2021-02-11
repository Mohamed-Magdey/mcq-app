import React from 'react';
import {connect} from 'react-redux';
// import fetchQuestions from './store/actions/questions';
import { Button, Form, Grid, Header, Segment, Radio } from 'semantic-ui-react';
import {newUser} from "./store/actions/user";

class Test extends React.Component {
    render() {
       return (
        <
        Form
        >
        <
        Form
            .
            Field
        >
        Selected
        value:
            </Form.Field>
        <Form
            .
            Field
        >
        <
        Radio
        label = 'Choose this'
        name = 'radioGroup'
        value = 'this'
            / >
            < /Form.Field>
            < Form.Field >
            < Radio
        label = 'Or that'
        name = 'radioGroup'
        value = 'that'
            / >
            < /Form.Field>
            < /Form>
    )
    }
}

class Mcq extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        isSubmitted: false
    }
  }

    handleInput = (e) => {
        this.setState({name: e.target.value})
    }

    handleSubmit = () => {
        this.props.newUser(this.state.name);
        this.setState({isSubmitted: !this.state.isSubmitted})
    }

  render() {
          if(this.state.isSubmitted) {
              console.log(this.props.user)
              return <Test />
          }
          return (
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                MCQ APP
             </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left'
                            placeholder='Enter Your Name'
                            onChange={this.handleInput}
                                />
                    <Button color='teal'
                            fluid size='large'
                            onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Segment>
              </Form>
          </Grid.Column>
        </Grid>
      )
  }
}


function mapStateToProps(state) {
  return {
    questions: state.questions,
      user: state.user
  }
}

export default connect(mapStateToProps,{newUser})(Mcq);

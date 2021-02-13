import React from "react";
import {Button, Container, Form, Header, Radio} from "semantic-ui-react";
import questions from "../store/reducers/questions";

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    handleNext = () => {
        const {index} = this.state;

        if(index < 4) {
            this.setState({index: this.state.index + 1})
        }
    }

    render() {
        const {user, questions} = this.props;
        const {index} = this.state;
        console.log(user)
        return (
            <Container>
                <Header as='h2' color='teal' content={`Welcome ${user.name}`} textAlign='center' backgroundcolor='teal' />
                <Form>
                    <Form.Field key={questions[index]._id}>
                        <b>Q{index}:</b> {questions[index].question}
                    </Form.Field>
                    {questions[index].answers.map((val, i) => (
                        <Form.Field key={i}>
                            <Radio
                                label = {val}
                                name = 'radioGroup'
                                value = {val}
                            />
                        </Form.Field>
                    ))}
                    <Button color='teal'
                            floated='left' size='medium'
                            onClick={this.handleNext}
                            content={index < 4 ? 'Next' : 'Submit'}
                    />
                </Form>
            </Container>
        )
    }
}

export default Test;
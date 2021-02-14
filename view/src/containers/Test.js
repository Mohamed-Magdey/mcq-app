import React from "react";
import {Button, Container, Form, Header, Radio, Modal, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {increment} from "../store/actions/user";
import End from '../components/End';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            answer: '',
            isSubmitted: false,
            text: ''
        }
    }

    handleChange = (e, {value}) => {
        this.setState({answer: value})
    };

    handleNext = (e) => {
        const {questions} = this.props;
        const {index, answer, isSubmitted} = this.state;
        let str = 'Wrong';

        if(e.target.innerText === 'Next') {
            if(answer === questions[index].correct) {
                this.props.increment(this.props.user.score + 2);
                str = 'Correct'
            }
            this.setState({index: this.state.index + 1, text: str})
        }

        if(e.target.innerText === 'Submit') {
            e.preventDefault();
            if(answer === questions[index].correct) {
                this.props.increment(this.props.user.score + 2);
                str = 'Correct'
            }
            this.setState({isSubmitted: !isSubmitted, text: str})
        }

    };

    render() {
        const {user, questions} = this.props;
        const {index, isSubmitted, answer, text} = this.state;
        let style = {
            h1: {
                backgroundColor: '#009c95',
                marginBottom: '2em',
                padding: '0.5rem',
                color: '#fff',
            }
        };
        if(isSubmitted) {
            return  <End user={user} />
        }
        return (
            <>
                <Header as='h1' style={style.h1} content={`Welcome ${user.name}`} textAlign='center' />
                <Container>
                    <Segment>
                        <Form>
                            <Form.Field key={questions[index]._id}>
                                <b>Q{index}:</b> {questions[index].question}
                            </Form.Field>
                            <Segment.Group>
                            {questions[index].answers.map((val, i) => (
                                <Segment key={i}>
                                    <Form.Field>
                                        <Radio
                                            label = {val}
                                            name = 'radioGroup'
                                            value = {val}
                                            checked={answer === val}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                </Segment>
                            ))}
                            </Segment.Group>
                            {this.state.answer && <Modal
                                size='tiny'
                                dimmer='inverted'
                                trigger={<Button color='teal'
                                                 size='medium'
                                                 onClick={this.handleNext}
                                                 content={index < 4 ? 'Next' : 'Submit'}
                                />}
                            >
                                <Modal.Content>
                                    <p>{text}! Your score is: {text === 'Correct' ? '+2' : '0'}</p>
                                </Modal.Content>
                            </Modal>}
                        </Form>
                    </Segment>
                </Container>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions,
        user: state.user,
    }
}

export default connect(mapStateToProps,{increment})(Test);
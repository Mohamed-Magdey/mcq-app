import React, {useState} from "react";
import {Button, Container, Form, Header, Radio, Modal, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {increment} from "../store/actions/user";
import End from '../components/End';
import {removeAnswer} from '../store/actions/questions';

const Test = () => {
    const [index, setIndex] = useState(0),
          [answer, setAnswer] = useState(''),
          [isSubmitted, setIsSubmitted] = useState(false),
          [text, setText] = useState({type: '', num: 0}),
          [count, setCount] = useState(1);

    const questions = useSelector(state => state.questions);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleChange = (e, {value}) => {
        setAnswer(value);
    };

    const handleNext = (e) => {
        let str = {type: 'Wrong', num: 0};

        if(e.target.innerText === 'Next') {
            if(answer === questions[index].correct) {
                if(count === 1) {
                    dispatch(increment(user.score + 2));
                    str.num = 2;
                } else {
                    dispatch(increment(user.score + 1));
                    str.num = 1;
                }
                str.type = 'Correct'
            }
            if(str.type === 'Wrong' && count === 1) {
                dispatch(removeAnswer(index, answer));
                setText(str);
                setCount(count - 1)
            } else {
                setIndex(index + 1);
                setText(str);
                setCount(1)
            }
        }

        if(e.target.innerText === 'Submit') {
            e.preventDefault();
            if(answer === questions[index].correct) {
                if(count === 1) {
                    dispatch(increment(user.score + 2));
                    str.type = 2;
                } else {
                    dispatch(increment(user.score + 1));
                    str.num = 1;
                }
                str.type = 'Correct'
            }
            if(str.type === 'Wrong' && count === 1) {
                dispatch(removeAnswer(index, answer));
                setText(str);
                setCount(count - 1)
            } else {
                setIsSubmitted(!isSubmitted);
                setText(str);
                setCount(1)
            }
        }

    };

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
                                            onChange={handleChange}
                                        />
                                    </Form.Field>
                                </Segment>
                            ))}
                            </Segment.Group>
                        {answer && <Modal
                            size='tiny'
                            dimmer='inverted'
                            closeOnDimmerClick={false}
                            trigger={<Button color='teal'
                                             size='medium'
                                             onClick={handleNext}
                                             content={index < 4 ? 'Next' : 'Submit'}
                            />}
                        >
                            <Modal.Content>
                                <p>{text.type}! Your score is: {text.type === 'Correct'? '+' : ''}{text.num}</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={() => setAnswer('')}>OK</Button>
                            </Modal.Actions>
                        </Modal>}
                        </Form>
                </Segment>
            </Container>
        </>
    )
};

export default Test;

// class Test extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             index: 0,
//             answer: '',
//             isSubmitted: false,
//             text: {
//                 type: '',
//                 num: 0
//             },
//             count: 1
//         }
//     }
//
//     handleChange = (e, {value}) => {
//         this.setState({answer: value})
//     };
//
//     handleNext = (e) => {
//         const {questions} = this.props;
//         const {index, answer, isSubmitted, count} = this.state;
//         let str = {type: 'Wrong', num: 0};
//
//         if(e.target.innerText === 'Next') {
//             if(answer === questions[index].correct) {
//                 if(count === 1) {
//                     this.props.increment(this.props.user.score + 2);
//                     str.num = 2;
//                 } else {
//                     this.props.increment(this.props.user.score + 1);
//                     str.num = 1;
//                 }
//                 str.type = 'Correct'
//             }
//             if(str.type === 'Wrong' && count === 1) {
//                 this.props.removeAnswer(index, answer);
//                 this.setState({text: str, count: count - 1})
//             } else {
//                 this.setState({index: index + 1, text: str, count: 1})
//             }
//         }
//
//         if(e.target.innerText === 'Submit') {
//             e.preventDefault();
//             if(answer === questions[index].correct) {
//                 if(count === 1) {
//                     this.props.increment(this.props.user.score + 2);
//                     str.type = 2;
//                 } else {
//                     this.props.increment(this.props.user.score + 1);
//                     str.num = 1;
//                 }
//                 str.type = 'Correct'
//             }
//             if(str.type === 'Wrong' && count === 1) {
//                 this.props.removeAnswer(index, answer);
//                 this.setState({text: str, count: count - 1})
//             } else {
//                 this.setState({isSubmitted: !isSubmitted, text: str,  count: 1})
//             }
//         }
//
//     };
//
//     render() {
//         const {user, questions} = this.props;
//         const {index, isSubmitted, answer, text} = this.state;
//
//         let style = {
//             h1: {
//                 backgroundColor: '#009c95',
//                 marginBottom: '2em',
//                 padding: '0.5rem',
//                 color: '#fff',
//             }
//         };
//         if(isSubmitted) {
//             return  <End user={user} />
//         }
//         return (
//             <>
//                 <Header as='h1' style={style.h1} content={`Welcome ${user.name}`} textAlign='center' />
//                 <Container>
//                     <Segment>
//                         <Form>
//                             <Form.Field key={questions[index]._id}>
//                                 <b>Q{index}:</b> {questions[index].question}
//                             </Form.Field>
//                             <Segment.Group>
//                                 {questions[index].answers.map((val, i) => (
//                                     <Segment key={i}>
//                                         <Form.Field>
//                                             <Radio
//                                                 label = {val}
//                                                 name = 'radioGroup'
//                                                 value = {val}
//                                                 checked={answer === val}
//                                                 onChange={this.handleChange}
//                                             />
//                                         </Form.Field>
//                                     </Segment>
//                                 ))}
//                             </Segment.Group>
//                             {this.state.answer && <Modal
//                                 size='tiny'
//                                 dimmer='inverted'
//                                 closeOnDimmerClick={false}
//                                 trigger={<Button color='teal'
//                                                  size='medium'
//                                                  onClick={this.handleNext}
//                                                  content={index < 4 ? 'Next' : 'Submit'}
//                                 />}
//                             >
//                                 <Modal.Content>
//                                     <p>{text.type}! Your score is: {text.type === 'Correct'? '+' : ''}{text.num}</p>
//                                 </Modal.Content>
//                                 <Modal.Actions>
//                                     <Button onClick={() => this.setState({answer: ''})}>OK</Button>
//                                 </Modal.Actions>
//                             </Modal>}
//                         </Form>
//                     </Segment>
//                 </Container>
//             </>
//         )
//     }
// }
//
// function mapStateToProps(state) {
//     return {
//         questions: state.questions,
//         user: state.user
//     }
// }
//
// export default connect(mapStateToProps,{increment, removeAnswer})(Test);
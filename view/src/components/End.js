import React from "react";
import {Card, Grid} from "semantic-ui-react";

const End = ({user}) => (
    <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
        <Grid.Column>
        <Card>
            <Card.Content header={user.name} style={{background: '#009c95'}}/>
            <Card.Content>
                <Card.Description>
                    Your score is {user.score}/10
                </Card.Description>
            </Card.Content>
        </Card>
        </Grid.Column>
    </Grid>
)

export default End;
import React from 'react'
import { Row, Col, Button } from 'reactstrap';

export default function TaskInfo(props) {
    const task = props.task
    console.log(task)
    return (
        <Row className="border rounded m-3">
            <Col>
                <Row>
                    <Col>
                        Name: {task.taskName}
                    </Col>
                    <Col>
                        Task Note: {task.taskNotes}
                    </Col>
                </Row>
                <Row>
                    <Col>Difficulty: {task.taskDifficulty}</Col>
                    {task.complete !=="1980-01-01T17:00:00.000Z" ? <Col>Completed!</Col> :
                        <Col>
                            <Button onClick={() => { props.handleTaskComplete(task) }}>Complete</Button>
                        </Col>
                    }
                </Row>

            </Col>
        </Row>

    )
}

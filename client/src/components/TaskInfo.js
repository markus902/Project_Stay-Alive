import React from 'react'
import { Row, Col, Button } from 'reactstrap';

export default function TaskInfo(props) {
    const task = props.task
    return  task.complete !== "1980-01-02T17:00:00.000Z" ? (<Row className="border rounded m-3" key={Math.random()}>
            <Col key={Math.random()}>
                <Row key={Math.random()}>
                    <Col key={Math.random()}>
                        Name: {task.taskName}
                    </Col>
                    <Col key={Math.random()}>
                        Task Note: {task.taskNotes}
                    </Col>
                </Row>
                <Row key={Math.random()}>
                    <Col key={Math.random()}>Difficulty: {task.taskDifficulty}</Col>
                    {task.complete !== "1980-01-01T17:00:00.000Z" ? <Col>Completed! <Button onClick={() => props.handleRemove(task)}>X</Button></Col> :
                        <Col key={Math.random()}>
                            <Button key={Math.random()} onClick={() => { props.handleTaskComplete(task) }}>Complete</Button>
                            <Button onClick={() => props.handleRemove(task)}>X</Button>
                        </Col>
                    }
                </Row>
            </Col>
        </Row>) : null
}
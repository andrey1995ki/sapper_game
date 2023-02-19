import React, {FC} from 'react';
import {Table} from "react-bootstrap";
import {LeadersData} from "../../../store/leaders/leaders.model";

export const TableComponent: FC<{ leaders: Array<LeadersData> }> = ({leaders}) => {
    return (
        <Table striped hover size={'sm'}>
            <thead>
            <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Затрачено время</th>
            </tr>
            </thead>
            <tbody>
            {
                leaders.map((leader, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{leader.name}</td>
                        <td>{leader.score}</td>
                    </tr>
                )
            }
            </tbody>
        </Table>
    );
}

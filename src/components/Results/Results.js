import {Card, Spin} from "antd";
import React from "react";

import './Results.css';

export const Results = ({results, loading}) => {
    return (
        <div>
            <Spin spinning={loading} className="Results-Spin" />
            {
                results.map((result, index) => (
                    <Card
                        className="Results-Card"
                        key={index}>
                        {result}
                    </Card>
                ))
            }
        </div>
    )
}
import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import ShowMore from "react-show-more";

const PriceCard = (props) => {
    console.log(props);
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle><h4>&#x20b9; {props.data.sale_price} <small><del>{props.data.mark_price}</del></small></h4></CardTitle>
                    <CardSubtitle><h6>You save &#x20b9; {props.data.mark_price - props.data.sale_price} ({props.data.sale_msg})</h6></CardSubtitle>
                    <CardText>
                       <small> Local taxes included (where applicable) </small>
                     </CardText>

                </CardBody>
            </Card>
        </div>
    );
};

export default PriceCard;
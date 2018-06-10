import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import ShowMore  from "react-show-more";

const ProductDescriptionCard = (props) => {
    
    return (
        <div>
            <Card >
                <CardBody>
                    <CardTitle><h2 className="shadow-sm">{props.variant.name}</h2></CardTitle>
                    <CardSubtitle><br /></CardSubtitle>
                    <CardText>
                        <ShowMore
                        lines={1}
                        more='Show more'
                        less='Show less'
                        anchorClass=''
                    >
                {props.data.desc}
            </ShowMore></CardText>
                    
                </CardBody>
            </Card>
        </div>
    );
};

export default ProductDescriptionCard;
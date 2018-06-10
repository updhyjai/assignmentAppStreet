import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

const ProductCard = (props) => {
    
    return (
        <div>
            <Card className="align-items-center" width = "200" hieght = "500">
               
                <CardBody >
                    
                    
                    <CardLink href={"/details/"+ props.productData._id}>
                        <img width="200" height="200" src={props.productData.images[0]} alt="Card image cap" />
                        <CardText>{props.productData.name}</CardText>
                        <CardText>{Math.round(props.productData.sale_price)}</CardText>
                    </CardLink>
                    
                </CardBody>
            </Card>
        </div>
    );
};

export default ProductCard;
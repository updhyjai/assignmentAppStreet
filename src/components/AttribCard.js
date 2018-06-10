import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import ShowMore from "react-show-more";


export default class AttribCard extends React.Component {

    constructor(props) {
        super(props);
       

        this.RenderAttribOptions = this.RenderAttribOptions.bind(this);
        this.OnChangeAttrib = this.OnChangeAttrib.bind(this);
        console.log(this.props);
    }

    RenderAttribOptions() {

        return this.props.options.map(option => {

            if (option.attrib_id === this.props.data._id) {
               
                return <Button style={{marginLeft:10 ,marginRight:10}} width="100%" value={option._id} onClick={this.OnChangeAttrib}>{option.name}</Button>


            }
        });


    }


    OnChangeAttrib(e) {
        console.log(e.target.value);
        this.props.handleChange(e.target.value);
    }





    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle> </CardTitle>


                        {this.RenderAttribOptions()}



                    </CardBody>
                </Card>
            </div>
        );
    }

}






import React, { Component } from "react";
import axios from "axios";
import TitleCard from './ProductDescriptionCard';
import PriceCard from './PriceCard';
import AttribCard from "./AttribCard";
import { Redirect } from 'react-router-dom';
import ProductCarousel from "./ProductCarousel";
import { Button, ButtonGroup } from "reactstrap";

export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = ({
           productDescriptionUrl: "https://assignment-appstreet.herokuapp.com/api/v1/products/",
            productDescription: {},
            productId: this.props.match.params.productId,
            attributes:[],
            options:[],
            product_variations:[],
            selected_option_ids:[],
            primary_product:{},
            quantity:1
        });
        console.log(this.props.id);
       // this.RenderAttributes = this.RenderAttributes.bind(this);
        this.RenderSizeAttribute = this.RenderSizeAttribute.bind(this);
        this.RenderColorAttribute = this.RenderColorAttribute.bind(this);
        this.HandleStorageChange = this.HandleStorageChange.bind(this);
        this.HandleColorChange = this.HandleColorChange.bind(this);
        this.UpdateProduct = this.UpdateProduct.bind(this);
        this.GetProductDetail = this.GetProductDetail.bind(this);
        this.GetPrimaryProduct = this.GetPrimaryProduct.bind(this);
        this.GetImageForCarousel = this.GetImageForCarousel.bind(this);
        this.IncreaseQuantity = this.IncreaseQuantity.bind(this);
        this.DecreaseQuantity = this.DecreaseQuantity.bind(this);
        this.OnAddToCart = this.OnAddToCart.bind(this);
    }

    componentDidMount(){
        
        this.GetProductDetail();
        
    }

    GetPrimaryProduct(){
       
        if(this.state.product_variations.length > 0){
            this.state.product_variations.forEach(product => {
                if (JSON.stringify(product.sign) === JSON.stringify(this.state.selected_option_ids)) {
                    console.log(product);
                    this.setState({ primary_product: product });
                }
            })
        }
        
    }

    GetProductDetail(){
        
        axios.get(this.state.productDescriptionUrl + this.state.productId)
            .then(response => {
                let detail = response.data;
                this.setState({
                    productDescription: detail.primary_product,
                    attributes: detail.attributes,
                    options: detail.options,
                    product_variations: detail.product_variations,
                    selected_option_ids: detail.selected_option_ids,
                   
                    
                });
                this.GetPrimaryProduct();
                //console.log(this.state.attributes);
            })
    }

   

    RenderSizeAttribute(){
        
        return <div><h5>Select {this.state.attributes[0].name}</h5><AttribCard data={this.state.attributes[0]} options={this.state.options} handleChange={this.HandleStorageChange} /></div>
    }

    RenderColorAttribute() {
        return <div><h5>Select {this.state.attributes[1].name}</h5><AttribCard data={this.state.attributes[1]} options={this.state.options} handleChange={this.HandleColorChange} /></div>
    }

    HandleStorageChange(attrib_val){
        
        let selected = this.state.selected_option_ids;
        selected[0] = attrib_val;
        this.setState({ selected_option_ids: selected });
      
        this.GetPrimaryProduct();
    }

    HandleColorChange(attrib_val){
        
        let selected = this.state.selected_option_ids;
        selected[1] = attrib_val;
        this.setState({ selected_option_ids: selected });
        
        this.GetPrimaryProduct();
    }

    UpdateProduct(){
        let newProudctId = null;
     this.GetPrimaryProduct();
        
        
    }

    GetImageForCarousel(){
        let items = [];
        
        if (this.state.primary_product && this.state.primary_product.images){
          
            let images = this.state.primary_product.images;
            for (let index = 0; index < images.length; index++) {
               
                items.push({ src: images[index]     });
            }
            
        }
        
        return items;
        
    }

    IncreaseQuantity(){
        let quantity = this.state.quantity;
        quantity++;
        this.setState({quantity:quantity});
    }

    DecreaseQuantity() {
        if(this.state.quantity > 1)
        {
            let quantity = this.state.quantity;
            quantity--;
            this.setState({ quantity: quantity });
        }

       
        
    }
    OnAddToCart() {
      
        let products = {'product':this.state.primary_product,'quantity':this.state.quantity};
        console.log("Following item is added to cart");
        console.log(products);
        

    }


    render() {
        const titleCard = (this.state.primary_product && this.state.productDescription) ? <TitleCard data={this.state.productDescription} variant={this.state.primary_product} /> : <div />;
        const priceCard = (this.state.primary_product.name) ? <PriceCard data={this.state.primary_product} /> : <div />;
        const carousel = (this.state.primary_product) ? <ProductCarousel items={ this.GetImageForCarousel()} /> :<div />;
        const redirected = (this.state.redirect) ? <Redirect to={'/details/' + this.state.redirectProductId} /> :<div />;
        const incremental = <div>
            <h5>Select Quantity</h5>
            <ButtonGroup>
            <Button onClick={this.DecreaseQuantity}>-</Button>
            <Button>{this.state.quantity}</Button>
            <Button onClick={this.IncreaseQuantity}>+</Button>
        </ButtonGroup></div>;

        const renderStorage = (this.state.attributes.length>0) ? this.RenderSizeAttribute() :<div />;
        const renderColor = (this.state.attributes.length > 0) ? this.RenderColorAttribute() : <div />;
        return (

            <div>
              
                <div className ="row">
                    <div className="col-sm-2" />
                    <div className="col-sm-3" style={{ marginLeft: 10 }}>
                    <div width= "200" height="300" style = {{marginTop:100}}>
                        {carousel}
                        </div>  
                    </div>
                    <div className="col-sm-1" />
                    <div className="col-sm-4" style={{ marginLeft: 30 }}>
                        <div className="row" style={{ marginTop: 20 }}>
                        
                             {titleCard}
                            </div>
                        <div className="row" style={{ marginTop: 20 }}>
                           {priceCard}
                        </div>
                        <div className="row" style={{ marginTop: 20 }}>
                         {renderStorage}
                        </div>
                        <div className="row" style={{ marginTop: 20 }}>
                            {renderColor}
                    </div>
                        <div className="row" style={{ marginTop: 20 }}>
                            {incremental}
                        </div>
                        <div className="row" style={{ marginTop: 50 }}>
                            <Button onClick={this.OnAddToCart} >Add to Cart</Button>
                        </div>
                    </div>
                    <div className="col-sm-2" />
                    
                </div>
            </div>
        );
    }
}
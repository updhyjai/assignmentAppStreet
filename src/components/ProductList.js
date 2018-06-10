import React, { Component } from 'react';

import axios from 'axios';
import { Button } from 'reactstrap';
import DetailPage from '../components/ProductDetail';
import Card from './ProductCard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { NavLink as RRNavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            productListUrl: "https://assignment-appstreet.herokuapp.com/api/v1/products?page=",
            productList: [],
            productDescriptionUrl: "https://assignment-appstreet.herokuapp.com/api/v1/products/",
            productDescription: {},
            page:1,
            hasMore : true,
            nextProductList:[]
        });
        this.GetProductList = this.GetProductList.bind(this);
        this.GetProductDescription = this.GetProductDescription.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
        this.GetNextProductList = this.GetNextProductList.bind(this);
        //this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {
        this.GetProductList();

    }
    componentWillMount() {

    }

   GetNextProductList(){
       let page = this.state.page+1;
       console.log("I am in next list" + page);
       axios.get(this.state.productListUrl+ page)
       .then(response => {
           
           if(response.data.products && response.data.products.length > 0)
           {
               console.log(response.data);
               const moreData = response.data.products.length > 0;
               this.setState({nextProductList:response.data,hasMore:moreData});
               
                   let page = this.state.page + 1;
                   this.setState({ page: page });
                   this.GetProductList();
               
           }
           else
           {
           console.log("I am in else");
            this.setState({hasMore:false});
           }
       })
   }

    GetProductList() {
        let list = [];
        axios.get(this.state.productListUrl + this.state.page)
            .then(response => {
                console.log(response.data);
                
                list = this.state.productList;

                if(response.data.products)
                {
                    response.data.products.forEach(element => {
                        list.push(element);
                    });
                    this.setState({ productList: list});
                }
                
                console.log(this.state.productList);
            })
            .catch(error => {
                console.log(error);
            });
    }

    GetProductDescription(productId) {
        axios.get(this.state.productDescriptionUrl + productId)
            .then(response => {
                console.log(response.data);
                <DetailPage productDetail={response.data} />;
            })
    }

    GetButtonToRender() {
        return this.state.productList.map(product => {
            return <div className="col-sm-4 col-xs-6"><Card productData={product} /></div>
        });
    }


    fetchMoreData(){
        this.setState({hasMore:false});
        console.log("hi I am in fetch");
        console.log(this.state.page);
        this.GetNextProductList();
        
       
        
    }


    render() {

        const buttons = (this.state.productList.length > 0) ? this.GetButtonToRender() : <div />;
        return (
            <Router>

                <div>
                    <InfiniteScroll
                        dataLength={this.state.productList.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                        {buttons}
                    </InfiniteScroll>
                    
                    
                </div>

            </Router>
        );
    }
}

export default ProductList;

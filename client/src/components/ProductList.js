import React, { Component } from 'react';
import Availability from './Availability';


class ProductList extends Component {
    state = { products: [], availabilities: {}, ready: false}
    
    componentDidMount() {
      this.getProducts();
    }

    /**
     * Add a manufacturer's name to availabilities if it is not already there
     *
     * @param {string} manufacturer manufacturer's name
     */
    addManufacturer = (manufacturer) => {
      if(!(manufacturer in this.state.availabilities)) {
        let availabilities = this.state.availabilities;
        availabilities[manufacturer] = [];
        this.setState({ availabilities });
      }
    }
    /**
     * Fetches products with the API and sets it to the state
     * Call addManufacturer on the manufacturer of each item in the products list
     * Sets ready to true when all the products are fetched
     */
    getProducts = () => {
      let url = '/v2/products/' + this.props.category;
      fetch(url)
        .then(res => res.json())
        .then(products => {
          products.forEach(product => {
            this.addManufacturer(product.manufacturer);
          });
          this.setState({ products });
        })
        .then(() => {
          this.setState({ ready : true });
          Object.keys(this.state.availabilities).forEach(manufacturer => {
            fetch('/v2/availability/' + manufacturer)
            .then(res => res.json())
            .then(data => {
              let availabilities = this.state.availabilities;
              availabilities[manufacturer] = data;
              this.setState({ availabilities });
            })
            .catch(error => console.log(error.message));
          });
        });
    }


    render() {
      const { products, availabilities, ready } = this.state;

      return (
        <div className="products">
          {ready ? (
            <div>
              <h1>{products.length} {this.props.category}</h1>
              <ul className="products">
                {products.map(product => {
                  const colors = product.color.map((color) => color);
                  return <li key={product.id}>
                    <div>{product.name}</div>
                    <div>{product.price} €</div>
                    <div>{colors.join(", ")}</div>
                    <div>{product.manufacturer}</div>
                    <Availability manufacturer={availabilities[product.manufacturer]} id={product.id} />
                  </li> 
                  }
                )}
                
              </ul>
            </div>
          ) : (
            <div>
              <h1>Loading products</h1>
            </div>
          )}
        </div>
      );
    }
  }

export default ProductList;
import { useState } from 'react';
import './App.css';

interface Product {
  id: number,
  name: string,
  image: string,
  unit_price: number
}

interface SpecialOffer {
  id: number,
  no_of_units: number,
  discount_price: number
}

const products: Product[] = [{
  id: 1,
  name: 'A',
  image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_183a3ef1e94%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_183a3ef1e94%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.83984375%22%20y%3D%2236.65%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  unit_price: 50
}, {
  id: 2,
  name: 'B',
  image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_183a3ef1e94%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_183a3ef1e94%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.83984375%22%20y%3D%2236.65%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  unit_price: 30
}, {
  id: 3,
  name: 'C',
  image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_183a3ef1e94%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_183a3ef1e94%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.83984375%22%20y%3D%2236.65%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  unit_price: 20
}, {
  id: 4,
  name: 'D',
  image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_183a3ef1e94%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_183a3ef1e94%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.83984375%22%20y%3D%2236.65%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  unit_price: 15
}];

const specialOffers: SpecialOffer[] = [{
  id: 1,
  no_of_units: 3,
  discount_price: 130
}, {
  id: 2,
  no_of_units: 2,
  discount_price: 45
}];

const App = () => {
  const [basket, setBasket] = useState<Product[]>([]);

  const addProductHandler = (item: Product): void => {

  }

  const removeProductHandler = (item: Product): void => {

  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <h1 className="navbar-brand mb-0 h1">Checkout System</h1>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Products List</h3>
            <ul className="list-group">
              {products.map(item =>
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                  <div className="d-flex align-items-center">
                    <img className="me-3" src={item.image} alt={item.name} />
                    <div>
                      <h5 className="mb-0">Product {item.name}</h5>
                      <small>Price: {item.unit_price}</small>
                    </div>
                  </div>
                  <div className="btn-group me-2" role="group">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => removeProductHandler(item)}>-</button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => addProductHandler(item)}>+</button>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className="col">
            <h3>Basket</h3>
            <ul className="list-group">
              {basket.map(item =>
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                  <div className="d-flex align-items-center">
                    <img className="me-3" src={item.image} alt={item.name} />
                    <div>
                      <h5 className="mb-0">Product {item.name}</h5>
                      <small>Price: {item.unit_price}</small>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';

interface Product {
  id: number,
  name: string,
  image: string,
  unit_price: number,
  offer?: SpecialOffer
}

interface SpecialOffer {
  id: number,
  no_of_units: number,
  discount_price: number
}

interface CartItem extends Product {
  quantity: number,
  actual_price: number,
  special_price?: number
}

const products: Product[] = [{
  id: 1,
  name: 'A',
  image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_183a3ef1e94%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_183a3ef1e94%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.83984375%22%20y%3D%2236.65%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  unit_price: 50,
  offer: {
    id: 1,
    no_of_units: 3,
    discount_price: 130
  }
}, {
  id: 2,
  name: 'B',
  image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_183a3ef1e94%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_183a3ef1e94%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.83984375%22%20y%3D%2236.65%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  unit_price: 30,
  offer: {
    id: 2,
    no_of_units: 2,
    discount_price: 45
  }
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

const App = () => {
  const [basket, setBasket] = useState<CartItem[]>([]);
  const [basketTotal, setBasketTotal] = useState<number>(0);

  const addProductHandler = (item: Product): void => {
    let totalPrice: number = 0;
    let products: CartItem[] = [...basket];

    let product = basket.find(pItem => pItem.id === item.id);

    if (!product) {
      products.push({
        ...item,
        quantity: 0,
        actual_price: 0
      })
    }

    products = products.map((pItem: CartItem) => {
      if (pItem.id === item.id) {
        pItem.quantity += 1;
        pItem.actual_price = calculateActualPrice(pItem.quantity, pItem.unit_price);
      }

      if (pItem.offer) {
        pItem.special_price = calculateDiscountPrice(
          pItem.quantity,
          pItem.unit_price,
          pItem.offer
        )
      }

      totalPrice += pItem.special_price || pItem.actual_price;
      return pItem;
    })

    setBasket([...products]);
    setBasketTotal(totalPrice);
  }

  const removeProductHandler = (item: Product): void => {
    let totalPrice: number = 0;
    let products: CartItem[] = [];

    basket.forEach((bItem: CartItem) => {
      let pItem = { ...bItem };
      if (pItem.id === item.id) {
        pItem.quantity -= 1;
        pItem.actual_price = calculateActualPrice(
          pItem.quantity,
          pItem.unit_price
        );
      }

      if (pItem.offer) {
        pItem.special_price = calculateDiscountPrice(
          pItem.quantity,
          pItem.unit_price,
          pItem.offer
        )
      }

      if (pItem.quantity) {
        totalPrice += pItem.special_price || pItem.actual_price;
        products.push(pItem)
      }
    })

    setBasket([...products]);
    setBasketTotal(totalPrice);
  }

  const calculateActualPrice = (
    quantity: number,
    unit_price: number
  ): number => {
    return quantity * unit_price;
  }

  const calculateDiscountPrice = (
    quantity: number,
    unit_price: number,
    offer: SpecialOffer
  ): number => {
    const discountQty = Math.floor(quantity / offer.no_of_units);
    const normalQty = Math.floor(quantity % offer.no_of_units);

    return (discountQty * offer.discount_price) + (normalQty * unit_price);
  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <h1 className="navbar-brand mb-0 h1">Checkout System</h1>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-5">
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
          <div className="col-7">
            <h3>Basket</h3>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Item</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Sub Total</th>
                  <th scope="col">Discount Price</th>
                </tr>
              </thead>
              <tbody>
                {basket.map(item =>
                  <tr key={item.id}>
                    <td>
                      <img className="me-3" src={item.image} alt={item.name} />
                    </td>
                    <td>
                      <h6 className="mb-0">Product {item.name}</h6>
                    </td>
                    <td>
                      <small>{item.unit_price}</small>
                    </td>
                    <td>
                      <small>{item.quantity}</small>
                    </td>
                    <td>
                      <small>{item.actual_price}</small>
                    </td>
                    <td>
                      <small>{item.special_price}</small>
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <th colSpan={3}>Grand Total</th>
                  <th colSpan={2}>{basketTotal}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

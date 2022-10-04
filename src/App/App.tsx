import { useState } from 'react';

interface Product {
  id: number,
  name: string,
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
  unit_price: 50,
  offer: {
    id: 1,
    no_of_units: 3,
    discount_price: 130
  }
}, {
  id: 2,
  name: 'B',
  unit_price: 30,
  offer: {
    id: 2,
    no_of_units: 2,
    discount_price: 45
  }
}, {
  id: 3,
  name: 'C',
  unit_price: 20
}, {
  id: 4,
  name: 'D',
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

  const priceFormatter = (value: number): string => {
    const floatVal = value / 100;
    return `£${floatVal.toFixed(2)}`;
  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <h1 className="navbar-brand mb-0">Checkout System</h1>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <nav className="navbar bg-light">
              <h3 className="navbar-brand mb-0">Products List</h3>
            </nav>
            <ul className="list-group">
              {products.map(item =>
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                  <div className="d-flex align-items-center">
                    <ImagePlaceHolder size={64} />
                    <div className="ms-3">
                      <h5 className="mb-0">Product {item.name}</h5>
                      <small>Price: {priceFormatter(item.unit_price)}</small>
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
            <nav className="navbar bg-light">
              <h3 className="navbar-brand mb-0">Basket</h3>
            </nav>

            {basket.length ? <table className="table">
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
                      <ImagePlaceHolder size={32} />
                    </td>
                    <td>
                      <h6 className="mb-0">Product {item.name}</h6>
                    </td>
                    <td className="number-class">
                      <small>{priceFormatter(item.unit_price)}</small>
                    </td>
                    <td className="number-class">
                      <small>{item.quantity}</small>
                    </td>
                    <td className="number-class">
                      <small>{priceFormatter(item.actual_price)}</small>
                    </td>
                    <td className="number-class">
                      {item?.special_price && <small>{priceFormatter(item.special_price)}</small>}
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <th colSpan={4}>Grand Total</th>
                  <th>{priceFormatter(basketTotal)}</th>
                </tr>
              </tfoot>
            </table> : <div className="empty-basket">Basket Empty</div>}
          </div>
        </div>
      </div>
    </div>
  );
}



const ImagePlaceHolder: React.FC<{ size: number }> = ({ size }) => {
  return (
    <div className="image-placeholder" style={{ width: size, height: size }}>
      <div>{size}x{size}</div>
    </div>
  );
}

export default App;

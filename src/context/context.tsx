import { createContext, ReactNode, useState, useEffect } from 'react'
import { validationAddressData } from '../pages/Purchase'

interface CyclesContextProviderProps {
  children: ReactNode;
}

interface Products {
  id: number;
  name: string;
  image: string;
  price: number;
  qtd: number;
  total: number;
}

interface CycleContextType {
  sum: number;
  productsCart: Products[];
  addressFill: validationAddressData;
  addProductToCart: (id: number, name: string, image: string, price: number) => void;
  removeProductFromCart: (id: number) => void;
  deleteItemFromCart: (id: number) => void;
  addressData: (data: validationAddressData) => void;
}

export const CycleContext = createContext({} as CycleContextType);

export function CycleContextProvider({ children }: CyclesContextProviderProps) {
  const [productsCart, setProductsCart] = useState([] as Products[]);
  const [sum, setSum] = useState(0)
  const [addressFill, setAddressFill] = useState({} as validationAddressData)

  useEffect(() => {
    const sum = productsCart.reduce((acc, cur: Products) => acc + cur.total, 0)

    setSum(sum)
  }, [productsCart])

  function addProductToCart(id: number, name: string, image: string, price: number) {
    if (window.event) window.event.preventDefault();
    const copyProductsCart = [...productsCart]
    const item: Products | undefined = copyProductsCart.find((product: Products) => product.id === id);

    const newProduct: Products = {
      id: id,
      name: name,
      image: image,
      price: price,
      qtd: 1,
      total: price
    }

    if (!item) {
      copyProductsCart.push(newProduct)
    } else {
      item.qtd += 1

      item.total = item.price * item.qtd
    }

    setProductsCart(copyProductsCart)
  }

  function removeProductFromCart(id: number) {
    if (window.event) window.event.preventDefault();
    const copyProductsCart: Products[] = [...productsCart];
    const item = copyProductsCart.find((product: Products) => product.id === id);

    if (item && item.qtd > 1) {
      item.qtd -= 1
      item.total = item.price * item.qtd
      setProductsCart(copyProductsCart)
    } else {
      deleteItemFromCart(id)
    }
  }

  function deleteItemFromCart(id: number) {

    const arrayFiltered = productsCart.filter((product: Products) => product.id !== id)
    setProductsCart(arrayFiltered)
  }

  function addressData(data: validationAddressData) {
    setAddressFill(data)
  }

  return (
    <CycleContext.Provider
      value={{
        sum,
        productsCart,
        addressFill,
        addressData,
        addProductToCart,
        removeProductFromCart,
        deleteItemFromCart
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
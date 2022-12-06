import * as zod from 'zod'
import { Address } from "./components/Address";
import { Orders } from "./components/Orders";
import { PurchaseContainer } from "./styles";
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react";
import { CycleContext } from "../../context/context";
import { useNavigate } from 'react-router-dom';

const validationAddress = zod.object({
  Cep: zod.number().min(1),
  Rua: zod.string().min(1),
  Numero: zod.number().min(1),
  Bairro: zod.string().min(1),
  Complemento: zod.string().min(1),
  Cidade: zod.string().min(1),
  Uf: zod.string().min(1)
})

export type validationAddressData = zod.infer<typeof validationAddress>

export function Purchase() {
  const newAddressForm = useForm<validationAddressData>({
    resolver: zodResolver(validationAddress)
  })

  const { handleSubmit } = newAddressForm
  const { addressData } = useContext(CycleContext)
  const navigate = useNavigate()

  function fillAddress(data: validationAddressData) {
    addressData(data)
    navigate('/purchase/delivery')
  }

  return (
    <PurchaseContainer>
      <form action="" onSubmit={handleSubmit(fillAddress)}>
        <FormProvider {...newAddressForm}>
          <div className="Purchase">
            <Address />
          </div>
          <Orders />
        </FormProvider>
      </form>
    </PurchaseContainer>
  )
}
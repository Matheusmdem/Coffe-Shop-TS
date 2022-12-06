import { FormContainer } from "./styles";
import { useFormContext } from 'react-hook-form'
import Placeholder from '../../../../assets/Placeholder.svg'

export function Address() {
  const { register, setValue, setFocus } = useFormContext()

  async function cepAPI(e: any) {
    const cep = e.target.value.replace(/\D/g, '')

    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json()).then(data => {
        setValue('Rua', data.logradouro)
        setValue('Bairro', data.bairro)
        setValue('Cidade', data.localidade)
        setValue('Uf', data.uf)

        setFocus('Numero')
      })
  }

  return (
    <FormContainer>
      <header>
        <img src={Placeholder} />
        <span className="infos">
          <p>Endereço de Entrega</p>
          <p>Informe o endereço onde deseja receber seu pedido</p>
        </span>
      </header>
      <section>
        <input
          type="text"
          placeholder="CEP"
          className="Cep"
          id="Cep"
          {...register("Cep")}
          onBlur={cepAPI}
        />
        <input
          type="text"
          placeholder="Rua"
          className="Rua"
          {...register("Rua")}
        />
        <input
          type="text"
          placeholder="Número"
          className="Numero"
          {...register("Numero")}
        />
        <input
          type="text"
          placeholder="Bairro"
          className="Bairro"
          {...register("Bairro")}
        />
        <input
          type="text"
          placeholder="Complemento"
          className="Complemento"
          {...register("Complemento")}
        />
        <input
          type="text"
          placeholder="Cidade"
          className="Cidade"
          {...register("Cidade")}
        />
        <input
          type="text"
          placeholder="UF"
          className="Uf"
          {...register("Uf")}
        />
      </section>
    </FormContainer>
  )
}
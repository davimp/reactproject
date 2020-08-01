import React, {useState, useEffect} from 'react';
import PageDefault from '../../../components/PageDefault'
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
    
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '',
    }
    const [categorias, setCategoria] = useState([]);
    const [values, setValues] = useState(valoresIniciais);
    
    function setValue(key, value) {
        setValues({
            ...values,
            [key]: value, //nome: 'valor'
        })
    }

    function handlerChange(info){
        setValue(info.target.getAttribute('name'), 
        info.target.value)
    }

    useEffect(() => {
        if(window.location.href.includes('localhost')) {
          const URL = 'http://localhost:8080/categorias'; 
          fetch(URL)
           .then(async (respostaDoServer) =>{
            if(respostaDoServer.ok) {
              const resposta = await respostaDoServer.json();
              setCategoria(resposta);
              return; 
            }
            throw new Error('Não foi possível pegar os dados');
           })
        }    
      }, []);
    

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>
            <form onSubmit={function handleSubmit (info){
                info.preventDefault();
                console.log("Você tentou enviar o form")
                setCategoria ([
                    ...categorias,
                    values
                ]);

                setValues(valoresIniciais)
            }}>

                <FormField
                    label="Nome da Categoria"
                    type="text"
                    value={values.nome}
                    name="nome"
                    onChange={handlerChange}
                />

                <FormField
                    label="Descrição"
                    type="textarea"
                    value={values.descricao}
                    name='descricao'
                    onChange={handlerChange}
                />

                <FormField
                    label="Cor"
                    type="color"
                    value={values.cor}
                    name='cor'
                    onChange={handlerChange}
                />

                <Button>
                    Cadastrar
                </Button>

            </form>
            
            {categorias.length === 0 && (<div>
                Loading...
            </div>)}

            <ul>
                {categorias.map((categoria, indice) => {
                    return (
                        <li key={`${categoria}${indice}`}>
                            {categoria.nome}
                        </li>
                    )
                })}
            </ul>


            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    )
}



export default CadastroCategoria;
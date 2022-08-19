class Despesa {
    constructor(id, ano, mes, dia, tipo, descricao, valor){
        this._id = id; 
        this._ano = ano;
        this._mes = mes;
        this._dia = dia; 
        this._tipo = tipo; 
        this._descricao = descricao;
        this._valor = valor; 
    }

    static async getAllData() {
        let lista;
        await XhttpReq.get('despesas').then((d)=>{
            lista = d;
        });
        return lista;
    }

   addLocalStorage(obj, id = undefined) {
        if(id){
            XhttpReq.put('despesas',obj).then((d)=>{
                
            }).catch(err=>{
                alert('despesa actualizada com sucesso');
                location.reload()
            });

        }else{
           XhttpReq.post('despesas',obj).then(()=>{
                alert('despesa salva com sucesso');
            }).catch(err=>{
                alert('erro ao salvar');
            })
        }
    }

    

    static async findOne(id) {
        let despesa;
        await XhttpReq.get(`despesas/${id}`).then(d=>{
            despesa = d;
        }).catch(er=>{
            console.log('erro ao salvar!!!')
        });
        return despesa;
    
    }
    
    static remove(id){
        XhttpReq.del(`despesas/${id}`).then(()=>{
            alert('dispeza removida com sucesso');

        }).catch(()=>{
            
            alert('dispeza removida com sucesso');
        });
    }

    static async geraId() {
        
        let lista = await Despesa.getAllData();
        let maior = await Despesa.actualizeId()
        let id;

        if (lista.length == 0) id = 1;

        if(maior) id = maior;

        if(id == undefined) id = 1 + lista.length;
        console.log('entrei no geraid: ', id)
        return id;
    }

    static async actualizeId() {
        let lista = await Despesa.getAllData();
        let aux = undefined;

        lista.forEach(el => {
            if(parseInt(el._id) > lista.length) aux = true;
        });
        if(aux){
            lista.every((element, index )=> {
                if(element._id !== (index+1)){
                    aux = (index+1);
                }
            });
        }
        
        console.log('entrei no actualizaid: ', aux)
        return aux;
    }
}
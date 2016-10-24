/**
 * Proxyを使ってオブジェクトの変更を監視。
 * 変更に応じてプロパティネームと一致するdata-bindが指定されたHTML側のDOMを更新します.
 */
class ViewBindProxy<T extends Data>{

    proxyData;

    constructor(data:T,proxyHandler?:ProxyHandler){
        let handler:ProxyHandler = {
            set(target,name,value){

                // setをproxyのハンドラでラップ.
                // data-bind="{name}"としてhtml側で指定されてるinnnerTextを書き換える.
                const atribute = `[data-bind="${name}"]`;
                const elms = document.querySelectorAll(atribute);
                [].forEach.call(elms, v => {
                    v.innerText = value;
                });
                target[name] = value;
            }
        };

        if(proxyHandler){
            handler = proxyHandler;
        }

        this.proxyData = new Proxy(data,handler);
    }

    set(name:String,value:any){
        this.proxyData[name] = value;
    }

}

interface Data{
    onInit();
}


class ViewData implements Data {
    data1;
    data2;
    textField;

    onInit(){
        this.data1 = 'hoge';
        this.data2 = 'bar';
        this.textField = 'text';
    }
};

const proxy = new ViewBindProxy<ViewData>(new ViewData());

proxy.set('data1','hogehoge');

var textHandler = (e) => {
    let elm = e.target;
    //console.log(elm.value);
    proxy.set('textField',elm.value);
};
document.getElementById('input').addEventListener('input',textHandler);

setTimeout(()=>{
    proxy.set('data2','barbar');
    proxy.set('data1','hogehogehoge');
},2000);

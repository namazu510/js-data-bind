## js-data-bind
>JavaScript data-binding
 
JavaScriptにおいて各種フレームワークの実現するdata-bindingがどのように実現されるのか知るために実際に作る.
 
 ## データバインディングを行う手法
 * モデル-クラス方式　
  * モデルのクラスとしてバインドする値を定めモデルに定義されたインターフェースで操作する
  * 利用フレームワークはEmber Backbone Knockout Ractive etc...
 * 力ずく方式
  * 値の変更を逐一チェック(dirty check)する
  * 利用フレームワークはAngularJS (Angular1)
 * モデル書き換え方式
  * prototypeを書き換え独自メソッドで置き換える.
  * 利用フレームワークはVue.js
 * Object.observe()
  * オブジェクトが変更された際のコールバックを利用.
  * この方法はメソッドが廃棄され使えなくなる　もう使うべきではない. →　Proxyが使える？


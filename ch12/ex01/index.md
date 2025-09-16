## 問題 12.1 💻🖋️

以下のコードに示す関数 `counterIter()` 及び `counterGen()` を利用して、イテレータ及びジェネレータに対して「調査対象の操作」に示す操作をしたときに、どの部分が実行されるのかを調査するコードを作成し、実行結果と動作の説明を記述しなさい。


## 回答
### 1. 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の next() を呼び出す

イテレータではnext()メソッドが呼ばれ、ジェネレータではtry内が実行される。結果としてほぼ同じ挙動をする。<br>

`console.log(iter.next());`を3回実行。<br>
イテレータはcounterIterの呼び出し時、ジェネレータはgen.next()呼び出し時に関数が実行される。<br>
next()を呼ぶたびに反復結果オブジェクト{ value, done } が返る（valueはインクリメント）

```powershell
counterIter             # counterIter(5)の呼び出し時に出力
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: next
{ value: undefined, done: true }
```
<hr>


### 2. 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の return() を呼び出す
イテレータは関数本体が呼ばれた後、return()メソッドだけ呼ばれる。
<br>ジェネレータでは、関数本体はnext()で反復されてはじめて実行される。最初にreturn()するとジェネレータオブジェクトを返すだけ。
<br>1度でもnext()すれば、finally()→return()の順で最後に実行される。

イテレータ：`iter.return(99);`
```powershell
counterIter             # counterIter(5)の呼び出し時に出力
counterIter: return: 99 # return(99)メソッドを明示的に呼び出したときに出力
```

ジェネレータ：<br>
`console.log(gen.return(99));`
```powershell
{ value: 99, done: true }
```
`gen.next(); console.log(gen.return(99));`
```powershell
counterGen
counterGen: next
counterGen: finally
{ value: 99, done: true }
```
<hr>


### 3. 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の throw() を呼び出す
<br>イテレータは関数本体が呼ばれた後、throw()メソッドだけ呼ばれる（return()と同じ）。
<br>ジェネレータは1度以上next()して関数を実行したのち、throw()をキャッチして反復が終了し、finallyが自動で実行される。

イテレータ：`try { iter.throw(new Error("明示的エラー")); } catch (e) {}`
```powershell
counterIter                               # counterIter(5)の呼び出し時に出力
counterIter: throw: Error: 明示的エラー    # throw(new Error("明示的エラー"))メソッドを明示的に呼び出したときに出力
```
<hr>

ジェネレータ：`try { gen.next(); gen.throw(new Error("明示的エラー")); } catch (e) {}`
```powershell
counterGen
counterGen: next
counterGen: catch: Error: 明示的エラー
counterGen: finally
```
<hr>


### 4. for-of ループを実行
イテレータでは、next()が指定した`max+1`回、自動で呼ばれる。（p.361 para.3 l.2参照。）
<br>ジェネレータでは、try内のfor文で`max`回自動で実行されてfor-ofが終了し、finallyが自動で実行される。
<br>return()とthrow()は明示的か特定条件の時しか呼ばれない。

イテレータ：<br>
```powershell
counterIter
counterIter: Symbol.iterator    # for-ofで呼び出し時に1度だけ出力
counterIter: next
1
counterIter: next
2
counterIter: next         # {value: undefined, done: true }。前のnextでc=3になるため、イテレーション終了
```

ジェネレータ：<br>
```powershell
counterGen
counterGen: next
1
counterGen: next
2
counterGen: finally
```
<hr>


### 5. for-of ループを実行途中で break
p.364 para.3 l.3参照。returnは、途中でbreak/return/throwした場合のみ自動で呼ばれる。
<br>イテレータはreturnが自動実行され、、ジェネレータはfinallyが自動実行される。

イテレータ：<br>
```powershell
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: return: undefined         # if文を通ってbreakが呼ばれると、return()があれば呼び出す
```

ジェネレータ：<br>
```powershell
counterGen
counterGen: next
1
counterGen: finally
```
<hr>


### 6. for-of ループを実行中に例外発生
throwが投げられると、return()があれば呼ばれるが、throw()メソッドは呼ばれない。
<br>エラーは呼び出し元でキャッチする

イテレータ：<br>
```powershell
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: return: undefined        　    # throwが投げられるとreturn()があれば呼び出す
エラーをキャッチした Error: イテレータエラー   # throwが投げられてもthrow()メソッドは呼ばれない
```

ジェネレータ：<br>
```powershell
counterGen
counterGen: next
1
counterGen: finally
エラーをキャッチした Error: イテレータエラー
```

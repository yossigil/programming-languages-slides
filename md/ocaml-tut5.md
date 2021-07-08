# Ocaml

## sequences

---

### sequences = delayed lists

* elements are not evaluated until their values are required
* **may** be infinite
* example: a sequence of all even integers `$0, 2, -2, 4, \ldots$`

---vert---

### sequences in OCaml

defined in the `Seq` module:

```ocaml
type 'a t = unit -> 'a node
and 'a node = 
  | Nil
  | Cons of 'a * 'a t;;
```
<!-- .element: data-thebe-executable -->

* `Seq.t` is the sequence type
* `Seq.node` is a fully evaluated sequence node

---vert---

a sequence is a function that takes `()` and returns a sequence node.

```ocaml
(*`empty` is an empty sequence*)
let empty () = Seq.Nil;;

(*`return v` is a sequence containing only `v`*)
let return v () = Seq.Cons (v, empty);;

let seq23 () = Seq.Cons (2, return 3);;

let seq123 () = Seq.Cons (1, seq23);;
```
<!-- .element: data-thebe-executable -->

a node holds an element and the tail of the sequence which is a sequence itself.

---vert---

```ocaml
let head xf = match xf () with
  | (Seq.Cons(x,_)) -> x
  | Nil -> raise (Failure "head");;
(*val head : (unit -> 'a Seq.node) -> 'a = <fun>*)

let tail xf = match xf () with
  | Seq.Cons(_, yf) -> yf
  | Nil -> raise (Failure "tail");;
(*val tail : (unit -> 'a Seq.node) -> 'a Seq.t = <fun>*)
```
<!-- .element: data-thebe-executable -->

---

### examples of sequences

```ocaml
let rec from k () = Seq.Cons (k, from (k + 1));;
(*val from : int -> int Seq.t = <fun>*)

head (from 1);;
(*- : int = 1*)

head (tail (from 1));;
(*- : int = 2*)
```
<!-- .element: data-thebe-executable -->

---vert---

```ocaml
let rec squares s () = match s() with
  | Seq.Nil -> Seq.Nil
  | Seq.Cons (x, xf) -> Seq.Cons (x*x, squares xf);;
(*val squares : int Seq.t -> int Seq.t = <fun>*)

head (tail (tail (tail (tail (squares (from 1))))));;
(*- : int = 25*)
```
<!-- .element: data-thebe-executable -->

---

### elementary sequence processing

adding two sequences

```ocaml
let rec addq s q () = match (s(), q()) with
  | (Seq.Cons(x, xf), Seq.Cons(y, yf))
      -> Seq.Cons(x + y, addq xf yf)
  | _ -> Seq.Nil;;
(*val addq : int Seq.t -> int Seq.t -> int Seq.t = <fun>*)
```
<!-- .element: data-thebe-executable -->

---vert---

<!-- .slide: data-background-iframe="http://localhost:16789/notebooks/tut9-sequence-functions.ipynb" data-background-interactive -->

---vert---

appending two sequences

```ocaml
let rec appendq l r = match l () with
  | Seq.Nil -> r
  | Seq.Cons(x, xf) -> fun () -> Seq.Cons(x, appendq xf r);;
(*val appendq : 'a Seq.t -> 'a Seq.t -> 'a Seq.t = <fun>*)
```
<!-- .element: data-thebe-executable -->

what would `(appendq xq yq)` be if `xq` is infinite?

---vert---

interleaving two sequences

```ocaml
let rec interleaving l r = match l () with
  | Seq.Nil -> r
  | Seq.Cons(x, xf) ->
      fun () -> Seq.Cons(x, interleaving r xf);;
(*val interleaving : 'a Seq.t -> 'a Seq.t -> 'a Seq.t = <fun>*)
```
<!-- .element: data-thebe-executable -->

---vert---

### `mapq`

```ocaml
let rec mapq f seq () = match seq () with
  | Seq.Nil -> Seq.Nil
  | Seq.Cons(x, xf) -> Seq.Cons(f x, mapq f xf);;
(*val mapq : ('a -> 'b) -> 'a Seq.t -> 'b Seq.t = <fun>*)
```
<!-- .element: data-thebe-executable -->

---vert---

### `filterq`

```ocaml
let rec filterq pred seq () = match seq () with
  | Seq.Nil -> Seq.Nil
  | Seq.Cons(x, xf) when pred x
      -> Seq.Cons(x, filterq pred xf)
  | Seq.Cons(_, xf) -> filterq pred xf ();;
```
<!-- .element: data-thebe-executable -->

---

### example - prime numbers

![sieve gif](./../imgs/tut9-sieve.gif)

---vert---

<!-- .slide: data-background-iframe="http://localhost:16789/notebooks/tut9-primes.ipynb" data-background-interactive -->

---

### exam questions

---vert---

<!-- .slide: data-background-iframe="http://localhost:16789/notebooks/tut9-exam-question-1.ipynb" data-background-interactive -->

---vert---

<!-- .slide: data-background-iframe="http://localhost:16789/notebooks/tut9-exam-question-2.ipynb" data-background-interactive -->

---vert---

<!-- .slide: data-background-iframe="http://localhost:16789/notebooks/tut9-exam-question-3.ipynb" data-background-interactive -->
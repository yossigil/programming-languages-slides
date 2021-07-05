# OCaml

## datatypes

---

### concrete datatypes

* the keyword `type` can create new types
* these datatypes are **concrete** (not abstract)
* concrete datatypes can be inspected - constructed and taken apart
* OCaml's datatypes have two kinds of values: **atomic** and **composite**

---

### enumeration types

```ocaml
type single = Only;;
(*type single = Only*)

Only;;
(*- : single = Only*)
```

* `Only` denotes the only value in the type `single`
* isomorphic to `unit`

---vert---

note that a constructor's name must be capitalized

```ocaml
type single = only;;
(* type single = only;;
                 ^^^^
Error: Unbound type constructor only*)
```

---vert---

order doesn't matter

```ocaml
type bool' = True | False;;
(*type bool' = True | False*)

True;;
(*- : bool' = True*)
```

---vert---

allows pattern matching

```ocaml
type piece = King | Queen | Rook | Bishop | Knight | Pawn;;

let value = function King -> Float.infinity
  | Queen -> 9.0
  | Rook -> 5.0
  | (Bishop | Knight) -> 3.0
  | Pawn -> 1.0;;
(*val value : piece -> float = <fun>*)

value Bishop;;
(*- : float = 3.*)
```

---

### branding

Newton's second law

```ocaml
let a m f = f /. m;;
(*val a : float -> float -> float = <fun>*)

let body, engine = 0.0122, 50.0;;

a engine body;; (* oops *)
(*- : float = 0.000244*)
```

---vert---

type aliasing doesn't help

```ocaml
type mass = float and force = float and acceleration = float;;

let a (m:mass) (f:force) : acceleration = f /. m;;
(*val a : mass -> force -> acceleration = <fun>*)

a engine body;; (* still oops *)
(*- : float = 0.000244*)
```

---vert---

simulate branding using `type`

```ocaml
type mass = Kg of float;;
type force = Newton of float;;
type acceleration = M_s'2 of float;;

let a (Kg m) (Newton f) = M_s'2 (f /. m);;
(*val a : mass -> force -> acceleration = <fun>*)

let body = Kg 2.0;;
let engine = Newton 50.0;;

a body engine;;
(*- : acceleration = M_s'2 25.*)

a engine body;;
(*   a engine body;;
       ^^^^^^
Error: This expression has type force but an expression was expected of type mass*)
```

---

### variant types

```ocaml
type shape =
    Point
  | Line of float
  | Circle of float
  | Rectangle of float * float;;

let area = function | (Point | Line _) -> 0.0
  | (Circle r) -> Float.pi *. r *. r
  | (Rectangle (w, h)) -> w *. h;;
(*val area : shape -> float = <fun>*)
```

---

### pattern matching

```ocaml
let line = Line 5.3;;
(*val line : shape = Line 5.3*)

let Line length = line;;
(*  ^^^^^^^^^^^
Warning 8: this pattern-matching is not exhaustive.*)
(*val length : float = 5.3*)

let Circle radius = line;;
(*Exception: Match_failure*)
```

---vert---

⚠️ constructors cannot be rebound by `let`

```ocaml
let Point = Point;; (*OK*)
let Point = 5.3;;
(*          ^^^
Error: This expression has type float but an expression was expected of type shape*)
```

---

### recursive datatypes

🛈 every list is either `[]` or `head::tail`

```ocaml
type intlist =
    Nil
  | (::) of int * intlist;;

let rec length = function
  | Nil -> 0
  | (x::xs) -> 1 + length xs;;
(*val length : intlist -> int = <fun>*)
```

---

### polymorphic datatypes

```ocaml
(*predefined*)
type 'a list =
    [] (*special symbol*)
  | (::) of 'a * ('a list);;

"hello" :: "world" :: [];;
(*- : string list = ["hello"; "world"]*)
```

---vert---

```ocaml
(*predefined*)
type 'a option = None | Some of 'a;;

let hd' = function
  | [] -> None
  | (x::_) -> Some x;;
(*val hd' : 'a list -> 'a option = <fun>*)

hd' [1; 2; 3];;
(*- : int option = Some 1*)

hd' [];;
(*- : 'a option = None*)
```

---vert---

```ocaml
type ('a, 'b) union = Type1 of 'a
  | Type2 of 'b;;

let five = Type1 5;;
(*val five : (int, 'a) union = Type1 5*)

let hello = Type2 "hello";;
(*val hello : ('a, string) union = Type2 "hello"*)

let five_or_hello = if true then five else hello;;
(*val five_or_hello : (int, string) union = Type1 5*)

let int_char_list = [Type1 5; Type2 'a'];;
(*val int_char_list : (int, char) union list = [Type1 5; Type2 'a']*)
```

---

### trees

```ocaml
type 'a tree = Nil | Br of 'a * ('a tree) * ('a tree);;

let leaf x = Br (x, Nil, Nil);;
let tree2 = Br(2, leaf 1, leaf 3);;
let tree5 = Br(5, leaf 6, leaf 7);;
let tree4 = Br(4, tree2, tree5);;
(*val tree4 : int tree =
  Br (4, Br (2, Br (1, Nil, Nil), Br (3, Nil, Nil)),
   Br (5, Br (6, Nil, Nil), Br (7, Nil, Nil)))*)
```

---vert---

<!-- .slide: data-background-iframe="http://localhost:16789/notebooks/tut2-b-binary-search-trees.ipynb" data-background-interactive -->

---vert---

```ocaml
let rec size = function
  | Nil -> 0
  | Br(_, l, r) -> 1 + size l + size r;;
(*val size : 'a tree -> int = <fun>*)
```

---vert---

### binary search trees

* implement an associative array using trees
* the keys and values may be anything
* assumption: the tree is ordered

---vert---

```ocaml
let rec get tr k = match tr with
  | Nil -> None
  | Br((nk, nv), left, right) -> match compare nk k with
    | 0 -> Some nv
    | n when n < 0 -> get left k
    | _ -> get right k;;
(*val get : ('a * 'b) tree -> 'a -> 'b option = <fun>*)
```

---vert---

```ocaml
let rec insert tr (k, v) = match tr with
  | Nil -> leaf (k, v)
  | Br ((nk, nv), left, right) -> match compare nk k with
    | 0 -> Br ((k, v), left, right)
    | n when n < 0 ->
        Br ((nk, nv), insert left (k, v), right)
    | _ ->
        Br ((nk, nv), left, insert right (k, v));;
(*val insert : ('a * 'b) tree -> 'a * 'b -> ('a * 'b) tree = <fun>*)
```

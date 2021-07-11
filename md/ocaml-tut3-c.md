# OCaml

## lazy expressions

---

### basic usage

`lazy` defers the computation of an expression until its value is needed

```ocaml
lazy expr;;
```

---vert---

before a lazy expression is evaluated its value is printed as `<lazy>`

```ocaml
let lazy_expr = lazy (print_endline "lazy_expr is evaluated"; 1 + 1);;
(*val lazy_expr : int lazy_t = <lazy>*);;
```
<!-- .element: data-thebe-executable -->

---vert---

### forcing evaluation

```ocaml
Lazy.force lazy_expr;;
```
<!-- .element: data-thebe-executable -->

note that `lazy_expr is evaluated` is printed

---vert---

after its evaluation - its value changes

```ocaml
lazy_expr;;
```
<!-- .element: data-thebe-executable -->

it's no longer `<lazy>` but `lazy` applied to a concrete value

---vert---

forcing it again won't reevaluate the expression

```ocaml
Lazy.force lazy_expr;;
```
<!-- .element: data-thebe-executable -->

note that nothing is printed

---

### pattern matching

use `lazy x` to match against lazy expressions

```ocaml
let le = lazy (1 + 1);;

let lazy n = le;;
```
<!-- .element: data-thebe-executable -->

---vert---

matching against `lazy x` forces evaluation

```ocaml
let lazy n = le;;

(*is equivalent to*)

let n = Lazy.force le;;
```
<!-- .element: data-thebe-executable -->

---vert---

evaluation is forced even when using a wildcard

```ocaml
match Random.bool (), le with
  | true, _ -> "le is not evaluated"
  | false, lazy _ -> "le is evaluated"
```
<!-- .element: data-thebe-executable -->

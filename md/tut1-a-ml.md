# OCaml

## introduction

---

### basic usage

* interpreter - `utop` or `ocaml`
* prompt (#)
* double-semicolon terminated

```text
    OCaml version 4.08.1
# 5 + 3;;
- : int = 8
```

---vert---

### load from file

* create a file named `myfile.ml`
* start OCaml and

    ```ocaml
    #use "c:\\myfile.ml";;
    ```

* or:

    ```bash
    ocaml myfile.ml
    ```

---vert---

### REPL

* OCaml can be used through an interpreter
* expressions followed by **two semicolons** yield a response

    ```ocaml
    2 + 2;;
    (*- : int = 4*)
    ```

* the response is the computed value and its type

---vert---

OCaml can also be compiled

(more on that in the hw assignments)

---

### declaring constants

---vert---

naming constants

```ocaml
let seconds = 60;;
(*val seconds : int = 60*)
```

---vert---

using names in expressions

```ocaml
let minutes = 60;;
(*val minutes : int = 60*)

let hours = 24;
(*val hours : int = 24*)

seconds * minutes * hours;
(*- : int = 86400*)
```

---

### legal names

---vert---

### alphabetic names

* begins with a letter
* followed by letters, digits, underscore, or single quotes
* case sensitive

```ocaml
x
x'
uB40
hamlet_prince_of_denmark
h''3_H
```

---vert---

### symbolic names

* permitted over the characters:

    ```ocaml
    ~ ! ? $ & * + - / = > @ ^ | % < : #
    ```

* can't start with:

    ```ocaml
    ~ ! ? : .
    ```

* should not be one of:

    ```ocaml
    !=    #     &     &&    *     +     -     ~
    -.    ->    .     ..    .~    :     ::    |
    <     <-    =     >     ?     :>    :=    ||
    ```

---vert---

* to name something with a symbolic name use parentheses:

    ```ocaml
    let (+-+-+) = 1415;;
    (*val ( +-+-+ ) : int = 1415*)
    ```

* avoid using it for values

* used mainly for defining operators (more on that later...)

    ```ocaml
    let (<->) x y = x * x + y * y;;
    (*val ( <-> ) : int -> int -> int = <fun>*)
    3 <-> 4;;
    (*- : int = 25*)
    ```

---

### ocaml keywords

```ocaml
and         as          assert      asr         begin
constraint  do          done        downto      else
exception   external    false       for         fun
functor     if          in          include     inherit
land        lazy        let         lor         lsl
lxor        match       method      mod         module
new         nonrec      object      of          open 
private     rec         sig         struct      then
true        try         type        val         virtual
while       with        class       end         function
initializer lsr         mutable     or          to
when
```

---

### calling functions

say `foo` is a function that takes 2 arguments

```ocaml
foo 1 2;;
(*- : int = 3*)

foo (1 2) (*compilation error!*)
foo (1, 2) (*compilation error!*)
```

---vert---

you might need to add parentheses at times

```ocaml
foo -1 -2 (*compilation error! parsed as `((foo - 1) - 2)`*)
foo (-1) (-2) (*OK*)
```

---

### OCaml Primitive Types

`int`, `float`, `string`, `char`, `bool`, `unit`

---

### int

* sequence of digits
  * 0
  * 01234
* `-` for unary minus sign
  * `-23`
  * `-85601435654638`
* infix operators: `+` `-` `*` `/` `mod`

---vert---

conventional precedence (parenthesis can be dropped without change of meaning)

```ocaml
(((m * n) * l) - (m / j)) + j
```

---

### float

* decimal point
  * `2.718281828`
  * `1.` is the same as `1.0`
* e notation
  * `7e-5`
  * `-1.2e12`
  * `-123.4e-2` is the same as `-1.234`
* infix operators: `+.` `-.` `*.` `/.` (all end with a dot)
* `-.` for unary minus (`-` is allowed for literals)

---vert---

### float functions

```ocaml
(*converts float to int*)
int_of_float 2.5;;
(*- : int = 2*)

(*converts int to float*)
float_of_int 5;;
(*- : float = 5.*)
```

and many more: `sqrt`, `sin`, `cos`, `tan`, `exp`, `log` (all of type `float->float`)

---

### string

---vert---

constants are written in double quotes

```ocaml
"ocaml is the best";;
(*- : string = "ocaml is the best"*)
```

special characters `\n`, `\t`, `\"`, `\\`

---vert---

concatenation

```ocaml
"Objective" ^ " " ^ "Caml";;
(*- : string = "Objective Caml"*)
```

---vert---

comparison

```ocaml
"abc" < "cba";;
(*- : bool = true*)

"zzz" > "aaa";;
(*- : bool = true*)
```

---vert---

`String.length` returns the number of characters

```ocaml
String.length "ABC";;
(*- : int = 3*)
```

---

### char

---vert---

chars are enclosed in single quotes

```ocaml
'a';;
(*- : char = 'a'*)
```

---vert---

conversion between strings and chars

```ocaml
String.make 1 'c';;
(*- : string = "c"*)

String.get "hello" 0;;
(*- : char = 'h'*)
```

---vert---

conversion between chars and ASCII

```ocaml
Char.code 'a';;
(*- : int = 97*)

Char.chr 97;;
(*- : char = 'a'*)
```

---

### bool

the two values are

```ocaml
true;;
(*- : bool = true*)

false;;
(*- : bool = false*)
```

operators: `&&`, `||`, `not`

---

### unit

has only one value

```ocaml
();;
(*- : unit = ()*)
```

---

### tuples - cartesian product type

the n-tuple whose components are `x1`, ..., `xn`:

```ocaml
(x1, x2, ..., xn)
```

(the parentheses are optional)

---vert---

the tuple type is written using `*`

```ocaml
(1, 2, 3);;
(*- : int * int * int = (1, 2, 3)*)
```

---vert---

the components can be of any type, including tuples

```ocaml
let a = (1.5, 6.8);;
(*val a : float * float = (1.5, 6.8)*)

1, 1.5;;
(*- : int * float = (1, 1.5)*)

("str", 1, true, ('0',0.1));;
(*- : string * int * bool * (char * float) = ("str", 1, true, ('0', 0.1))*)
```

---

### records

records have fields identified by name

```ocaml
type person = {name: string; age: int};;
(*type person = { name : string; age : int; }*)

let me = {name="Ofir"; age=30};;
(*val me : person = {name = "Ofir"; age = 30}*)
```

---vert---

selecting a field using `.`

```ocaml
me.name;;
(*- : string = "Ofir"*)
```

---vert---

a record is identified by its fields

```ocaml
```

---

### lists

a list is a finite homogenous sequence of elements

```ocaml
[3; 5; 9];;
(*- : int list = [3; 5; 9]*)
["a"; "list"];;
(*- : string list = ["a"; "list"]*)
[];;
(*- : 'a list = []*)
```

---vert---

note that elements are separated by a `;` and not by a `,`

```ocaml
[3, 4, 3];;
(*- : (int * int * int) list = [(3, 4, 3)]*)

[1, 2 ; 3, 4];;
(*- : (int * int) list = [(1, 2); (3, 4)]*)
```

---vert---

elements may have any type but all elements must have the same type

```ocaml
[(1, "one"); (2, "two")];;
(*- : (int * string) list = [(1, "one"); (2, "two")]*)

[[3.1;]; []; [1.0; -0.5]];;
(*- : float list list = [[3.1]; []; [1.; -0.5]]*)

[1; "abc"];; (*Error!*)
```

---

### structural equality

* works as expected for most values
* `=` is used for equality
* `<>` is used for inequality

```ocaml
1 + 2 = 3;;
(*- : bool = true*)
```

---

### physical equality

* implementation dependent
* `==` is used for equality
* `!=` is used for inequality

```ocaml
1 == 1;;
(*- : bool = true*)
"abc" == "abc";;
(*- : bool = false*)
let s = "abc";;
s == s;;
(*- : bool = true*)
```

---

### functions

```ocaml
let sq (x: int) = x * x;;
(*val sq : int -> int = <fun>*)
```

* keyword `let` starts the function declaration
* `sq` is the function name
* `x:int` is the formal parameter with type constraint
* `x * x` is the body and it is an **expression**

---vert---

* the result of the function is the result of evaluating the **expression** of the function body with the actual parameter
* `int->int` is the standard mathematical notation for a function type that takes an integer and returns an integer

---

### applying a function

* simple function call

    ```ocaml
    sq 3;;
    (*- : int = 9*)
    ```

* when a function is called the parameter is evaluated and then passed to the function

    ```ocaml
    sq (sq 3);;
    (*- : int = 81*)
    ```

* note that parentheses are optional

    ```ocaml
    sq (3);;
    (*- : int = 9*)
    ```

---

### arguments and results

* every function has one argument and one result
* any type can be passed/returned!!!
* tuples can be used to pass/return several arguments

```ocaml
let a = (3., 4.);;
(*val a : float * float = (3., 4.)*)

let lengthvec ((x, y): float * float) = sqrt(x *. x +. y *. y);;
(*val lengthvec : float * float -> float = <fun>*)

lengthvec a;;
(*- : float = 5.*)

lengthvec (5.0, 12.0);;
(*- : float = 13.*)
```

---

### recursive functions

* to define a recursive function you need the `rec` keyword

    ```ocaml
    let rec factorial n =
        if n = 0
            then 1
            else n * (factorial (n - 1));;
    ```

* without `rec` we'll get an error:

    ```text
            else n * (factorial (n - 1));;
                      ^^^^^^^^^
    Error: Unbound value factorial
    Hint: If this is a recursive definition,
    you should add the 'rec' keyword on line 1
    ```

---

### functions as values

* anonymous functions with `fun` notation

    ```ocaml
    fun (x:int) -> x * x;;
    (*- : int -> int = <fun>*)

    (fun (x:int) -> x * x) 3;;
    (*v- : int = 9*)
    ```

* the following declarations are identical

    ```ocaml
    let sq (x:int) = x * x;;
    let sq = fun (x:int) -> x * x;;
    ```

---

### returning functions

* functions can also be __returned__ from other functions

    ```ocaml
    let inttwice (f: (int->int)) = fun x -> f (f x);;
    (*val inttwice : (int -> int) -> int -> int = <fun>*)
    ```

* `->` is right associative so the last line is equivalent to:

    ```ocaml
    (*val inttwice : (int -> int) -> (int -> int) = <fun>*)
    ```

* example

    ```ocaml
    let f = inttwice (fun x -> x*x);;
    (*val f : int -> int = <fun>*)

    f 3;;
    (*- : int = 81*)
    ```

---

### type inference

OCaml deduces the types in expressions

```ocaml
let rec facti (n, p) =
    if n = 0 then p else facti (n - 1, n * p);;
(*val facti : int * int -> int = <fun>*)
```

* the constant `0` has type `int`
* therefore `n=0` involve integers so `n` has type `int`
* `n * p` is integer multiplication, so `p` has type `int`
* `facti` returns type `int`

---

<!-- .slide: data-background-iframe="http://localhost:16789/notebooks/tut1-type_constraints.ipynb" data-background-interactive -->

---

### polymorphic type checking

|                           |        | flexibility | security |
|:-------------------------:|:------:|:-----------:|:--------:|
|        weakly typed       |  lisp  |      ✔      |          |
|       strongly typed      |  Java  |             |     ✔    |
| polymorphic type checking | OCaml  |      ✔      |     ✔    |

and in OCaml most types are deduced automatically 😎

---

### polymorphic function definitions

* an object is polymorphic if it can be regarded as having any kind of type
* if type inference doesn't constrain a type then it's polymorphic
* a polymorphic type contains a type variable (e.g. `'a`)

```ocaml
let pairself x = (x, x);;
(*val pairself : 'a -> 'a * 'a = <fun>*)

pairself 4.0;;
(*- : float * float = (4., 4.)*)

let pair (x,y) = (y,x);;
(*val pair : 'a * 'b -> 'b * 'a = <fun>*)
```

---

### functions as values - the polymorphic case

---vert---
<!-- .slide: data-background-iframe="http://localhost:16789/notebooks/tut1-functions-polymorphic.ipynb" data-background-interactive -->

---

### functional vs. imperative

* imperative - using commands to change the state
* functional - stateless. using expressions recursively to calculate the result
* example: Euclid's algorithm for the Greatest Common Divisor (GCD) of two natural numbers:

`$$gcd(m,n) = \begin{cases}n,\;m = 0&\\gcd(n\;mod\;m,m), \;m>0\end{cases}$$`

---vert---

### GCD - C vs. OCaml

an imperative C program:

```c
int gcd(int m, int n) {
    while (m != 0) {
        int tmp = m;
        m = n % m;
        n = tmp;
    }
    return n;
}
```

a functional program in OCaml:

```ocaml
let rec gcd m n =
    if m = 0 then n else gcd (n mod m) m;;
```

which one is more efficient? 🧐

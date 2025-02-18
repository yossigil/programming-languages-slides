# Prolog

## introduction

---

### basic constructs

---vert---

the basic constructs of prolog are terms and statements

---vert---

#### terms - atoms

the simplest term is an **atom**, the following are atoms:

```prolog
john
$<@
'an atom'
```

---vert---

an **atom** is

* a string of letters, digits, and an underscore starting with a **lower-case letter**: `anna x_25 nil`
* a string of special characters (`+ - * / < > = : . & _ ~`): `$<@ <----> .:.`
* a string of characters enclosed in single quotes: `'Tom' '2A$'`

---vert---

#### terms - numbers

* integers: `123 -42`
* real numbers: `3.14 -0.573 2.4e3`

---vert---

#### terms - variables

a **variable** is a string of letters, digits and an underscore starting with an upper-case letter or an underscore

```prolog
X_25
_result
```

---vert---

#### compound terms

a **compound term** comprises a functor and arguments

```prolog
course(236319, pl)
```

a functor `f` of arity `n` is denoted `f/n`

---vert---

#### terminology

* a term is **ground** (קונקרטי) if it contains no variables
* a **goal** is an atom or a compound term
* a **predicate** (פרדיקט) is a functor for which a list of clauses is defined
* a **clause** (פסוקית) is a fact or a rule

---vert---

#### facts

a **fact** (עובדה) is a kind of statement

```prolog
eats(bear, honey).
```

this fact states that the **predicate** `father` holds for the atoms `bear` and `honey`

---vert---

facts can have any arity

```prolog
summer.
sad(john).
plus(2, 3, 5).
```

---vert---

a finite set of facts constitutes a program

```prolog
mammal(rat).
mammal(bear).
fish(salmon).
eats(bear, honey).
eats(bear, salmon).
eats(rat, salmon).
eats(salmon, warm).
```

---vert---

facts can contain variables

```prolog
likes(X, course_236319).
```

variables are universally quantified

`$$\forall X,likes(X, course\_236319)$$`

---vert---

#### queries

a **query** (שאילתה) is a conjunction of goals

```prolog
eats(X, salmon), eats(X, honey).
% X = bear.
```

variables are existentially quantified

`$$\exists X,eats(X, salmon) \land eats(X, honey)$$`

---vert---

#### rules

a **rule** (חוק, כלל) is a statement which enables us to define new relationships in terms of existing ones

```prolog
predicate(term1, ..., termN) :- goal1, ..., goalN.
```

---vert---

`Y` is a survival dependency of `X` if:

* `X` eats `Y`
* or `X` eats `Z` and `Y` is a survival dependency of `Z`

```prolog
survival_dependency(X, Y) :- eats(X, Y).
survival_dependency(X, Y) :-
    eats(X, Z), survival_dependency(Z, Y).
```

---

### writing Prolog programs

* create a file named `prog.pl`
* write clauses in `prog.pl`
* enter the prolog interpreter
* type `consult(prog.pl)`
* query the interpreter

---vert---

#### dynamic clauses

you can add clauses dynamically

```prolog
assertz(eats(bear, tuna)).
assertz((
  mother(Child, Mother) :-
    parent(Child, Mother),
    female(Mother)
)).
```

`asserta` asserts the clause as first clause of the predicate while `assertz` asserts it as last clause

---vert---

dynamically remove a clause using `retract/1`

```prolog
assertz(q(a)).
assertz((p(X) :- q(X))).
assertz(p(b)).
p(a).
% true.

retract(p(X) :- q(a)).
p(a).
% false.
```

---vert---

dynamically remove clauses using `retractall/1`

```prolog
assertz(q(a)).
assertz((p(X) :- q(X))).
assertz(p(b)).
p(a), p(b).
% true.

retractall(p(_)).
p(a).
% false.
p(b).
% false.
```

---vert---

dynamically remove a predicate using `abolish/1`

```prolog
assertz(p(a)).
assertz(p(b)).
p(a), p(b).
% true

abolish(p/1).
p(X).
% ERROR: Unknown procedure: p/1 (DWIM could not correct goal)
```

---

### meaning of a prolog program

* declarative meaning
  * the inference algorithm is an implementation detail
  * not always easy to achieve
* procedural meaning
  * but thinking procedurally makes it harder to come up with an elegant solution
  * beats the purpose of the paradigm

---

### matching

two terms match if:

* they are identical
* the variables in both terms can be instantiated to make the terms identical

---vert---

the operator `=` performs matching

```prolog
course(N, S, 95) = course(X, fall, G).
/*
N = X,
S = fall,
G = 95.
*/
```

---vert---

```prolog
course(N, S, 95) = course(Y, M, 96).
% false.

course(X) = semester(Y).
% false.
```

---vert---

#### matching rules

terms `S` and `T` match if:

* `S` and `T` are the same atom
* `S` and `T` are the same number
* if one is a variable it's instantiated to the other
* if `S` and `T` are compound terms, they match iff:
  * they have the same functor and arity
  * all their corresponding arguments match
  * the variable instantiations are compatible

---vert---

#### geometric example

use compound terms to represent geometric shapes

```prolog
point(1, 1)
seg( point(1, 1), point(2, 3) )
triangle( point(4, 2), point(6, 4), point(7, 1) )
```

---vert---

```prolog
triangle(point(1, 1), A, point(2, 3))
=
triangle(X, point(4, Y), point(2, Z)).
/*
A = point(4, Y),
X = point(1, 1),
Z = 3.
*/
```

---vert---

#### matching as means of computation

facts:

```prolog
vertical(seg(
    point(X, Y1),
    point(X, Y2)
)).
```

queries:

```prolog
vertical(seg(point(1, 1), point(1, 2))).
% true.

vertical(seg(point(1, 1), point(2, Y))).
% false.

vertical(seg(point(2,3), P)).
% P = point(2, _17044).
```

---

### arithmetic

* the operators `+ - * / div mod` are (infix) binary relations
* but they are arithmetic operators after the operator `is`

```prolog
X = 1 + 2.
% X = 1+2.

X is 1 + 2.
% X = 3.
```

---vert---

#### comparison operators

```prolog
X > Y
X < Y
X >= Y
X =< Y
X =:= Y  % equal
X =\= Y  % not equal
```

---vert---

the comparison operators also force evaluation

```prolog
11 * 6 = 66.
% false.

11 * 6 =:= 66.
% true.
```

---vert---

#### `=` VS. `=:=`

* `=` is used for matching and may instantiate variables
* `=:=` causes an arithmetic evaluation of its operands and cannot instantiate variables

```prolog
1 + X = Y + 2.
% X = 2, Y = 1.

1 + X =:= Y + 2.
% ERROR: =:=/2: Arguments are not sufficiently instantiated
```

---vert---

#### GCD

```prolog
gcd(X, X, X).
gcd(X, Y, D) :-
    X < Y,
    Y1 is Y - X,
    gcd(X, Y1, D).
gcd(X, Y, D) :-
    Y < X,
    gcd(Y, X, D).
```

---

### builtin control predicates

---vert---

#### conjunction

the `,/2` predicate: the goal `(G1, G2)` succeeds if the goal `G1` and the goal `G2` succeed

```prolog
TODO: example
```

---vert---

#### disjunction

the `;/2` predicate: the goal `(G1 ; G2)` succeeds if `G1` or `G2` succeed. defined as follows:

```prolog
(G1 ; G2) :- G1.
(G1 ; G2) :- G2.
```

```prolog
TODO: example
```

---vert---

#### true

the predicate `true/0` always succeeds

---vert---

#### false

the predicates `false/0` and `fail/0` always fail

---vert---

#### negation as failure

* the negation predicate is `\+/1`
* for known predicates, prolog works under a closed world assumption - if something can't be proved then it is false
* it is not logical negation!

---vert---

```prolog
assertz(person(jimmy)).
assertz(person(cindy)).

person(rick).
% false.

\+ person(rick).
% true.
```

---vert---

it might not work like you'd expect

```prolog
person(X).
% X = jimmy ; X = cindy.

\+ person(X).
% false.
```

why doesn't prolog answer with `X = rick` or simply with `true`?

---vert---

`person(X)` succeeds (we saw that earlier) so its negation fails

if `G` fails `\+ G` succeeds otherwise it fails

---vert---

`\+/1` allows for non-monotonic reasoning - a fact can become false by adding clauses to the database

```prolog
assertz(illegal(murder)).
assertz((legal(X) :- \+ illegal(X))).

legal(theft).
% true.

assertz(illegal(theft)).
legal(theft).
% false.
```



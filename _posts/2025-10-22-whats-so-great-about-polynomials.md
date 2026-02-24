---
layout: post
title: "What's So Great About Polynomials?"
date: 2025-10-22
math: true
thumbnail: /assets/images/blog/polynomials/graph-polynomials.png
excerpt: "There is at least one good reason to care about polynomials!"
---

American math education is notorious for introducing mathematical concepts long before it introduces the reason to care about them. Case in point: polynomials. You know them. They're the functions that look like this:

$$f(x) = x^2 - x$$

or like this

$$f(x) = -3x^3 + x^2 - \frac{1}{2} x - \pi.$$

You probably learned about these when you took Algebra. If you're like most students, you weren't immediately given a very good reason to care!

In this post, I'll try to patch this hole by motivating polynomials for a student at a low level. They're not as unnatural as they might first appear; there is at least one good reason to care about polynomials!

## Writing Down Functions is Hard

In your math education, you've probably spent a lot of time staring at weird functions like this:

![The graph of a function that squiggles lazily](/assets/images/blog/polynomials/graph-squiggle1.png)

or this:

![The graph of a function with some curves and sharp corners](/assets/images/blog/polynomials/graph-squiggle2.png)

or this:

![The graph of a function that squiggles wildly](/assets/images/blog/polynomials/graph-squiggle3.png)

Drawing weird squiggly functions is easy. But what if you actually wanted to **write one of these down**? Like, think about the function in the last picture here. How would you even start to write down a **formula** for that thing?

The thing I'm trying to draw your attention to here is a certain **gap**:

**It's way easier to draw a graph than to write down a formula.**

If I give you some axes and a pen and ask you to draw a function, you have a lot of **flexibility**. But if I ask you to write a formula? Where do you start? It would be nice to have a similarly **flexible** way to write down **formulas** too.

## Start Simple

Imagine I give you a little graphing calculator. You can type in a formula and it will graph it for you.

But the calculator is **super simple**. It doesn't have many buttons, just the very basics:

- The usual number buttons, which are 0 through 9 and a decimal point.
- A "+" and "-" button (but no multiplication or division!)
- I'll even throw in parentheses (so long as you don't use them to smuggle in any multiplication).

You can use those buttons however you want to come up with formulas, then press the "Go!" button to plot out the graph. Here. I made a detailed 3D rendering of what the calculator might look like:

![A very crude drawing of a calculator](/assets/images/blog/polynomials/calc-basic.png)

Let's try it out. You type in "1" and hit "Go!". It makes a plot like

![A graph that just looks like a horizontal line](/assets/images/blog/polynomials/graph-horizontal.png)

You type in "(6-8)+1.2". That just simplifies to -0.8, so it makes a plot like

![A graph that looks like a horizontal line, but a little lower now](/assets/images/blog/polynomials/graph-horizontal-lower.png)

You quickly find that no matter what you do, all of your graphs are boring **horizontal lines**. This makes sense! The "formulas" you can type in don't even include the variable $x$. Without more buttons, you can only make **constant functions**, like $f(x)=1$ or $f(x)=-0.8$. You can make (almost) any constant function you want! But nothing more.

Okay, I'm going to give you a new button now. It's an $x$ button. It's not multiplication! Don't get greedy! It's the **variable** $x$. You can now include $x$ in your formulas.

![The same crudely drawn calculator as before, but with a fancy new button that says x](/assets/images/blog/polynomials/calc-with-x.png)

That unlocks some new possibilities! You punch in $1+x$ and hit "Go!"

![A graph that looks like a straight line sloping up to the right](/assets/images/blog/polynomials/graph-slope.png)

It slopes! That's new! You try $(x-1)+x-3.1x+5$.

![A graph that looks like a straight line that's almost vertical](/assets/images/blog/polynomials/graph-steep.png)

As you keep messing around, you find that you can only make graphs that are **straight lines**. The functions you can make with this calculator are the **linear functions**! That's something, but it's not quite the level of flexibility we're after. It's still kind of boring.

Notice the pattern: each new capability we give to the calculator unlocks a larger class of functions for you. There is a tension between the **simplicity** of the calculator and the **flexibility** of the functions it lets you create.

Okay, I'm going to give you one more button. This will make the calculator a little more complicated, but this button will change everything.

![The same crudely drawn calculator as before, but this one has a new glowing button for multiplication](/assets/images/blog/polynomials/calc-with-multiply.png)

Now you can go wild. You can type in things like

- x\*x
- x\*(3-x)
- -(2.1-0.1x)\*x-2x\*x
- (1-(2-(3-x)\*x)\*x)\*x
- x\*x\*x\*x\*x\*x\*x\*3\*x

and the calculator is spitting out graphs that are all over the place:

![Many graphs of different shapes all plotted on the same axes](/assets/images/blog/polynomials/graph-polynomials.png)

We started with very basic arithmetic operations. We added one button at a time, each one unlocking a little extra power. With that last button (multiplication), we hit a critical mass of possibilities. The functions that you have unlocked now are the **polynomials**.

The usual definition of "polynomial" is about being a sum of monomials or whatever. We've just laid out a very different but equivalent definition: **polynomial functions in $x$ are the functions one can produce using addition, subtraction, multiplication, constants, and $x$.**

## Polynomials Can (Approximately) Do Anything

What do I mean when I say we've hit a "critical mass of possibilities" when we reach the polynomials? It's more than just the fact that we can make wiggly functions. You can, in some sense, make **any function you want** using a polynomial.

Specifically I mean the following. You give me a drawing of a function. If that function doesn't do anything crazy (like jumps or holes or weird stuff like that) then **I can come up with a polynomial which matches the graph you drew as closely as you want**. (This fact is called the [Weierstrass approximation theorem](https://en.wikipedia.org/wiki/Stone%E2%80%93Weierstrass_theorem).)

In short, one good reason to care about polynomials is that they are **the simplest class of function that is still flexible enough to let you match any other function**.

---

You might be thinking about a missing button on our calculator: "What about division?" Well, if you add a "$\div$" button to that calculator, you'll get even **more** freedom. The functions you'll unlock with that extra button are the [rational functions](https://en.wikipedia.org/wiki/Rational_function)! They can do things that polynomials can't do, like shoot off to infinity.

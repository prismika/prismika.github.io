---
layout: post
title: "Probabilities Are Less Real Than You Think"
date: 2024-12-15
math: true
thumbnail: /assets/images/blog/probabilities/dice.jpg
excerpt: "Probability statements tend to carry some of the gravitas and authority of mathematics. I claim that we tend to take these statements too seriously. Real world events do not have intrinsic probabilities."
---

![Seven red dice of various shapes](/assets/images/blog/probabilities/dice.jpg)

> "Sir, the possibility of successfully navigating an asteroid field is approximately three thousand seven hundred and twenty to one!"
> -- C-3PO

Probability statements tend to carry some of the gravitas and authority of mathematics. I claim that we tend to take these statements too seriously. **Real world events do not have intrinsic probabilities.**

Let's start with an anecdote.

## A Story About A Big Number

I once worked as a counselor at the Ross program, which is a summer camp for mathematically inclined high school kids. (If you are such a high school kid, [you should apply](https://rossprogram.org/)!) During the afternoons, the counselors would often collect around tables in the library to "grade," meaning we would all collaborate to distract each other from our grading duties.

One "grading" afternoon, a counselor pulled a random book from the library shelf behind him. He found a checkout receipt inside with a transaction number printed on it. He laid it in the middle of the table.

"Do you guys think this number is prime?"

We all stared at the number for a moment. It was about twelve digits long. It wasn't obviously *not* prime.

I don't know if you've ever been in a room with a bunch of mathematicians who don't want to do their work. If you have, it will come as no surprise that we spent an hour trying to determine whether this number was prime. Finally we gave up and punched it into an online primality tester. It was prime. Our distraction had ended.

"Huh. It's prime," one counselor mused. "What were the odds?"

Another pause.

"Hey yeah, what *were* the odds?"

On this new question, we successfully burnt another hour.

---

The question we had produced was "What was the probability that this specific number would be prime?" The interesting and odd thing about this question is that, at face value, it doesn't make sense. The statement "$N$ is prime" is deterministic, not random. There are no probabilities to be seen here. At the same time, *intuitively* it makes perfect sense. We knew that large prime numbers were relatively rare, and our specific twelve-digit number *felt* randomly selected. So maybe there's some way to make the question make sense? Here are some formalizations we kicked around.

What is the probability that $N$ is prime if $N$ is selected...

- uniformly at random from all 12-digit numbers?
- uniformly at random from all 12-digit numbers that aren't divisible by 2 or 5 (since otherwise we wouldn't have asked if it was prime)?
- uniformly at random from all 12-digit numbers that aren't divisible by 2, 5 or 3 (since these were all the divisors we checked for before we "really got into it")?
- from a Poisson distribution whose mean is our 12-digit number?

In other words, **we needed to select a random model for our deterministic question**. I think any one of the above models would be a reasonable choice, and they would all give different answers. **We must conclude that there is no such thing as "the" probability that $N$ is prime. That probability will depend on modeling decisions.**[^1]

## The Flipped Quarter

The prime number example shows that sometimes it doesn't make sense to talk about "the" probability of an event until you've made some modeling decisions. Even the simplest real-world probability calculation depends on modeling decisions. **For instance, suppose I take out a quarter and flip it into the air. What's the probability that it comes up heads?**

The simplest answer is, of course, **50%**. Each of the two faces will come up with equal probability. Easy.

But wait, I seem to remember that a quarter isn't perfectly balanced, and that one side has a roughly 51% probability of coming up. But I don't remember which face, so I guess the answer is **either 51% or 49%** and I just don't know which.

On the other hand, if I don't remember which face is heavier, maybe I should factor in my uncertainty by taking the expected probability over both the heads-more-likely scenario and the tails-more-likely scenario. That will bring me back to an answer of **50%**, but for more sophisticated reasons this time.

But wait, let's back way up. I said that I've already flipped the coin in the air. A coin tumbling through the air is a classical system. If I had the time and enough information, I could calculate how the coin will fall. It's no different than if the coin had already landed and I just haven't looked at the result yet. So I guess it also makes sense to say the probability is **either 0 or 1** and I just don't know which.

As long as we're getting into physics, if we want to be *super* pedantic, is this system actually deterministic? Isn't there some basically-but-not-quite-zero probability $\varepsilon$ that some freak quantum event will reverse the outcome of my coin flip? So maybe we should amend our "0 or 1" answer to an answer of **either $\varepsilon$ or $1-\varepsilon$**.

You may have strong feelings about which model is the best, but in actuality, it depends! What do I want my probability to represent? The unknown starting conditions of a classical system? My uncertainty about the imbalance of the coin? Quantum randomness? This may sound like a Bayesian vs. frequentist question, but I don't think it is. I could argue for any of the above models from either a Bayesian or a frequentist perspective.

Even the simplest of applications of probability, the flip of a coin, forces you to choose a model. There is no such thing as "the" probability that a quarter will come up heads. **That probability only makes sense relative to a random model.**

## The Weather And Beyond

We've discussed quarter flipping. Now think about more complicated real-world systems about which we routinely make probability statements:

- travel times
- stock prices
- elections
- God forbid, *the weather*

If the probabilities involved with a simple quarter flip are already hiding implicit modeling decisions, how fraught must be our probability statements about something as complicated as *the weather*? If there's no such thing as "the" probability of a coin coming up heads, then any discussion about "the" probability of rain tomorrow is just outlandish. In order to rigorously calculate such a probability, one would have to make a million judgement calls about how to formalize the question. If some weather prediction service claims that the probability of rain tomorrow is 11%, they may just mean that they ran their favorite stochastic model a hundred times and it rained in eleven of those simulations. A different stochastic model would produce a different, equally valid number.[^2]

My point is **not** that no one should use the phrase "the" probability. My point is simply that, when someone discusses probabilities of real-world events, be aware that they have hopped over a conceptual gap. They have taken a messy, real-world system and made implicit decisions about how to model it with the formalism of probability theory. They have performed an act of translation, of interpretation, which requires real decisions. The number is not a fact about the world. It is a fact about a model.

I encourage you to take two lessons away from this post:

**1) If you want to calculate probabilities of real-world events, nothing can save you from making modeling decisions.**

**2) If someone tells you a probability, know that it is only as true as the model from which it was calculated.**

---

[^1]: In the end, we selected a model where $N$ was deterministic, but its *primality* was random, with probability determined by the asymptotic density of primes given by the prime number theorem (modified to ignore multiples of 2 and 5 since they are "obviously composite").

[^2]: This post, especially the weather example, was inspired by discussions with Dr. Robert C. Williamson, who is fond of using scare quotes when discussing "the" probability of an event. He and his [research group](https://fm.ls/about) study, among other topics, the assumptions underlying applications of probability theory.

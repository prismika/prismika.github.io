---
layout: post
title: "Playing Cards with Bayes' Theorem"
date: 2025-12-02
math: true
thumbnail: /assets/images/blog/playing-cards-bayes/wizard-cards.jpg
---

Wizard 330 is a home-brewed variant of Wizard, a trick-taking card game. (Think Spades or Euchre. That sort of game.) While strategizing, an interesting problem arises that can be solved very cleanly with some probability. To understand the problem, you don't need to understand the (admittedly very complicated) details of the game. All you need to know is the following:

- Wizard 330 is played with a deck of 90 cards whose contents are unknown at the beginning of the game. The deck is a random subset of a larger library of 120 cards.
- In particular, at the beginning of the game, the deck could have anywhere from zero to eight **wizards**, which are special, powerful cards. It is important for strategy to have a sense of how many wizards are in the deck.
- The game has 15 rounds, and during each round, some number of cards are revealed. The first round reveals $1\times 6$ random cards, the next reveals $2\times 6$ random cards, up to the final round which reveals all $15\times 6 = 90$ cards.

![The eight wizard cards](/assets/images/blog/playing-cards-bayes/wizard-cards.jpg)
This is what the eight wizards look like.

(The number of players, cards, and rounds actually vary from game to game, but this is a reasonable configuration so we'll stick with it.)

From these three facts, you might correctly guess that it's a good idea to look at the cards played each round and keep a running estimate of how many wizards are in the deck. The more wizards you see, the higher your guess should be.

This sounds like a job for statistics! We have an unknown parameter: the number of wizards in the deck, which we'll call $w$. Round $k$ gives us $6k$ samples from the deck without replacement, though the deck is replaced and re-shuffled between rounds. Let's cook up an estimator for the number of wizards!

## Maximum Likelihood

When making a point-estimator, maximum likelihood is a good place to start. Unfortunately, the maximum likelihood estimator here is quite bad. For instance, it's very common to see no wizards at all in the first round of the game. After all, there are at most eight wizards in the whole deck, and the first round only reveals six cards. If no wizards are seen in the first round, the maximum likelihood estimator for $w$ is zero, since the likelihood of seeing no wizards when $w=0$ is a flat 100%. However, zero-wizard games are phenomenally rare, so zero seems like a poor estimate.

Implicitly, when I talk about the rarity of zero-wizard games, I'm leaning on a prior belief about the number of wizards in the deck. This suggests we should do something Bayesian. Let's try it!

## Bayesian Estimator

Remember that our deck is a random subset of a larger 120-card library. This gives us a natural prior distribution for $w$; it should follow a [hypergeometric distribution](https://en.wikipedia.org/wiki/Hypergeometric_distribution)! After each round, we can use the number of wizards we saw to update the distribution using Bayes' theorem. This gives us more than just a point-estimate; we get a probability distribution for the number of wizards. If we really want a point-estimate, we can always take the expectation of this distribution.

Let's nail down some specifics. Let $w$ be the number of wizards in the deck and $X_j$ be the (random) number of wizards seen in round $j$. Suppose we observe the first $k$ rounds of play and see that $X_1=x_1,\dots, X_k=x_k$. Then an application of Bayes' theorem tells us that the weight assigned to the hypothesis that $w=w_0$ should be proportional to

$$\mathbb P(w = w_0) \prod_{j=1}^k\mathbb P(X_j=x_j \mid w=w_0).$$

The distribution of $w$, and the distributions of each $X_j$ conditioned on $w$, are all hypergeometric distributions, so we can easily compute these values.

I coded this up! Here are the running estimates using some real data from a game that turned out to have five wizards:

![Univariate Bayesian estimator bubble plot](/assets/images/blog/playing-cards-bayes/univariate-estimator.png)

This is a bubble plot. Each column shows the distribution of wizard counts after a certain number of rounds. The game progresses from left to right. For instance, the first column shows the prior distribution; it's the distribution for the number of wizards in the deck after zero rounds of play. After each round, we use the observed cards to update the distribution, creating the next column. The red line tracks the expectations of these distributions.

If we watch the columns from left to right, we see the distribution start out dispersed across the possibilities and slowly coalesce as we learn more and more about the deck. Finally, after the fifteenth round, every card has been revealed, so the distribution condenses at the true value of five. This gives us the big bubble in the last column.

In this example, this estimator leaves something to be desired. The estimates are consistently higher than the true value. The distributions favor a six-wizard outcome until the very end.

I think we can do better.

## Better Bayesian Estimator

We are not actually using all of the information at our disposal. You see, wizards actually come in four distinct **suits**.

![The four wizard suits](/assets/images/blog/playing-cards-bayes/wizard-suits.jpg)

There are two wizards of each suit in the full 120-card library. The four suits are unnamed because they're irrelevant for gameplay, so we just call them (from left to right in the image) sun, grape, bee, and seahorse wizards. If we keep track not just of how many wizards we see each round, but also how many wizards **of each suit**, we'll get a better estimator!

We've bought ourselves a trickier math problem. We're no longer estimating $w$, the number of wizards, we're now estimating $\vec w$, a vector of length four, where the entry $\vec w_i$ is the number of wizards of the $i$th suit in the deck. (I usually hate the vector arrow notation like $\vec w$, but in this case it is helpful for telling vectors and scalars apart.) Our estimator is defined similarly to the previous one. If we observe the first $k$ rounds and find that the vectors of observed wizards are $\vec X_1 = \vec x_1,\dots,\vec X_k = \vec x_k$, then the hypothesis that the true vector of wizards is $\vec w = \vec w_0$ should have probability proportional to

$$\mathbb P(\vec w = \vec w_0) \prod_{j=1}^k\mathbb P(\vec X_j=\vec x_j \mid \vec w= \vec w_0).$$

The distributions involved here are a little more complicated, but still simple enough to have a name! The distribution of $\vec w$ and those of each $\vec X_j$ conditioned on $\vec w$ are all [multivariate hypergeometric distributions](https://en.wikipedia.org/wiki/Hypergeometric_distribution#Multivariate_hypergeometric_distribution).

Anyway, once we have a posterior distribution for $\vec w$, the number of wizards of each suit, we can easily sum up some probabilities to get a distribution for the total number of wizards.

Let's code this up and apply it to the same five-wizard game. For comparison, here are the estimates we got from the old univariate estimator, followed by the estimates from the new multivariate one.

![Univariate Bayesian estimator bubble plot](/assets/images/blog/playing-cards-bayes/univariate-estimator.png)

![Multivariate Bayesian estimator bubble plot](/assets/images/blog/playing-cards-bayes/multivariate-estimator.png)

The difference is subtle but critical. Whereas the old estimator failed to coalesce on the five-wizard outcome until the very end, the new estimator successfully guesses five wizards as the modal outcome after round ten!

How practical is this for Wizard 330 strategy? The actual probability calculations would be very difficult to do without a computer. Maybe there's a simpler calculation that's approximately correct but much easier to do in your head, similar to blackjack card-counting approaches. I'm not sure.

So what do **I** do in practice? Thankfully, the people I play Wizard 330 with love to over-analyze the game, so we just run my script on a laptop where everyone can see live round-by-round analysis of wizard distributions. Half the fun of Wizard 330 comes from the simple joy of over-analysis.

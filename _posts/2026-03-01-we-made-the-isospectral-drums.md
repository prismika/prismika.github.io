---
layout: post
title: "We Made the Isospectral Drums and it Went... Fine"
date: 2026-03-01
math: true
thumbnail: /assets/images/blog/drums/drums.jpg
excerpt: "It's usually the task of the modeler to make their assumptions fit the real world as closely as is practical. It was now our task to make a real-world drum that conformed to the modeling assumptions."
---

"Can One Hear the Shape of a Drum?"

This question was popularized back in the 60's by the mathematician Mark Kac via an article published in the *American Mathematical Monthly*. If you haven't heard the question before, I recommend [Kac's original article](https://www.math.ucdavis.edu/~hunter/m207b/kac.pdf) if you have some mathematical background, or the [Wikipedia page](https://en.wikipedia.org/wiki/Hearing_the_shape_of_a_drum) if you don't. Either way, I'll summarize the meaning of the question here.

# The Question

Say you have a drum. The head of the drum is a membrane stretched taut over a shell. The shape of that membrane is usually circular in real-world drums, but it doesn't have to be; your drum head could be an ellipse, a square, or some weirder 2D shape.

![A very small and simple drum with a circular head.](/assets/images/blog/drums/paul-zoetemeijer-drum.jpg)
*Image by Paul Zoetemeijer*

You might not be surprised to learn that different drum head shapes will produce different sounds. But you might be surprised to learn how tight the connection between the geometry and the sound actually is.

If you hit the drum, the membrane will vibrate. This vibration is what creates the sound of the drum. That sound can be broken down into a bunch of individual frequencies $f_1, f_2, f_3, \dots$. Here's the surprising part. The set of frequencies *does not depend* on how hard you strike the drum or where you choose to strike it. Those variables matter for the *amplitudes* of those frequencies, but not the *set* of frequencies. The frequencies depend *only* on the geometry of the drum. So if you know the geometry of the drum, you can figure out the frequencies it is capable of producing.

$$ \text{Geometry} \longrightarrow \text{Frequencies} $$

The question is this: can we reverse this arrow?

$$ \text{Geometry} \overset{?}\longleftarrow \text{Frequencies} $$

That is, if I listen very closely to the sound of a drum, and I have very sensitive ears and perfect pitch so that I'm able to pick out all those frequencies $f_1,f_2,f_3,\dots$, can I in principle reverse-engineer the shape of the drum head that produced them?

**Is all of the geometric information encoded in those frequencies? Or is it the case that there are two drum heads that are different shapes, but nevertheless produce identical frequencies?**[^1]

[^1]: The question is sometimes phrased by saying that a pair of counterexample drums should "sound the same". This is not quite true. The geometry of a drum determines the set of frequencies that a drum can produce, *not* the relative amplitude of those frequencies. If you've ever heard muffled music through a wall, you know that the relative amplitudes of frequencies make a big difference in the way that something sounds. This is why I stick to the more precise phrase "produce identical frequencies".

Why do mathematicians care so much about this question? It's not because they're especially interested in drums. It's because "hearing the shape of a drum" can be reformulated as a natural question about the eigenvalues of the [Laplace operator](https://en.wikipedia.org/wiki/Laplace_operator), which is an object that mathematicians just love. The Laplacian shows up in geometry, analysis, physics, topology, graph theory, data science, and on and on. The reason the Laplacian is related to drum vibrations is that the operator appears in the wave equation. If you want to play around with the wave equation in a data science context, check out my [data sonification page](/projects/sonification/index.html)!

The question stood for over 20 years until the mathematicians Carolyn Gordon, David L. Webb, and Scott Wolpert published a [paper](https://arxiv.org/abs/math/9207215) with the wonderfully definitive title *One cannot hear the shape of a drum*. The paper describes (but does not explicitly depict) a pair of distinct shapes that, in theory, would produce identical frequencies if they were drum heads. Such a pair of shapes is called an *isospectral pair*.

![A pair of two-dimensional shapes. They are non-convex polygons, representing the shapes of the drum heads that theoretically would produce the same set of frequencies.](/assets/images/blog/drums/shapes.png)
*Image credit: Wikipedia user Keenan Pepper. Based on a depiction of the Gordon-Webb-Wolpert pair by S. J. Chapman.*

It's been over 30 years since that paper was posted. Since then, many more isospectral pairs have been discovered, many pairs of drums that should theoretically produce identical frequencies.


I was shocked to learn that, to the best of my knowledge, *no one has ever tried to actually build the drums*.

# The Project

I recruited three undergraduate students at Ohio State via Cycle, an undergraduate research program at OSU: Yicheng Lin, Mohamed Musa, and Alex Theis. **Together, we resolved to build the drums**. Over the course of a school year, we met, learned about the underlying math, and iterated on drum designs.

Note the strangeness of the engineering task. Ideally, we would like to produce drums that we can strike, record, and verify that they produce the same frequencies. For this project to work, our drum has to conform to the assumptions of the drum model as closely as possible. For instance, the math assumes that the head of the drum is a perfectly elastic membrane of uniform thickness, stretched uniformly in all directions, and perfectly fixed in place where it meets the shell. If that's what the model assumes, we'll have to make that happen if we want the process to work. **It's usually the task of the modeler to make their assumptions fit the real world as closely as is practical. It was now our task to make a real-world drum that conformed to the modeling assumptions.**

We talked through many designs and materials. What we eventually landed on was this:
![Some 3D-printed plastic discs, each with a big polygonal hole. Two of them are clamped together with wood clamps, with a piece of a yellow balloon sandwiched between.](/assets/images/blog/drums/drums.jpg)

It's more of a tambourine than a drum. Or maybe more of a sandwich than a tambourine.

For each drum, we 3D printed two discs, each half an inch thick. Each disc had a hole in the shape of one of the polygonal drum shapes. We stretched a latex balloon over one disc and sandwiched it under the other. We then clamped the sandwich together with wood clamps (which I inherited from my late grandfather, an accomplished carpenter. Thank you Grandpa!)

Reasons for our design decisions:
- Latex balloons have a nice elasticity, which is an important part of the model. Also, Party City was going out of business at the time.
- The model assumed that the edge of the membrane was fixed in place. We didn't want the discs vibrating at all, so the discs were thick with a heavy infill.
- Similarly, just stretching the balloon over *one* disc would leave the membrane free to lift up and away from the edge as it vibrated. Hence the sandwich.
- Stretching the balloon uniformly in all directions would be easiest if we were stretching it over a circular object, hence the disc shape.
- The model ignores everything but the head of the drum, so we didn't bother to build a shell.
- The more clamps, the slower the system lost its energy and the longer the membrane vibrated. We needed to get a good recording of the sound, so longer vibrations were important. This is why the four clamps were necessary.

# The Results
We flicked the drums and they sounded... like strangely-stretched balloons. It was going to take more work to determine whether the frequencies matched.

To test the drums, we took careful recordings of both drums using a microphone with high sample rate and bit depth. If the drums conformed closely enough to the simple mathematical model, then the frequency content of their sounds should be very similar.

To visualize the underlying frequencies of the drums, we used the program Wave Candy to produce spectrograms for both recordings.

Drumroll please. (haha)

<img src="/assets/images/blog/drums/spectrogram.png" alt="Spectrograms for two sounds. The spectrograms look somewhat similar if you really squint." style="max-width: none; width: 426px;">

The horizontal axis represents time, and the vertical axis represents frequency. Each horizontal streak comes from a frequency peak that persisted after striking a drum. Each of the two patterns of streaks comes from striking one of the two drums.[^2]

[^2]: I haven't mentioned this yet, but the geometry only determines the *relative* frequencies. The actual pitch of the drum is determined by multiple factors, including the amount of tension in the drum head. The two drums produced different fundamentals when I struck them, so to make this image I pitched the second one up to get the spectrograms to match as closely as I could.

The spectrograms are... kinda similar? But not identical. What happened?

We expect our biggest divergence from the model was because of the way we stretched the balloons over the disc when forming the drum; the mathematical model assumes the drum head is under uniform tension in all directions, but our method for stretching the balloons over the discs was kind of haphazard. We expect we could get the spectrograms to match more closely by using a more precise method for stretching the balloons.

But alas, we used university money for the project, so the discs are now in a display cabinet in the math building. If anyone wants to give it a go, here are the 3D printer files:

[Drum 1 (STL)](/assets/files/drum1.stl) \| [Drum 2 (STL)](/assets/files/drum2.stl)

Try it out! And if you do, *please* tell me about it!

![Four people holding the drum prototypes, standing in front of a conference poster.](/assets/images/blog/drums/drum_team.jpg)
*Left to right: Yicheng Lin, Mohamed Musa, Brantley Vose (me), and Alex Theis.*

---

Many thanks to my friend Yang Yang for handling the 3D printing, and to Dr. Jim Fowler for design ideas. Thanks also to the Cycle program at Ohio State for funding the project.

---

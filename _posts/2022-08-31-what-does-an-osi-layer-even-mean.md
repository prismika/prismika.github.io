---
layout: post
title: "What Does an OSI Layer Even Mean?"
date: 2022-08-31
thumbnail: /assets/images/blog/OSI/layers.png
---

<img src="/assets/images/blog/OSI/layers.png" alt="A graphical depiction of the OSI model. It shows five &quot;layers&quot; labeled, from bottom to top, Physical Layer, Data Link Layer, Network Layer, Session Layer, Application Layer" style="width: 33%;" />

I had a tough time wrapping my head around the OSI network model. In my experience, the layers are always presented just as layers, without any explanation of what a layer actually represents or what it means for one layer to sit on top of another, or even what is being "modeled" by this model. Instead, people just say "Layer 4 includes things like TCP and UDP, it worries about letting processes talk, it introduces ports, yada yada yada."

Eventually I figured it out, and in this post I want to lay out what I think is a useful perspective: **a layer is a level of abstraction that solves a specific problem.**

(Note: I'll be talking about the five-layer OSI model, as opposed to the more detailed seven-layer model. While the specific layers are different, the ideas are the same.)

## What is a Layer?

Consider two computers communicating through a network. Maybe they're sending text messages, or video chatting, or requesting and producing webpages. There is a deep stack of technology on which this whole ongoing communication rests, so we have multiple scopes from which we can think about this communication process. For instance, if we are the users of the machines in question, we are probably thinking of this process from the most zoomed-out perspective we can: as data being sent from one application to another (i.e. Firefox is making requests to Apache, my Skype is sending live video to your Skype, etc.) This perspective is practical for an end-user. If, on the other hand, someone asked you if that process is magic, you would probably drop to a lower level of abstraction and say "Of course not, my laptop is just sending out a stream of pulses over the air to my wifi router." These are two very different **abstraction levels**. There are also many additional levels in between these two extremes.

People who have to get their hands dirty with networking stuff have to be comfortable switching between these layers of abstraction. How do we keep them all straight in our head? This is where the OSI model comes in. Each layer in the OSI model represents a **layer of abstraction**. This fact gets muddled when people say that layers consist of protocols or data units.

In the example above, thinking about communication as "my program talking to your program" is thinking at the highest level of abstraction, which the OSI model calls the Application Layer. Thinking of the communication as pulses flying over the air and across wires is thinking at the lowest level of abstraction, called the Physical Layer. These layers are well-named. If we're thinking on the Application level of abstraction, there's no rubber-meets-the-road computery stuff to worry about, just my Skype application and yours, and the video they're sending back and forth. Thinking this abstractly, we aren't thinking about anything too nitty-gritty, least of all the physical bits flying through the air and across the internet. In this sense, the application layer covers the layers below it, which is why it is useful terminology to call it a "layer". On the other hand, if we think about this process on the Physical layer of abstraction, the bits are all that matter. My laptop is sending bits across the air to my wifi router, which is sending bits to somewhere else via ethernet, etc.

For something as complicated as computer networks, multiple layers of abstraction are necessary. This is what makes the OSI model useful.

## Why these specific layers? And where do the protocols come in?

The layers in the OSI model aren't just arbitrarily chosen abstraction levels. **There are five fundamental problems of networking, each happening at a different level of abstraction, and each layer of the OSI model is chosen to match up with one of those problems.**

Let's pretend we're inventing computer networks from scratch and see what problems we run into. Let's say my end goal is to send your Skype a video from my Skype.

<ol reversed>
<li>I want to figure out how our Skype <em>applications</em> can talk.</li>
<li>Before I can do that, I need to figure out how to let two <em>processes</em> talk to each other.</li>
<li>Before I can do that, I need to figure out how to let two <em>distant machines</em> talk to each other across a network.</li>
<li>Before I can do that, I need to figure out how to let two <em>connected machines</em> talk to each other.</li>
<li>Before I can do that, I need to figure out what it even means for two <em>physical objects</em> to talk to each other.</li>
</ol>

As we go down the list, the entities that want to talk get less and less abstract. We of course must solve these problems from the bottom up. As we solve each one, we will make a library that handles our solution and lets us forget about all the details, effectively abstracting that problem away.

The solutions to each of these problems will follow this general format: just use the library I just came up with for the last problem, but with a bit of extra overhead information attached to solve my new problem. An agreement about the format for that extra information, along with any promises about how that information will be handled, is called a _protocol_.

For instance, let's say I've solved problem 1 and I'm ready to move on to problem 2. I have a software library that will send bits over a wire. Great! It's tempting to just say that I'll communicate machine-to-machine by sending the necessary bits over a wire, but we'll run into some practical problems. I can send you bits, but how do I tell you where one transmission starts and the next one stops? And what if a transmission is really big? How do I send that whole thing without overflowing your buffer? Also, how do I ask if you're the machine that I think you are? The solution is to agree on a protocol; we make a contract about how many bits I can send you at once, how I tell you where transmissions start and stop, how we're going to deal with names, etc, and we wrap each chunk of the transmission in a header and footer with all that extra information in an agreed-upon, precisely defined format. Presto! We have invented a layer 2 protocol and solved the fundamental problem that sits at this layer. We get to make a library implementing this brand new protocol, letting us forget about the details of our solution, and move on to the problem for layer 3. Rinse and repeat.

Each layer ends up getting its own protocol. In fact, most of the problems listed above will have multiple perfectly valid solutions which are useful in different circumstances, so most layers will get multiple alternative protocols to choose from, representing those alternative solutions, each with their own pros and cons. For instance, suppose I'm inventing a protocol to solve the 4th layer problem. If it's really important in my situation that no data is lost in transit, my solution will be different than if speed is a higher priority. In the first case I might invent TCP, while the second might lead to UDP. One problem, two solutions, means two protocols at the same layer.

Once these problems are solved, I can send you Skype data. To do this in practice, we end up unraveling our solutions at each layer in reverse order. It might look something like this:

<ol reversed>
<li>Skype packages up a chunk of my live video into Skype's proprietary format. It wants to send it to your Skype process. How will it get there? Not this layer's problem, so Skype calls a library and feeds it the chunk of video data. Skype's job is done.</li>
<li>The data is given a UDP header with the port number for your process so that when it gets to your computer, it gets to the Skype listening process and not your Plex server or whatever other network-enabled processes you have running on your machine. How will the data get to your machine? Not this layer's problem, so it calls a library. This layer's job is done.</li>
<li>THAT data, header and all, is wrapped in an IP header. This header has information about how to transport this data across the internet to your computer, but not data about where to go next. That's not this layer's problem, so it calls a library. This layer's job is done.</li>
<li>THAT data, double header and all, is wrapped up with ANOTHER header (and footer). This one is an Ethernet header (footer) with information about which physical machine this packet needs to get to next. Where physically is that physical machine? Which physical wire does my machine need to send this across? Not this layer's problem, so it calls a library. This layer's job is done.</li>
<li>THAT data, triple header and all, is translated from bits into little pulses and sent out of ethernet jack number 2. Our machine's job is now done; the data is out on the network now. Other machines will unwrap and rewrap the necessary headers to get it where it needs to go. There are no more problems to solve.</li>
</ol>

These five steps represent five perspectives on the data transmission process of decreasing abstraction. Those five _layers of abstraction_ are called, in order,

<ol reversed>
<li>The Application Layer</li>
<li>The Session Layer</li>
<li>The Network Layer</li>
<li>The Data Link Layer</li>
<li>The Physical Layer</li>
</ol>

And there you have it. The OSI model is born.

---

(The above Skype example is a simplification, since our PCs are not communicating directly but instead both communicating with a server.)

Related: For much more detail than you want on how computers communicate, check out [What happens when...](https://github.com/alex/what-happens-when).

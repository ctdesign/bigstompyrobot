---
layout: default
---
<section class="hero">
  <div class="hero__bg" style="background-image:url('/assets/images/hero/suitable-for-salvage.jpg');"></div>
  <div class="hero__gradient"></div>
  <div class="grid-container clearfix">
    <div class="grid-row">
      <div class="grid-column-full">
        <span class="hero__sub">New comic</span>
        <h2 class="hero__title">Suitable for Salvage</h2>
        <a href="/comics/suitable-for-salvage" class="hero__cta">Read now &#8594;</a>
      </div>
      
    </div> 
  </div>
</section>

 <div class="grid-container clearfix">
<div class="grid-row">
  <div class="grid-column-two-thirds">
    <h3>Latest</h3>

    <ul class="content-list">
      {% for post in site.posts limit:3 %}
      <li class="content-list__item">
      <p class="content-list__meta">{{ post.date | date: "%B %d, %Y" }}</p>
        <h4 class="content-list__title"><a href="{{ post.url }}">{{ post.title }}</a></h4>
        <p>{{ post.excerpt }}</p>
        <a href="{{ post.url }}" class="content-list__more">Read more &#8594;</a>
      </li>
      {% endfor %}
    </ul>
  </div>
  <div class="grid-column-one-third">
   
    {% include newsletter.html %}
 
</div>
</div>
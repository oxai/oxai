# OXAI website

Welcome to the repository for the website of the Oxford Artificial Intelligence Society

```
      ___           ___           ___                 
     /\  \         |\__\         /\  \          ___   
    /::\  \        |:|  |       /::\  \        /\  \  
   /:/\:\  \       |:|  |      /:/\:\  \       \:\  \ 
  /:/  \:\  \      |:|__|__   /::\~\:\  \      /::\__\
 /:/__/ \:\__\ ____/::::\__\ /:/\:\ \:\__\  __/:/\/__/
 \:\  \ /:/  / \::::/~~/~    \/__\:\/:/  / /\/:/  /   
  \:\  /:/  /   ~~|:|~~|          \::/  /  \::/__/    
   \:\/:/  /      |:|  |          /:/  /    \:\__\    
    \::/  /       |:|  |         /:/  /      \/__/    
     \/__/         \|__|         \/__/                
```

## To add/edit Partners & Sponsors

Find the section on `index.html` with the comment `<!-- Partners and sponsors -->`

```html
<!-- Partners and sponsors -->
    <div class="row logos">
      <div class="container-fluid welcome">
        <div class="row welcome2">
          <div class="col-lg-4"><a href="https://www.turing.ac.uk/" target="_blank"><img src="img/partners/ATI_logo_white.svg" alt="" /></a></div>
          <div class="col-lg-4"><a href="https://foundersfactory.com/" target="_blank"><img src="img/partners/founders_factory.jpg" alt="" /></a></div>
          <div class="col-lg-4"><a href="https://www.maths.ox.ac.uk/" target="_blank"><img src="img/partners/maths_institute.jpg" alt="" /></a></div>
        </div>
      </div>
    </div>
  </div>
  
  ```
  
  Each of the partners/sponsors is one of the `div`s that look like `<div class="col-lg-4"><a href="https://www.maths.ox.ac.uk/" target="_blank"><img src="img/partners/maths_institute.jpg" alt="" /></a></div>`.
  
  * The `href` attribute in the `a` element links to the sponsor's webpage, 
  * the `src` attribute in the `img` element links to their logo (which should be hosted in the referenced path, here we use `img/partners/`)
  
 You can add sponsors/partners by adding such a `div` element under `<div class="row welcome2">`, or edit existing ones.
  
  ## To add/edit team members

Find the section on `index.html` with the comment `<!-- Team Section -->`. Each team member corresponds to an html element that looks like follows

```html
<div class="col-lg-4 col-sm-6 text-center">
  <img class="img-circle img-responsive img-center committee" src="img/people/daniel.jpg" alt="">
  <h4>Daniel Lozano
    <!-- <small>President</small> -->
  </h4>
  <a target="_blank" href="https://www.linkedin.com/in/lozanodaniel/"><i class="fa fa-lg fa-linkedin"></i></a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a target="_blank" href="mailto:president@oxai.org"><i class="fa fa-lg fa-envelope-o"></i></a>
  <br>
  <br>
</div>
  
  ```
  
* The `src="img/people/daniel.jpg"` attribute refers to the portrait of the person, hosted in `img/people/` in this repository. 
* `<h4>Daniel Lozano` is their name
* `<!-- <small>President</small> -->` refers to their title, which is commented out because previous committee decided not to include it.
* In `<a target="_blank" href="https://www.linkedin.com/in/lozanodaniel/"><i class="fa fa-lg fa-linkedin"></i></a>`, we link to their linkedin (`https://www.linkedin.com/in/lozanodaniel/`)
* In `  <a target="_blank" href="mailto:president@oxai.org"><i class="fa fa-lg fa-envelope-o"></i></a>` we include their email (`president@oxai.org`).
 
  You can add team members by adding such a `div` element next to existing ones on the html, or edit existing ones.

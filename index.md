<ul>
  {% for article in blogs.myblog.articles  %}
   <li>{{ article.title | link_to: article.url }}</li>
  {% endfor %}
</ul>

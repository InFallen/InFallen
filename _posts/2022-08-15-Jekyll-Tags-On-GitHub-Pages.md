---
icon: jekyll
chapters: jekyll github cms
title: Jekyll Tags на GitHub Pages
tags: jekyll blog github-pages
---
# {{page.title}}

---
Github Pages по умолчанию не поддерживает плагин [jekyll-tagging](https://github.com/pattex/jekyll-tagging) для работы с тегами в Jekyll.

Для внедрения тегов можно использовать данное пошаговое руководство.
Для демонстрации, данный механизм используется на данном сайте.

## Добавляем теги к постам

В каждом файле поста, нужно добавить теги в раздел front matter. Например для данного поста это выглядит вот так:

{% highlight markdown %}
{% raw %}
---
chapter: jekyll
title: Jekyll Tags на GitHub Pages
tags: jekyll blog github-pages
---
{% endraw %}
{% endhighlight %}

В списке **tags** каждый тег отделяется пробелом и рекомендуется использовать только строчные буквы для имен.

## Сбор тегов со всех постов

Следующим шагом будет создание включения со списком всех тегов. Для этого создадим файл с именем **collecttags.html** в папке **_includes** и добавим туда liquid-скрипт:

{% highlight liquid %}
{% raw %}
{% assign rawtags = "" %}
{% for post in site.posts %}
  {% assign ttags = post.tags | join:'|' | append:'|' %}
  {% assign rawtags = rawtags | append:ttags %}
{% endfor %}
{% assign rawtags = rawtags | split:'|' | sort %}

{% assign site.tags = "" %}
{% for tag in rawtags %}
  {% if tag != "" %}
    {% if tags == "" %}
      {% assign tags = tag | split:'|' %}
    {% endif %}
    {% unless tags contains tag %}
      {% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
    {% endunless %}
  {% endif %}
{% endfor %}
{% endraw %}
{% endhighlight %}

Данный скрипт создает список **site.tags**.

## Сбор тегов

Для сбора тегов нужно включить **collecttags.html** где-то, чтобы он выполнялся до использования списка **site.tags**.

Как варианты, можно добавить либо в тег **&lt;head>** в шаблоне используемом по умолчанию, либо во включение **head.html**, в котором уже определяется вся конструкция тега **&lt;head>**. Добавим в выбранное место следующий код:

{% highlight liquid %}
{% raw %}
{% if site.tags != "" %}
  {% include collecttags.html %}
{% endif %}

{% endraw %}
{% endhighlight %}

Это единоразово запустит скрипт из **collecttags.html**.

## Вывод тегов в посте

Для вывода тегов в посте, добавим в макет **_layout/post.html** следующий код:

{% highlight html %}
{% raw %}
<span>[
  {% for tag in page.tags %}
    {% capture tag_name %}{{ tag }}{% endcapture %}
    <a href="/tag/{{ tag_name }}"><code class="highligher-rouge"><nobr>{{ tag_name }}</nobr></code>&nbsp;</a>
  {% endfor %}
]</span>
{% endraw %}
{% endhighlight %}

Обратите внимание на ссылку **/tag/tag_name**. Ее создание будет описано дальше.

##  Создание страницы тега.

Теперь нужно создать страницы для каждого из тегов, на которые будете переходить после нажатия на них. Например: [github-pages](/tag/github-pages) <- кликните.

### Определение макета для страницы тега.

Страница тегов должна быть сгенерирована для всех тегов, потому что для ее создания нельзя использовать плагин, который не работает на **GitHub-Pages**. Поэтому это будет просто обычная страница Jekyll с собственным макетом.

Создадим новый html-файл **_layout/tagpage.html**:
{% highlight html %}
{% raw %}
---
layout: default
---
<div class="post">
<h1>Tag: {{ page.tag }}</h1>
<ul>
{% for post in site.tags[page.tag] %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date_to_string }})<br>
    {{ post.content | remove_first: post.excerpt | strip_html | truncatewords: 30 }}
  </li>
{% endfor %}
</ul>
</div>
<hr>
{% endraw %}
{% endhighlight %}

Это будет формат всех страниц тегов. Он отображает все сообщения с текущим тегом, включая заголовок сообщения, дату и первые 30 слов первого абзаца.

### Инициирование создания страниц тегов

Чтобы движок GitHub Jekyll мог создать страницы тегов, нужны файлы **markdown**, каждый из которых будет указывать на конкретный тег и формат страницы.

Создаем в корне сайта папку **tag** и создаем в ней для примера файл **github-pages.md** с таким содержимым:
{% highlight markdown %}
{% raw %}
---
layout: tagpage
title: "Tag: github-pages"
tag: github-pages
---
{% endraw %}
{% endhighlight %}

Данный код запускает создание страницы в директории **site_dir/tag/github-pages** c макетом **_layout/tagpage.html** и параметров **page.tag = github-pages**.

## Отображение облака тегов (необязательно)

Облако тегов может быть таким: [github-pages](/tag/github-pages/) <- кликните(нижняя часть). При использовании данного метода, можно будет изменить размер текста тега в зависимости от количества постов, связанным с ним или отображать теги в порядке подсчета ссылок.

Создадим новое включение **_includes/archive.html**:

{% highlight html %}
{% raw %}
<h2>Archive</h2>
{% capture temptags %}
  {% for tag in site.tags %}
    {{ tag[1].size | plus: 1000 }}#{{ tag[0] }}#{{ tag[1].size }}
  {% endfor %}
{% endcapture %}
{% assign sortedtemptags = temptags | split:' ' | sort | reverse %}
{% for temptag in sortedtemptags %}
  {% assign tagitems = temptag | split: '#' %}
  {% capture tagname %}{{ tagitems[1] }}{% endcapture %}
  <a href="/tag/{{ tagname }}"><code class="highligher-rouge"><nobr>{{ tagname }}</nobr></code></a>
{% endfor %}
{% endraw %}
{% endhighlight %}

Данный скрипт извлекает **site.tags** и сортирует их по размеру постов, на которые он ссылается.
Отсортированный список находится в **sortedtemptags**. 

Для отображения облака тегов нужно добавить строку в любое место:
{% highlight html %}
{% raw %}
{% include archive.html %}
{% endraw %}
{% endhighlight %}

## Отправить в Github
Последним действием нужно отправить  изменения на GitHub.
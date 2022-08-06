---
---

Welcome to My Home Page

{% assign date = '2021-08-06T10:20:00Z' %}

- Начальная дата - {{ date }}
- С временным фильтром - {{ date | timeago }}

Author: {{ page.author }}
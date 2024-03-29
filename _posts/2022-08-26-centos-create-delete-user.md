---
icon: /assets/img/icon-centos.png
chapters: os centos-7
title: Создание и удаление пользователей CentOS 7
tags: centos-7 linux
---
# {{page.title}}

---
В данной статье будет рассмотрено создание, удаление пользователей в СentOS 7, а назначение прав superuser.

Для создания пользователя в CentOS 7 используется команда **adduser**.
Из под пользователя **root**:

{% highlight bash %}
adduser username
{% endhighlight %}

Либо из под пользователя с привилегиями sudo

{% highlight bash %}
sudo adduser username
{% endhighlight %}

Далее нужно установить пароль для созданного юзера командой passwd.

Для пользователя root:

{% highlight bash %}
passwd username
{% endhighlight %}

{% highlight bash %}
sudo passwd username
{% endhighlight %}

## Добавление и удаление пользователей из групп. Передача привилегий Sudo
Если пользователю требуется выполнять команды с правами root, ему нужно предоставить доступ к sudo добавив в группу wheel.  
Сделать это можно с помощью команды gpasswd c флагом -a.  
Флаг -d позволяет удалить пользователя из группы.  
Для пользователя root:

{% highlight bash %}
gpasswd -a username wheel
gpasswd -d username wheel
{% endhighlight %}

Для пользователя с правами sudo:

{% highlight bash %}
sudo gpasswd -a username wheel
sudo gpasswd -d username wheel
{% endhighlight %}

Теперь новый пользователь может запускать команды с правами администратора, используя в начале команды **sudo**:

{% highlight bash %}
sudo command
{% endhighlight %}

При этом пользователю потребуется ввести пароль от учетной записи. Также если понадобиться запускать несколько команд подряд с правами администратора, то можно использовать режим **superuser**, выполнив команду:

{% highlight bash %}
sudo su
{% endhighlight %}

После ввода данной команды пользователю, также потребуется ввести пароль от своей учетной записи. Обратите внимание, что теперь командная строка показывает, что вы будете выполнять команды от имени пользователя **root**:

![](/assets/img/2022-08-26/centos_create_user_01.png)

Для выхода из режима **superuser** просто введите команду:

{% highlight bash %}
exit
{% endhighlight %}

![](/assets/img/2022-08-26/centos_create_user_02.png)

### Просмотр групп пользователя и пользователей в группе

Для просмотра групп пользователя используется команда lid:

{% highlight bash %}
lid nagorny
{% endhighlight %}

Для пользователя с привилегиями не забываем добавить в начало команды **sudo**.
Если будет нужно просмотреть пользователей в группе, то используется так же самая команда, но с флагом **-g**, например:

{% highlight bash %}
lid -g wheel
{% endhighlight %}

Не забываем для пользователей из группы **wheel** в начале команды ставить **sudo**.

## Удаление пользователей.
Для удаления ненужный учетных записей пользователей используется:

{% highlight bash %}
userdel username
{% endhighlight %}

Если вам нужно, также удалить домашний каталог, то используйте:

{% highlight bash %}
userdel -r username
{% endhighlight %}

И не забываем для выполнения пользователем с привилегиями использовать **sudo** перед командой.


Обе вышеприведенные команды удаляют пользователя изо всех групп, в которых он состоял (например, из группы wheel). Если в будущем в системе появится пользователь с таким же именем, его нужно будет повторно добавить в группу wheel, чтобы предоставить ему привилегии **sudo**.
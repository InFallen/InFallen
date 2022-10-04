---
icon: /assets/img/icon-vscode.png
chapters: text-editors vscode windows macos
title: Установка Visual Studio Code
tags: vscode text-editors windows macos linux 
---
# {{page.title}}

В данном посте мы разберем установку Visual Studio Code на основные операционные системы Windows, MacOS, Linux.

1. [Установка на MacOS](#macos)
2. [Установка на Linux](#linux)
3. [Установка на Windows](#windows)

## <a name="macos"></a>Установка на MacOS

Проходим по [ссылке](https://code.visualstudio.com/) и нажимаем other platform:

![](/assets/img/2022-08-19/vscode_install_1.png)

На открывшейся странице видим несколько вариантов сборок Visual Studio Code для MacOS:
- **Universal** - универсальная сборка содержит в себе две версии для процессоров Intel и Apple Silicon, но и занимает больше места.
- **Intel chip** - сборка для компьютеров с процессором Intel.
- **Apple Siliсon** - сборка для компьютеров с процессором Apple Silicon.

![](/assets/img/2022-08-19/vscode_install_macos_2.png)

Выбираем нужную вам версию и нажимаем для скачивания.

### Установка

Открываем в Finder директорию, со скачанным архивом.

![](/assets/img/2022-08-19/vscode_install_macos_3.png)

Дважды кликаем левой кнопкой мыши по архиву для разархивации и получаем файл приложения, который нужно перенести в директорию программы:

![](/assets/img/2022-08-19/vscode_install_macos_4.png)

На этом установка Visual Studio Code на MacOS закончена.

## <a name="linux"></a>Установка на Linux

1. [Установка в CentOS 7](#centos-7)

### <a name="centos-7"></a>Установка в CentOS 7

#### Требования
Нужно, чтобы у пользователя под которым будет происходить установка были права **sudo**.
#### Установка
1.Вначале импортируем ключ Microsoft GPG:

    {% highlight bash %}
    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
    {% endhighlight %}

2.Затем создаем файл **.repo**, чтобы включить репозиторий Visual Studio Code:

{% highlight bash %}
sudo mcedit /etc/yum.repos.d/vscode.repo
{% endhighlight %}

И вставляем в него эти данные:

{% highlight bash %}
[code]
name=Visual Studio Code
baseurl=https://packages.microsoft.com/yumrepos/vscode
enabled=1
gpgcheck=1
gpgkey=https://packages.microsoft.com/keys/microsoft.asc
{% endhighlight %}


Сохраняем и закрываем текстовый редактор.

3.После включения репозитория, для установки Visual Studio Code требуется ввести команду:
{% highlight bash %}
sudo yum install code
{% endhighlight %}

Вот и все. Visual Studio Code установлен и вы можете его использовать.

Обновить можно с помощью команды:
{% highlight bash %}
sudo yum update
{% endhighlight %}

## <a name="windows"></a>Установка на Windows
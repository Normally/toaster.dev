---
sidebar: false
---

# Toaster

**A free JSON placeholder API** 

<div class="intro">

Send a request to `https://api.toaster.dev` with a template schema in the body and receive a populated JSON response.

</div>

## Demo
&nbsp;

<code-view :code='`{
  name: "{name}",
  email: "{email}",
  avatar: "{avatar}"
}`'/>

<br/>

## Variables

<div class="table-holder">

| Name                         | Optional       | Example result                                                         |
| :--------------------------- | :------------- | :--------------------------------------------------------------------- |
| `{name}`                     |                | Annabell Volkman                                                       |
| `{firstName}`                |                | Annabell                                                               |
| `{lastName}`                 |                | Volkman                                                                |
| `{email}`                    |                | Annabell_Volkman5@hotmail.com                                          |
| `{address}`                  |                | Apt. 867 Malinda Circles                                               |
| `{country}`                  |                | United Kingdom                                                         |
| `{countryCode}`              |                | GB                                                                     |
| `{timeZone}`                 |                | Europe/Helsinki                                                        |
| `{date}`                     | `from` `to`    | Sun Jan 13 2021 17:35:42 GMT+0000 (Greenwich Mean Time)                |
| `{phone}`                    | `xxxxx xxxxxx` | 07823 564783                                                           |
| `{creditCard}`               |                | 1249 3748 3923 2200                                                    |
| `{avatar}`                   |                | https://cdn.fakercloud.com/avatars/aio____128.jpg                      |
| `{image}`                    |                | http://placeimg.com/640/480/city                                       |
| `{password}`                 |                | lTvW5VcNt0_GIJf                                                        |
| `{uuid}`                     |                | b7799d22-e8c1-4f84-9382-5fdc42c876c2                                   |
| `{shortid}`                  |                | t5txra0i8k9                                                            |
| `{number 0 100}`             | `min` `max`    | 42                                                                     |
| `{random 'cat' 'dog' 'pig'}` | `*` ...        | cat                                                                    |
| `{float 0.01}`               | `precision`    | 2345.23                                                                |
| `{boolean}`                  |                | true                                                                   |
| `{color}`                    |                | #FF003F                                                                |
| `{lorem 3}`                  | `wordCount`    | totam ullam commodi                                                    |
| `{faker.*.*}`                | `*`            | Any [faker.js](http://marak.github.io/faker.js/#toc7__anchor) function |

</div>

<br/>


## Lists

&nbsp;

<code-view :code='`{
    _repeat: 3,
    name: "{name}",
    email: "{email}"
}`'/>


<br/>

## Seeding

Response data is random each time unless you add a `_seed`. Then it returns the same result with each request. This can be handy for different user accounts or pagination of lists. 


<code-view :code='`{
    _seed: 0,
    _repeat: 3,
    name: "{name}",
    email: "{email}",
}`'/>


<br/>

## Locales

Toaster supports multiple [localities](http://marak.github.io/faker.js/#toc9__anchor)

<code-view :code='`{
    _locale: "ja",
    name: "{name}",
    email: "{email}"
}`'/>

<br/>

---

## Request methods

Toaster supports both ```POST``` and  ```GET``` requests. 
<br/> ```GET ``` requests populate all query parameters **OR** use a single ```data``` parameter with a stringified object to handle complex data.

```js
axios.get('https://api.toaster.dev', {params:{data:JSON.stringify(myDataSchema)}})
```

## About

Built by [Nic Mulvaney](https://nicmulvaney.com) at [Normally](https://normally.com). 

Source available on [GitHub](https://github.com/normally/toaster.dev) 

Free to use, no signup, no authentication.








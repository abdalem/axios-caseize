<!-- <p align="center"><img src="logo.png" /></p> -->

<h1 align="center"> Axios-Caseize </h1>

<p align="center"> Caseize request's and response's data through Axios interceptors </p>

<hr/>

<p> Axios-Caseize allow you, using Caseize package, to add interceptors to axios instance in order to caseize request and response data.</p>

<!-- <h3> List of features </h3>

<ul>
  <li>Casing to snakecase</li>
  <li>Casing to camelcase</li>
</ul> -->

<!-- <h3> Demo </h3> -->

<!-- <a href="#"> Link to Demo </a> -->

<h3> Code Demo </h3>

```js
import axiosCaseize from 'axios-caseize'
import axios from 'axios'

const instance = axios.create(/*axiosOptions*/)
const optionnalAxiosCaseizeParams = {
  request: 'snakecase', //optionnal, default to 'snakecase', see caseize package for available cases
  response: 'camelcase', //optionnal, default to 'camelcase', see caseize package for available cases
}
```

<h3> Download & Installation </h3>

```shell
$ npm i axios-caseize
```
<h3>Contributing</h3>
Keep it simple. Keep it minimal. Don't put every single feature just because you can.

<h3>Authors or Acknowledgments</h3>
<ul>
  <li>abdalem</li>
</ul>

<h3>License</h3>

This project is licensed under the ISC License

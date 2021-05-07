import axios from 'axios'

export function _login(data) {
  return axios.post('/api/checkLogin', data)
}

export function _registered(data) {
  return axios.post('/api/registered', data)
}

export function _getAllAttrList() {
  return axios.get('/api/getAllAttrList')
}

export function _searchAttr(data) {
  return axios.post('/api/searchAttr', data)
}

export function _deleteAttr(data) {
  return axios.post('/api/deleteAttr', data)
}

export function _addAttr(data) {
  return axios.post('/api/addAttr', data)
}

export function _getInfoCount() {
  return axios.get('/api/getInfoCount')
}

export function _getScenStrategy() {
  return axios.get('/api/getScenStrategy')
}

export function _getCustomStrategy() {
  return axios.get('/api/getCustomStrategy')
}

export function _getCountWeek() {
  return axios.get('/api/getCountWeek')
}

export function _getAllStrategyModel(data) {
  return axios.post('/api/getAllStrategyModel', data)
}

export function _getDeleteStrategyModel(data) {
  return axios.post('/api/getDeleteStrategyModel', data)
}

export function _getEditStrategyModel(data) {
  return axios.post('/api/getEditStrategyModel', data)
}

export function _addStrategyModel(data) {
  return axios.post('/api/addStrategyModel', data)
}

export function _getAllRusList() {
  return axios.get('/api/getAllRusList')
}

export function _getAllInfoList(data) {
  return axios.post('/api/getAllInfoList', data)
}

export function _addSendingInfo(data) {
  return axios.post('/api/addSendingInfo', data)
}

export function _deleteInfo(data) {
  return axios.post('/api/deleteInfo', data)
}

export function _getAllStrategy() {
  return axios.get('/api/getAllStrategy')
}

export function _setInfoStrategy(data) {
  return axios.post('/api/setInfoStrategy', data)
}

export function _getRsuInfo(data) {
  return axios.post('/api/getRsuInfo', data)
}
import api from "../lib/axios";

export default {
    obtenerClientes () {
        return api.get('/clientes')
    },
    agregarCliente (data) {
        return api.post('/clientes', data)
    }
}